<template>
  <div>
    <b-card no-body>
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
            timeUnit="week"
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
      displayedFromMoment: moment().startOf('day'),
      daycollection: {},
      weekcollection: {},
      monthcollection: {},
      sampleGraphWidth: '90%',
      sampleGraphHeight: 'calc(90vh - 320px)'
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
        this.displayedFromMoment.clone().add(1, 'w'),
        this.displayedFromMoment.clone().add(1, 'M')
      ][this.activeTabIndex]
    },
    displayedFromMomentIsCurrent: function () {
      return this.displayedFromMoment.unix() === this.currentFromMoment.unix()
    },
    displayedDayMoments: function () {
      var displayedDayToMoment = this.displayedFromMoment.clone()
      displayedDayToMoment.add(1, 'd')
      return {
        from: this.displayedFromMoment,
        to: displayedDayToMoment
      }
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
    loadNode: function () {
      this.loadNodeById({ id: this.nodeId }).then(() => {
        this.node = this.getNodeById({ id: this.nodeId }).attributes
      }).catch((error) => console.log(error))
    },
    loadCollection: function (collectionMoments) {
      const promise = new Promise((resolve, reject) => {
        this.loadTimeseriesById({
          id: this.nodeId,
          options: {
            from: collectionMoments.from.unix(),
            to: collectionMoments.to.unix()
          }
        }).then(() => {
          const queryResult = this.getTimeseriesById({ id: this.nodeId })
          const timeseries = queryResult.attributes
          const collection = {
            datasets: [
              {
                label: 'CO2',
                fill: false,
                pointRadius: 0,
                lineTension: 0,
                borderWidth: 2,
                yAxisID: 'co2Axis',
                borderColor: '#729fcf',
                data: timeseries.samples.map(s => { return { t: moment(1000 * s.timestamp_s), y: s.co2_ppm } })
              }
            ]
          }
          resolve(collection)
        }).catch((error) => reject(error))
      })
      return promise
    },
    loadAllCollections: async function () {
      try {
        this.daycollection = await this.loadCollection(this.displayedDayMoments)
        this.weekcollection = await this.loadCollection(this.displayedWeekMoments)
        this.monthcollection = await this.loadCollection(this.displayedMonthMoments)
      } catch (error) {
        console.log('an error occured while fetching the collections:')
        console.log(error)
      }
    },
    loadAllData: function () {
      this.loadNode()
      this.loadAllCollections()
    }
  },
  mounted () {
    this.loadAllData()
  },
  watch: {
    nodeId: function (newVal) {
      this.loadAllData()
    },
    displayedFromMoment: function (newVal) {
      this.loadAllCollections()
    }
  }
}
</script>

<style lang="scss">
</style>
