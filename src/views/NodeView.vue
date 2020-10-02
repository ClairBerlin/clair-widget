<template>
  <div>
    <b-card no-body>
      <b-overlay :show="loading > 0">
        <h2 class="text-center pt-2">{{node.alias}}</h2>
        <b-tabs v-model="activeTabIndex" fill>
          <b-tab title="Tag">
            <SampleGraph
              :datacollection="daycollection"
              :width="sampleGraphWidth"
              :height="sampleGraphHeight"
              timeUnit="hour"
              :xTicks="displayedDayTicks"
            />
          </b-tab>
          <b-tab title="Woche">
            <SampleGraph
              :datacollection="weekcollection"
              :width="sampleGraphWidth"
              :height="sampleGraphHeight"
              timeUnit="day"
              :xTicks="displayedWeekTicks"
            />
          </b-tab>
          <b-tab title="Monat">
            <SampleGraph
              :datacollection="monthcollection"
              :width="sampleGraphWidth"
              :height="sampleGraphHeight"
              timeUnit="day"
              :xTicks="displayedMonthTicks"
            />
          </b-tab>
        </b-tabs>
        <div class="text-center mb-4">
          {{displayTimePeriod(displayedFromMoment)}}
        </div>
        <b-container class="mb-3">
          <b-row align-v="center">
            <b-col>
              <b-button
                variant="outline-primary"
                @click="displayedFromMoment = previousFromMoment"
              >
                <b-icon-arrow-left/>
              </b-button>
            </b-col>
            <b-col class="text-center">
              <b-button
                variant="outline-primary"
                @click="displayedFromMoment = currentFromMoment"
                :disabled="displayedFromMomentIsCurrent"
              >
                {{['Heute', 'Diese Woche', 'Dieser Monat'][activeTabIndex]}}
              </b-button>
            </b-col>
            <b-col class="text-right">
              <b-button
                variant="outline-primary"
                @click="displayedFromMoment = nextFromMoment"
                :disabled="displayedFromMomentIsCurrent"
              >
                <b-icon-arrow-right/>
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-overlay>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SampleGraph from '../components/SampleGraph.vue'
import moment from 'moment'

moment.locale('de')

