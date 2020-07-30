<template>
  <div class="chartRender" ></div>
</template>

<script>
import { renderChart } from '@/utils/chartUtil'
export default {
  name: "ChartRender",
  props: {
    active:{
      type: Boolean,
      default: false
    },
    chart_id: {
      type: String,
      default: ""
    },
    chartOptions: {
      type: Object,
      default: null
    }
  },
  watch: {
      chartOptions: {
          handler: function(chartOptions) {//此处必须使用function,不能用箭头函数
            if(!chartOptions){
              return 
            }
              this.renderCharts(chartOptions)
          },
          immediate: true,
          deep: true,
      },
  },
  mounted() {
    //图表渲染, 部分需要修改默认配置的参数
    this.$nextTick(() => {
      let chartOptions = this.chartOptions
      this.renderCharts(chartOptions)
    });
  },
  methods: {
    // 渲染图表
    renderCharts(chartOptions){
      const renderChartObj = {
          chart_id: this.chart_id,
          chartOptions: chartOptions
      }
      renderChart(renderChartObj,this.$el);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
