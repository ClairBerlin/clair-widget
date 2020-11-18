<template>
  <line-chart :chart-data="datacollection" :styles="chartsStyles" :options="chartsOptions"></line-chart>
</template>

<script>
import LineChart from '../components/LineChart.js'

export default {
  components: {
    LineChart
  },
  props: {
    datacollection: Object,
    timeUnit: String,
    height: String,
    width: String,
    xTicks: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      chartsStyles: {
        position: 'relative',
        height: this.height,
        'max-height': '1000px',
        width: this.width,
        margin: '20px auto'
      }
    }
  },
  computed: {
    chartsOptions: function () {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: this.timeUnit
            },
            ticks: this.xTicks
          }],
          yAxes: [{
            id: 'co2Axis',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: false,
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
  }
}
</script>

<style>
</style>
