<template>
  <div class="chartSetting">
    <div style="overflow: auto;height: 100%;">
      <!-- 图表类型 -->
      <chart-list
        :chartAllType="currentChartType"
        @closeChartShowList="showList=false"
        :showList="showList"
        :lang="lang"
      ></chart-list>
      <!-- 数据选择框 -->
      <div>
        <!-- tab切换 -->
        <el-tabs @tab-click="handleClick" v-model="activeName" type="card">
          <!-- 数据tab -->
          <el-tab-pane name="data">
            <span slot="label">
              <i class="el-icon-date"></i>
              {{setItem.data}}
            </span>

            <el-row>
              <el-col :span="2">
                <div>&nbsp;</div>
              </el-col>
              <el-col :span="22">
                <!-- 图表类型 -->
                <div style="margin-top: 1px;">{{setItem.chartType}}</div>
                <div style="margin-top: 10px;">
                  <el-button @click="showList = !showList" size="small" style="width:100%;">
                    <i :class="chartTypeTxt[0]" class="iconfont" style="float:left;"></i>
                    {{chartTypeTxt[1]}}
                    <i
                      class="iconfont icon-jiantou"
                      style="float:right;"
                    ></i>
                  </el-button>
                </div>

                <div style="margin-top:25px;"></div>
                <!-- X轴 -->
                <div v-if="chartXYSeriesList">
                  <div
                    :key="item.title"
                    style="margin-top: 10px;"
                    v-for="item in chartXYSeriesList.fix"
                  >
                    <el-row :gutter="10">
                      <el-col
                        :span="4"
                        style="line-height: 28px;text-align:right;"
                      >{{ item.title }}:</el-col>
                      <el-col :span="20">
                        <el-tag size="medium" style="width:100%;text-align:center;">
                          <i :class="item.type" class="iconfont" style="float:left;"></i>
                          {{ item.field }}
                        </el-tag>
                      </el-col>
                    </el-row>
                  </div>
                </div>

                <div style="margin-top:25px;"></div>
                <!-- 系列 -->
                <div v-if="chartXYSeriesList">
                  <div
                    :key="index"
                    style="margin-top: 10px;"
                    v-for="(item,index) in chartXYSeriesList.change"
                  >
                    <el-row :gutter="10">
                      <el-col :span="4" style="line-height: 28px;text-align:right;">{{item.title}}:</el-col>
                      <el-col :span="20">
                        <el-dropdown
                          @command="handleSeriseCommand"
                          size="medium"
                          style="width:100%;"
                          trigger="click"
                        >
                          <el-button size="mini" style="width:100%;">
                            <i
                              :class="item.type"
                              class="iconfont"
                              style="float:left;font-size:16px;"
                            ></i>
                            {{item.field}}
                            <i
                              class="iconfont icon-jiantou"
                              style="float:right;"
                            ></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown" style="min-width:306px;">
                            <el-dropdown-item
                              :command="{series:item, option:ditem}"
                              :key="`A-${index}`"
                              v-for="(ditem,index) in chartXYSeriesList.option"
                            >
                              {{ditem.field}}
                              <i
                                class="iconfont icon-dagou"
                                style="float:right;"
                                v-if="item.id==ditem.id"
                              ></i>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                    </el-row>
                  </div>
                </div>

                <div style="margin-top:25px;"></div>
                <!-- 转置 -->
                <el-row>
                  <div style="margin: 25px 0;"></div>
                  <el-checkbox
                    @change="checkBoxChange"
                    v-model="currentRangeConfigCheck"
                  >{{setItem.transpose}}</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox
                    :disabled="checkRowDisabled"
                    @change="checkBoxChange"
                    v-model="currentRangeRowCheck.exits"
                  >{{setItem.row1}} {{getColRowCheckTxt(true)}} {{setItem.row2}}</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox
                    :disabled="checkColDisabled"
                    @change="checkBoxChange"
                    v-model="currentRangeColCheck.exits"
                  >{{setItem.column1}} {{getColRowCheckTxt()}} {{setItem.column2}}</el-checkbox>
                </el-row>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 样式tab -->
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-s-data"></i>
              {{setItem.style}}
            </span>

            <el-row>
              <el-col :span="1">
                <div>&nbsp;</div>
              </el-col>
              <el-col :span="22">
                <el-collapse>
                  <!-- 标题组件 -->
                  <chart-title
                    :router="'titlePlace'"
                    :chartAllType="currentChartType"
                    :titleOption="titleOption"
                    :lang="lang"
                  ></chart-title>

                  <chart-sub-title
                    :router="'subtitlePlace'"
                    :chartAllType="currentChartType"
                    :subTitleOption="subTitleOption"
                    :lang="lang"
                  ></chart-sub-title>

                  <!-- 鼠标提示组件 -->
                  <chart-cursor
                    :router="'tooltip'"
                    :chartAllType="currentChartType"
                    :cursorOption="cursorOption"
                    :lang="lang"
                  ></chart-cursor>

                  <!-- 图例组件 -->
                  <chart-legend
                    :router="'legend'"
                    :chartAllType="currentChartType"
                    :legendOption="legendOption"
                    :lang="lang"
                  ></chart-legend>

                  <!-- 坐标轴组件 -->
                  <chart-axis
                    v-if="chart_type !='pie'"
                    :router="'axis'"
                    :axisOption="axisOption"
                    :chartAllType="currentChartType"
                    :lang="lang"
                  ></chart-axis>

                  <!-- 系列组件 -->
                  <chart-echarts-series :router="'commonSeries'" :lang="lang" v-if="echartsCommon" :seriesOptionData="seriesOptionData" :chartAllType="currentChartType"></chart-echarts-series>
                  <!-- 饼图系列 -->
                  <chart-pie-series :router="'pieSeries'" :lang="lang" v-if="chart_type == 'pie'" :pieOptionData="pieOptionData" :chartAllType="currentChartType"></chart-pie-series>

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
</template>

