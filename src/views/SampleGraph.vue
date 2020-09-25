<template>
  <div>
    <h2>{{node.alias}}</h2>
    <line-chart :chart-data="datacollection" :styles="chartsStyles" :options="chartsOptions"></line-chart>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LineChart from '../components/LineChart.js'
import moment from 'moment'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      node: {},
      chartsStyles: {
        position: 'relative',
        height: 'calc(80vh - 100px)',
        width: '90vw',
        margin: '50px auto'
      },
      datacollection: {},
      chartsOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour'
            }
          }],
          yAxes: [{
            id: 'co2Axis',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'CO2 [ppm]'
            },
            ticks: {
              min: 0,
              max: 1800
            },
            gridLines: {
              color: ['#27ff00', '#27ff00', '#27ff00', '#95fe00', '#d0fc00', '#fff800', '#ffd400', '#ffaf00', '#ff8700', '#ff0000', '#ff0000'].reverse()
            }
          }, {
            id: 'temperatureAxis',
            type: 'linear',
            display: false,
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: '°C',
              fontColor: '#286679'
            },
            ticks: {
              min: 10,
              max: 35
            }
          }, {
            id: 'humidityAxis',
            type: 'linear',
            display: false,
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: '%',
              fontColor: '#030303'
            },
            ticks: {
              min: 0,
              max: 100
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getNodeById: 'nodes/byId',
      getTimeseriesById: 'timeseries/byId'
    })
  },
  methods: {
    ...mapActions({
      loadNodeById: 'nodes/loadById',
      loadTimeseriesById: 'timeseries/loadById'
    })
  },
  mounted () {
    const nodeId = this.$route.params.id
    this.loadNodeById({ id: nodeId }).then(() => {
      this.node = this.getNodeById({ id: nodeId }).attributes
    }).catch((error) => console.log(error))
    this.loadTimeseriesById({
      id: nodeId,
      options: {
        from: Math.round(new Date() / 1000) - 7 * 24 * 60 * 60
      }
    }).then(() => {
      const queryResult = this.getTimeseriesById({ id: nodeId })
      const timeseries = queryResult.attributes
      this.datacollection = {
        datasets: [
          {
            label: 'CO2',
            fill: true,
            yAxisID: 'co2Axis',
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
    }).catch((error) => console.log(error))
  }
}
</script>

<style>
</style>