export default {
  components: {
    SampleGraph
  },
  data () {
    return {
      node: {},
      activeTabIndex: 0,
      loading: 0,
      displayedFromMoment: moment().startOf('day'),
      oldestSampleMoment: moment().subtract(4, 'w').startOf('month'),
      samplePool: [],
      sampleGraphWidth: '90%',
      sampleGraphHeight: 'calc(90vh - 280px)',
      refreshTimerId: -1
    }
  },
  computed: {
    ...mapGetters({
      getNodeById: 'nodes/byId',
      getTimeseriesById: 'timeseries/byId'
    }),
    nodeId: function () {
      return this.$route.params.id
    },
    previousFromMoment: function () {
      return [
        this.displayedFromMoment.clone().subtract(1, 'd'),
        this.displayedFromMoment.clone().subtract(1, 'w'),
        this.displayedFromMoment.clone().subtract(1, 'M')
      ][this.activeTabIndex]
    },
    currentFromMoment: function () {
      return moment().startOf('day')
    },
    nextFromMoment: function () {
      return [
        this.displayedFromMoment.clone().add(1, 'd'),
        moment.min(this.currentFromMoment, this.displayedFromMoment.clone().add(1, 'w')),
        moment.min(this.currentFromMoment, this.displayedFromMoment.clone().add(1, 'M'))
      ][this.activeTabIndex]
    },
    displayedFromMomentIsCurrent: function () {
      const displayedMoments = [
        this.displayedDayMoments,
        this.displayedWeekMoments,
        this.displayedMonthMoments
      ][this.activeTabIndex]
      const currentValue = this.currentFromMoment.valueOf()
      return currentValue < displayedMoments.to.valueOf()
    },

    displayedDayMoments: function () {
      var displayedDayToMoment = this.displayedFromMoment.clone()
      displayedDayToMoment.add(1, 'd')
      return {
        from: this.displayedFromMoment,
        to: displayedDayToMoment
      }
    },
    daycollection: function () {
      return this.samplesToCollection(this.displayedDayMoments)
    },
    displayedDayTicks: function () {
      return this.momentsToTicks(this.displayedDayMoments)
    },

    displayedWeekMoments: function () {
      var displayedWeekFromMoment = moment(this.displayedFromMoment).startOf('isoWeek')
      var displayedWeekToMoment = displayedWeekFromMoment.clone()
      displayedWeekToMoment.add(1, 'w')
      return {
        from: displayedWeekFromMoment,
        to: displayedWeekToMoment
      }
    },
    weekcollection: function () {
      return this.samplesToCollection(this.displayedWeekMoments)
    },
    displayedWeekTicks: function () {
      return this.momentsToTicks(this.displayedWeekMoments)
    },

    displayedMonthMoments: function () {
      var displayedMonthFromMoment = moment(this.displayedFromMoment).startOf('month')
      var displayedMonthToMoment = displayedMonthFromMoment.clone()
      displayedMonthToMoment.add(1, 'M')
      return {
        from: displayedMonthFromMoment,
        to: displayedMonthToMoment
      }
    },
    monthcollection: function () {
      return this.samplesToCollection(this.displayedMonthMoments)
    },
    displayedMonthTicks: function () {
      return this.momentsToTicks(this.displayedMonthMoments)
    }
  },
  methods: {
    ...mapActions({
      loadNodeById: 'nodes/loadById',
      loadTimeseriesById: 'timeseries/loadById'
    }),
    momentsToTicks: function (moments) {
      return {
        min: moments.from,
        max: moments.to
      }
    },
    displayTimePeriod: function (fromMoment) {
      const displayedTimePeriods = [
        fromMoment.format('dddd, D.M.YYYY'),
        `Kalenderwoche ${fromMoment.format('w YYYY')}`,
        fromMoment.format('MMMM YYYY')
      ]
      return displayedTimePeriods[this.activeTabIndex]
    },
    samplesToCollection: function (moments) {
      const samples = this.samplePool.filter(s =>
        s.timestamp_s >= moments.from.unix() &&
        s.timestamp_s < moments.to.unix())
      return {
        datasets: [
          {
            label: 'CO2',
            fill: false,
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
            yAxisID: 'co2Axis',
            borderColor: '#729fcf',
            data: samples.map(s => { return { t: moment(1000 * s.timestamp_s), y: s.co2_ppm } })
          }
        ]
      }
    },
    loadNode: function () {
      this.loading += 1
      this.loadNodeById({ id: this.nodeId }).then(() => {
        this.node = this.getNodeById({ id: this.nodeId }).attributes
      }).catch((error) => console.log(error))
        .finally(() => {
          this.loading -= 1
        })
    },
    loadSamples: function (moments) {
      console.log(`loading samples from ${moments.from.fromNow()} to ${moments.to.fromNow()}`)
      const promise = new Promise((resolve, reject) => {
        this.loadTimeseriesById({
          id: this.nodeId,
          options: {
            from: moments.from.unix(),
            to: moments.to.unix()
          }
        }).then(() => {
          resolve(this.getTimeseriesById({ id: this.nodeId }).attributes.samples)
        }).catch((error) => reject(error))
      })
      return promise
    },
    loadPastSamples: async function () {
      // assuming we're only missing samples from the past and samples are sorted chronologically
      this.loading += 1
      try {
        const toMoment = this.samplePool.length ? moment(1000 * this.samplePool[0].timestamp_s) : moment()
        const samples = await this.loadSamples({ from: this.oldestSampleMoment, to: toMoment })
        for (const sample of samples.reverse()) {
          this.samplePool.unshift(sample)
        }
      } catch (error) {
        console.log('an error occured while loading missing samples:')
        console.log(error)
      } finally {
        this.loading -= 1
      }
    },
    loadRecentSamples: async function () {
      if (this.samplePool.length === 0) return
      try {
        const newestSample = this.samplePool[this.samplePool.length - 1]
        const samples = await this.loadSamples({ from: moment(1000 * newestSample.timestamp_s), to: moment() })
        for (const sample of samples) {
          this.samplePool.shift(sample)
        }
      } catch (error) {
        console.log('an error occured while loading recent samples:')
        console.log(error)
      }
    }
  },
  mounted () {
    this.loadNode()
    this.loadPastSamples()
    // refresh once per minute
    this.refreshTimerId = setInterval(this.loadRecentSamples, 60000)
  },
  beforeDestroy () {
    clearInterval(this.refreshTimerId)
  },
  watch: {
    nodeId: function (newVal) {
      this.loadNode()
      // empty sample pool
      this.samplePool.splice(0)
      // should we reset the displayed time period?
      this.loadPastSamples()
    },
    displayedFromMoment: function (newVal) {
      if (this.displayedFromMoment.valueOf() < this.oldestSampleMoment.valueOf()) {
        this.oldestSampleMoment = this.displayedFromMoment.clone().startOf('month')
        this.loadPastSamples()
      }
    }
  }
}
</script>

<style lang="scss">
</style>