<script>
import ChartList from "./ChartList";
// const ChartTitle = () => import("./chartChips/chart/ChartTitle");
// const ChartSubTitle = () => import("./chartChips/chart/ChartSubTitle");
// const ChartCursor = () => import("./chartChips/chart/ChartCursor");
// const ChartLegend = () => import("./chartChips/chart/ChartLegend");
// const ChartAxis = () => import("./chartChips/chart/ChartAxis");

import { deepCopy } from "@/utils/util";
import { checkCurrentBoxChange, changeSeriesOrder } from "@/utils/chartUtil";
// import { isEqual } from "lodash";
import isEqual from 'lodash/isEqual';
import { chartComponent, chartOptions } from "@/data/chartJson";
import { mapState, mapActions } from "vuex";
import transCN from "@/data/cn";
import transEN from "@/data/en";

import ChartTitle from './chartChips/chart/ChartTitle'
import ChartSubTitle from './chartChips/chart/ChartSubTitle'
import ChartCursor from './chartChips/chart/ChartCursor'
import ChartLegend from './chartChips/chart/ChartLegend'
import ChartAxis from './chartChips/chart/ChartAxis'
import ChartEchartsSeries from './chartChips/chart/ChartEchartsSeries'
import PieSeries from './chartChips/chart/PieSeries'

