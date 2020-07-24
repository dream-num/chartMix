<template>
  <div class="chartSetting">
    <div >
      <div style="overflow: hidden;">
        <div >
          <!-- tab切换 -->
          <el-tabs @tab-click="handleClick" type="card">
            <!-- 数据tab -->
            <el-tab-pane name="data">
              <span slot="label">
                <i class="el-icon-date"></i> 数据
              </span>

              <el-row>
                <el-col :span="2">
                  <div>&nbsp;</div>
                </el-col>
                <el-col :span="20" >
                  <p style="font-size:12px;color:#626262;margin-bottom:20px;">暂不支持修改</p> 
                  <!-- 图表类型 -->

                  <!-- 数据选择框 -->

                  <!-- X轴 -->

                  <!-- 系列 -->

                  <!-- 转置 -->
                </el-col>
                <el-col :span="2">
                  <div>&nbsp;</div>
                </el-col>
              </el-row>
            </el-tab-pane>

            <!-- 样式tab -->
            <el-tab-pane>
              <span slot="label">
                <i class="el-icon-s-data"></i> 样式
              </span>

              <el-row>
                <el-col :span="1">
                  <div>&nbsp;</div>
                </el-col>
                <el-col :span="22">
                  <el-collapse>
                    <!-- 标题组件 -->
                    <chart-title :router="'title'" :chartAllType="currentChartType" :titleOption="titleOption"></chart-title>

                    <chart-sub-title :router="'subtitle'" :chartAllType="currentChartType" :subTitleOption="subTitleOption"></chart-sub-title>

                    <!-- 鼠标提示组件 -->
                    <chart-cursor :router="'tooltip'" :chartAllType="currentChartType" :cursorOption="cursorOption"></chart-cursor>

                    <!-- 图例组件 -->
                    <chart-legend :router="'legend'" :chartAllType="currentChartType" :legendOption="legendOption"></chart-legend>

                    <!-- 坐标轴组件 -->
                    <chart-axis v-if="currentChartType.split('|')[1]!='pie'" :router="'axis'" :axisOption="axisOption" :chartAllType="currentChartType"></chart-axis>

                  </el-collapse>
                </el-col>
                <el-col :span="1">
                  <div>&nbsp;</div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

const ChartTitle = () => import('./chartChips/chart/ChartTitle')
const ChartSubTitle = () => import('./chartChips/chart/ChartSubTitle')
const ChartCursor = () => import('./chartChips/chart/ChartCursor')
const ChartLegend = () => import('./chartChips/chart/ChartLegend')
const ChartAxis = () => import('./chartChips/chart/ChartAxis')

import { deepCopy } from '@/utils/util';
import { chartComponent, chartOptions } from '@/data/chartJson';


export default {
    name: 'ChartSetting',
    components: {
        'chart-title': ChartTitle,
        'chart-sub-title': ChartSubTitle,
        'chart-cursor': ChartCursor,
        'chart-legend': ChartLegend,
        'chart-axis': ChartAxis,
    },
    props: {
      chartOptions: {
        type: Object,
        default: null
      }
    },
    mounted(){
      console.dir(this.chartOptions)
    },
    data() {
        return {
            currentChartType: '', //图表类型
            titleOption: deepCopy(chartComponent.title), //标题设置
            subTitleOption: deepCopy(chartComponent.subtitle), //标题设置
            cursorOption: deepCopy(chartComponent.tooltip), //鼠标提示设置
            legendOption: deepCopy(chartComponent.legend), //图例设置
            axisOption: deepCopy(chartComponent.axis), //坐标轴设置
        };
    },
    watch: {
        chartOptions: {
            handler: function(chartOption , oldV) {//此处必须使用function,不能用箭头函数
                if(chartOption == undefined || !chartOption.hasOwnProperty('chartAllType')){
                  return;
                }
                this.currentChartType = chartOption.chartAllType;
                this.titleOption = chartOption.defaultOption.title;
                this.subTitleOption = chartOption.defaultOption.subtitle;
                this.cursorOption = chartOption.defaultOption.tooltip;
                this.legendOption = chartOption.defaultOption.legend;
                this.axisOption = chartOption.defaultOption.axis;
            },

        },
    },
    methods: {
        handleClick(tab) {
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import '@/assets/css/chartMix.scss';

.chartSetting{
  width: 100%;
  height: 100%;
}

</style>
