<template>
  <div>
    <b-card no-body>
      <h2 class="pl-3 pt-2">{{node.alias}}</h2>
      <b-tabs>
        <b-tab title="Tag" active>
          <SampleGraph
            :datacollection="daycollection"
            :width="sampleGraphWidth"
            :height="sampleGraphHeight"
            timeUnit="hour"
          />
        </b-tab>
        <b-tab title="Woche">
          <SampleGraph
            :datacollection="weekcollection"
            :width="sampleGraphWidth"
            :height="sampleGraphHeight"
            timeUnit="day"
          />
        </b-tab>
        <b-tab title="Monat">
          <SampleGraph
            :datacollection="monthcollection"
            :width="sampleGraphWidth"
            :height="sampleGraphHeight"
            timeUnit="day"
          />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SampleGraph from '../components/SampleGraph.vue'
import moment from 'moment'

export default {
  components: {
    SampleGraph
  },
  data () {
    return {
      node: {},
      daycollection: {},
      weekcollection: {},
      monthcollection: {},
      sampleGraphWidth: '90%',
      sampleGraphHeight: 'calc(90vh - 250px)'
    }
  },
  computed: {
    ...mapGetters({
      getNodeById: 'nodes/byId',
      getTimeseriesById: 'timeseries/byId'
    }),
    nodeId: function () {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions({
      loadNodeById: 'nodes/loadById',
      loadTimeseriesById: 'timeseries/loadById'
    }),
    loadNode: function () {
      this.loadNodeById({ id: this.nodeId }).then(() => {
        this.node = this.getNodeById({ id: this.nodeId }).attributes
      }).catch((error) => console.log(error))
    },
    loadCollection: function (from) {
      const promise = new Promise((resolve, reject) => {
        this.loadTimeseriesById({
          id: this.nodeId,
          options: {
            from: from
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
              // ,{
              //   label: 'Temperature',
              //   fill: false,
              //   borderColor: '#286679',
              //   yAxisID: 'temperatureAxis',
              //   data: timeseries.samples.map(s => { return { t: moment(1000 * s.timestamp_s), y: s.temperature_celsius } })
              // },
              // {
              //   label: 'Humidity',
              //   fill: false,
              //   borderColor: '#030303',
              //   yAxisID: 'humidityAxis',
              //   data: timeseries.samples.map(s => { return { t: moment(1000 * s.timestamp_s), y: s.rel_humidity_percent } })
              // }
            ]
          }
          resolve(collection)
        }).catch((error) => reject(error))
      })
      return promise
    },
    loadAllCollections: function () {
      this.loadCollection(moment().startOf('day').unix()).then((daycollection) => {
        this.daycollection = daycollection
      }).catch((error) => console.log(error))
      this.loadCollection(moment().startOf('isoWeek').unix()).then((weekcollection) => {
        this.weekcollection = weekcollection
      }).catch((error) => console.log(error))
      this.loadCollection(moment().startOf('month').unix()).then((monthcollection) => {
        this.monthcollection = monthcollection
      }).catch((error) => console.log(error))
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
    }
  }
}
</script>
<style lang="scss">
</style>