export default {
  name: "ChartSetting",
  components: {
    "chart-list": ChartList,
    "chart-title": ChartTitle,
    "chart-sub-title": ChartSubTitle,
    "chart-cursor": ChartCursor,
    "chart-legend": ChartLegend,
    "chart-axis": ChartAxis,
    'chart-echarts-series': ChartEchartsSeries,
    'chart-pie-series': PieSeries
  },
  props: {
    chartOptions: {
      type: Object,
      default: null,
    },
    lang: {
      type: String,
      default: "zh",
    },
  },
  data() {
    return {
      currentChartType: "echarts|line|default", //图表类型
      chart_id: '',
      titleOption: deepCopy(chartComponent.title), //标题设置
      subTitleOption: deepCopy(chartComponent.subtitle), //标题设置
      cursorOption: deepCopy(chartComponent.tooltip), //鼠标提示设置
      legendOption: deepCopy(chartComponent.legend), //图例设置
      axisOption: deepCopy(chartComponent.axis), //坐标轴设置
      seriesOptionData: {},     //普通系列设置
      pieOptionData: {},     //饼图系列设置
      showList: false,
      setItem: {
        echarts: {
          line: {
            default: '默认折线图'
          }
        }
      },
      activeName: 'data'
    };
  },
  mounted() {
    if (this.lang == "zh") {
      this.setItem = transCN["chartSetting"];
      return;
    }
    this.setItem = transEN["chartSetting"];
    console.dir(this.setItem);
  },
  watch: {
    chartOptions: {
      handler: function (chartOption, oldV) {
        //此处必须使用function,不能用箭头函数
        if (
          chartOption == undefined ||
          !chartOption.hasOwnProperty("chartAllType")
        ) {
          return;
        }
        this.currentChartType = chartOption.chartAllType;
        this.chart_id = chartOption.chart_id
        this.titleOption = chartOption.defaultOption.titlePlace;
        this.subTitleOption = chartOption.defaultOption.subtitlePlace;
        this.cursorOption = chartOption.defaultOption.tooltipPlace;
        this.legendOption = chartOption.defaultOption.legendPlace;
        this.axisOption = chartOption.defaultOption.axis;
        this.seriesOptionData = chartOption.defaultOption.commonSeries
        this.pieOptionData = chartOption.defaultOption.pieSeries
      },
    },
    lang(val) {
      if (val == "zh") {
        this.setItem = transCN["chartSetting"];
        return;
      }
      this.setItem = transEN["chartSetting"];
    },
  },
  computed: {
    ...mapState("chartSetting", ["chartLists", "currentChartIndex"]),
    echartsCommon(){
      if(this.chart_pro == 'echarts'){
        if(this.chart_type == 'line' || this.chart_type == 'area' || this.chart_type == 'bar' || this.chart_type == 'column'){
          if(this.seriesOptionData.option){
            return true
          }
        }
      }
      return false
    },
    currentRangeColCheck: {
      get() {
        if (this.currentChartIndex == null) {
          return { exits: false, range: [0, 0] };
        }
        return this.chartLists[this.currentChartIndex].chartOptions
          .rangeColCheck;
      },
      set(val) {
        this.updateChartItemChartlistOne({ key: "rangeColCheck", value: val, chart_id: this.chart_id });
      },
    },
    currentRangeRowCheck: {
      get() {
        if (this.currentChartIndex == null) {
          return { exits: false, range: [0, 0] };
        }
        return this.chartLists[this.currentChartIndex].chartOptions
          .rangeRowCheck;
      },
      set(val) {
        this.updateChartItemChartlistOne({ key: "rangeRowCheck", value: val, chart_id: this.chart_id });
      },
    },
    checkRowDisabled() {
      if (
        this.currentChartIndex == null ||
        !this.chartLists[this.currentChartIndex].chartOptions.chartData ||
        this.chartLists[this.currentChartIndex].chartOptions.chartData.length ==
          1
      ) {
        return true;
      }
      return false;
    },
    checkColDisabled() {
      if (
        this.currentChartIndex == null ||
        !this.chartLists[this.currentChartIndex].chartOptions.chartData ||
        this.chartLists[this.currentChartIndex].chartOptions.chartData.length ==
          1
      ) {
        return true;
      }
      return false;
    },
    currentRangeConfigCheck: {
      get() {
        if (this.currentChartIndex == null) {
          return false;
        }
        return this.chartLists[this.currentChartIndex].chartOptions
          .rangeConfigCheck;
      },
      set(val) {
        this.updateChartItemChartlistOne({
          key: "rangeConfigCheck",
          value: val,
          chart_id: this.chart_id
        });
      },
    },
    chart_pro() {
      return this.currentChartType.split("|")[0];
    },
    chart_type() {
      return this.currentChartType.split("|")[1];
    },
    chart_style() {
      return this.currentChartType.split("|")[2];
    },
    //图表选项的文本
    chartTypeTxt: function () {

      var head, main, icon;
      if (this.chart_pro == "echarts") {
        head = "echarts";
      } else if (this.chart_pro == "highcharts") {
        head = "highcharts";
      }

      if (this.chart_type == "line") {
        if (this.chart_style == "default") {
          main = this.setItem.echarts.line.default;
        }
        if (this.chart_style == "smooth") {
          main = this.setItem.echarts.line.smooth;
        }
        if (this.chart_style == "label") {
          main = this.setItem.echarts.line.label;
        }
        if (this.chart_style == "doublex") {
          main = "双Y轴折线图";
        }
        if (this.chart_style == "linemix") {
          main = "折线柱状混合图";
        }
        icon = "icon-tubiaozhexiantu";
        return [icon, head + " - " + main];
      } else if (this.chart_type == "area") {
        if (this.chart_style == "default") {
          main = this.setItem.echarts.area.default;
        }
        if (this.chart_style == "stack") {
          main = this.setItem.echarts.area.stack;
        }
        if (this.chart_style == "stackRatio") {
          main = "带标签的堆叠面积图";
        }
        icon = "icon-fsux_tubiao_duijimianjitu";
        return [icon, head + " - " + main];
      } else if (this.chart_type == "column") {
        if (this.chart_style == "default") {
          main = this.setItem.echarts.column.default;
        }
        if (this.chart_style == "stack") {
          main = this.setItem.echarts.column.stack;
        }
        if (this.chart_style == "stackRatio") {
          main = "百分比堆叠柱状图";
        }
        if (this.chart_style == "costComposition") {
          main = "费用构成柱状图";
        }
        if (this.chart_style == "polarStack") {
          main = "极坐标系下的堆叠柱状图";
        }
        if (this.chart_style == "bar3DPunchCard") {
          main = "3D柱状图";
        }
        if (this.chart_style == "contain") {
          main = "比例图";
        }
        if (this.chart_style == "special") {
          main = "显示百分比图";
        }
        if (this.chart_style == "doubleX") {
          main = "双X轴";
        }
        icon = "icon-chart";
        return [icon, head + " - " + main];
      } else if (this.chart_type == "bar") {
        if (this.chart_style == "default") {
          main = this.setItem.echarts.bar.default;
        }
        if (this.chart_style == "stack") {
          main = this.setItem.echarts.bar.stack;
        }
        if (this.chart_style == "stackRatio") {
          main = "百分比堆叠条形图";
        }
        if (this.chart_style == "compare") {
          main = "条形比较图";
        }
        if (this.chart_style == "contain") {
          main = "比例图";
        }
        icon = "icon-fsux_tubiao_duijizhuzhuangtu1";
        return [icon, head + " - " + main];
      } else if (this.chart_type == "pie") {
        if (this.chart_style == "default") {
          main = this.setItem.echarts.pie.default;
        }
        if (this.chart_style == "split") {
          main = this.setItem.echarts.pie.split;
        }
        if (this.chart_style == "ring") {
          main = this.setItem.echarts.pie.ring;
        }
        if (this.chart_style == "ringnest") {
          main = "环形嵌套图";
        }
        if (this.chart_style == "3D") {
          main = "3D饼图";
        }
        if (this.chart_style == "rose") {
          if (this.chart_pro == "echarts") {
            main = "南丁格玫瑰图";
          } else if (this.chart_pro == "highcharts") {
            main = "可变宽度的环形图";
          }
        }
        icon = "icon-fsux_tubiao_nandingmeiguitu";
        return [icon, head + " - " + main];
      }
      if (this.chart_type == "scatter") {
        if (this.chart_style == "default") {
          main = "默认散点图";
        }
        if (this.chart_style == "label") {
          main = "带标签的散点图";
        }
        if (this.chart_style == "zoom") {
          main = "自由缩放散点图";
        }
        if (this.chart_style == "matrix") {
          main = "散点图矩阵";
        }
        icon = "icon-fsux_tubiao_qipaotu";
        return [icon, head + " - " + main];
      }
      if (this.chart_type == "radar") {
        if (this.chart_style == "default") {
          main = "默认雷达图";
        }
        icon = "icon-leidatu";
        return [icon, head + " - " + main];
      } else if (this.chart_type == "funnel") {
        if (this.chart_style == "default") {
          main = "默认漏斗图";
        }
        if (this.chart_style == "inverse") {
          main = "逆漏斗图";
        }
        icon = "icon-fsux_tubiao_loudoutu";
        return [icon, head + " - " + main];
      } else if (this.chart_type == "gauge") {
        if (this.chart_style == "default") {
          main = "仪表盘";
        }
        if (this.chart_style == "percent") {
          main = "百分比仪表盘";
        }
        if (this.chart_style == "solid") {
          main = "活动图";
        }
        icon = "icon-fsux_tubiao_yibiaopan";
        return [icon, head + " - " + main];
      } else if (this.chart_type == "map") {
        if (this.chart_style == "china") {
          main = "中国地图";
        } else if (this.chart_style == "province") {
          main = "省份地图";
        } else if (this.chart_style == "cnscatter") {
          main = "中国地图散点图";
        } else if (this.chart_style == "pvscatter") {
          main = "省份地图散点图";
        } else if (this.chart_style == "percent") {
          main = "百分比地图";
        }
        icon = "icon-fsux_tubiao_ditu";
        return [icon, head + " - " + main];
      } else if (this.chart_type == "earth") {
        return [icon, head + " - " + "3D 地球"];
      }
    },
    currentChartDataCache() {
      // get() {
      if (this.currentChartIndex == null) {
        return null;
      }
      return this.chartLists[this.currentChartIndex].chartOptions
        .chartDataCache;
      // },
      // set(val) {
      //   this.updateChartItemChartlistOne({ key: "rangeColCheck", val });
      // },
    },
    chartXYSeriesList() {
      if (this.currentChartDataCache == null) {
        return;
      }
      let chartDataSeriesOrder = this.chartLists[this.currentChartIndex]
        .chartOptions.chartDataSeriesOrder;

      var chartAllTypeArray = this.currentChartType.split("|");
      var chartPro = chartAllTypeArray[0],
        chartType = chartAllTypeArray[1],
        chartStyle = chartAllTypeArray[2];

      var valueType = {
        num: "icon-shuzi",
        string: "icon-format_icon",
        date: "icon-date",
      };

      var ret = { fix: [], change: [], option: [] };
      if (
        chartType == "line" ||
        chartType == "column" ||
        chartType == "area" ||
        chartType == "scatter"
      ) {
        if (this.currentChartDataCache.title != null) {
          ret.fix.push({
            title: "x轴",
            type: valueType["string"],
            field: this.currentChartDataCache.title.text,
          });
        }

        if (this.currentChartDataCache.label != null) {
          for (var i = 0; i < this.currentChartDataCache.label.length; i++) {
            var trueIndex = chartDataSeriesOrder[i];
            ret.change[trueIndex] = {
              title: "系列" + (trueIndex + 1),
              index: trueIndex,
              type: valueType[this.currentChartDataCache.series_tpye[i]],
              field: this.currentChartDataCache.label[i],
              id: i,
            };

            ret.option.push({
              field: this.currentChartDataCache.label[i],
              id: i,
              index: trueIndex,
            });
          }
        }
      }

      return ret;
    },
    currentChartDataSeriesOrder: {
      get() {
        if (this.currentChartIndex == null) {
          return {};
        }
        return this.chartLists[this.currentChartIndex].chartOptions
          .chartDataSeriesOrder;
      },
      set(val) {
        this.updateChartItemChartlistOne({
          key: "chartDataSeriesOrder",
          value: val,
          chart_id: this.chart_id
        });
      },
    },
  },
  methods: {
    ...mapActions("chartSetting", ["updateChartItemChartlistOne"]),
    handleClick(tab) {
      if (tab.index != 0) {
        this.showList = false;
      }
    },
    //列/行头部的标题例如列A、行1
    getColRowCheckTxt: function (isRow) {
      if (!isRow) {
        var txt = "";
        if (
          this.currentRangeColCheck.range[0] ==
          this.currentRangeColCheck.range[1]
        ) {
          txt = this.currentRangeColCheck.range[0] + 1;
        } else {
          txt =
            this.currentRangeColCheck.range[0] +
            1 +
            "至" +
            (this.currentRangeColCheck.range[1] + 1) +
            "";
        }

        return txt;
      } else {
        var txt = "";
        if (
          this.currentRangeRowCheck.range[0] ==
          this.currentRangeRowCheck.range[1]
        ) {
          txt = this.currentRangeRowCheck.range[0] + 1;
        } else {
          txt =
            this.currentRangeRowCheck.range[0] +
            1 +
            "至" +
            (this.currentRangeRowCheck.range[1] + 1) +
            "";
        }

        return txt;
      }
    },
    // 转置行列操作
    checkBoxChange: function () {
      var chart_id = this.chartLists[this.currentChartIndex].chartOptions
        .chart_id;
      var rangeRowCheck = this.currentRangeRowCheck;
      var rangeColCheck = this.currentRangeColCheck;
      var rangeConfigCheck = this.currentRangeConfigCheck;

      checkCurrentBoxChange(
        chart_id,
        rangeRowCheck,
        rangeColCheck,
        rangeConfigCheck
      );
    },
    //系列列表的下拉菜单操作
    handleSeriseCommand: function (command) {
      var series = command.series,
        option = command.option;
      var newOrder = deepCopy(this.currentChartDataSeriesOrder);
      var newid = option.id,
        newTrueIndex = series.index;
      var exchangeid = series.id,
        exchangeTrueIndex = newOrder[newid];

      newOrder[newid] = newTrueIndex;
      newOrder[exchangeid] = exchangeTrueIndex;

      this.currentChartDataSeriesOrder = newOrder;

      changeSeriesOrder(
        this.chartLists[this.currentChartIndex].chartOptions,
        this.currentChartDataSeriesOrder
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import "@/assets/css/chartMix.scss";

.chartSetting {
  width: 100%;
  height: 100%;
}
</style>
