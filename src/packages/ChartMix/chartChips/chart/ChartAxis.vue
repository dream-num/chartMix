<template>
  <el-collapse-item name="6">
    <template slot="title">
      {{ setItem.modalName }}
      <i class="iconfont icon-biaoti"></i>
    </template>
    <!-- 选择坐标轴 -->
    <chart-base-select :selectOption="axisGroup" :selectValue.sync="axis.axisType">
      <div slot="select">{{ setItem.select }}</div>
    </chart-base-select>
    <!-- 是否显示坐标轴 -->
    <chart-base-switch :prop="'show'" :switchValue.sync="series.show" @summit="summit(arguments)">
      <div slot="title">{{ series.name }}</div>
    </chart-base-switch>

    <div v-show="series.show">
      <!-- 标题内容 -->
      <chart-base-input
        :inputValue.sync="series.title.text"
        :placeholder="setItem.placeholder"
        :prop="'title.text'"
        @summit="summit(arguments)"
      >
        <div slot="input">{{ setItem.text }}</div>
      </chart-base-input>

      <div style="margin-top: 15px" v-show="series.title.text">
        <!-- 文本样式 -->
        <chart-base-label
          :baseLabelOption.sync="series.title.label"
          :prop="'axisPlace-' + this.axis.axisType + ':label'"
          :router="router +  '/' + this.axis.axisType + '/title/label'"
        >
          <div slot="title">{{ setItem.label }}</div>
        </chart-base-label>
        <!-- 文本对齐方式 -->
        <chart-base-select
          :prop="'title.fzPosition'"
          :selectOption="fzPosOption"
          :selectValue.sync="series.title.fzPosition"
          @summit="summit(arguments)"
        >
          <div slot="select">{{ setItem.align }}</div>
        </chart-base-select>
      </div>

      <!-- 反向坐标轴 -->
      <chart-base-switch
        :prop="'inverse'"
        :switchValue.sync="series.inverse"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.reverse }}</div>
      </chart-base-switch>

      <!-- 坐标轴间隔数 -->
      <chart-base-slider
        :baseSliderOption.sync="series.tickLabel.optimize"
        :content="setItem.content"
        :hideCol="true"
        :max="10"
        :prop="'tickLabel.optimize'"
        :unit="'个'"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.intenval }}</div>
      </chart-base-slider>

      <div v-show="series.title.text">
        <!-- 标题与轴线距离 -->
        <chart-base-slider
          :baseSliderOption.sync="series.title.nameGap"
          :content="setItem.content1"
          :hideCol="true"
          :prop="'title.nameGap'"
          :unit="'px'"
          @summit="summit(arguments)"
        >
          <div slot="title">{{ setItem.gap }}</div>
        </chart-base-slider>
        <!-- 倾斜轴标题 -->
        <chart-base-slider
          :baseSliderOption.sync="series.title.rotate"
          :content="setItem.content2"
          :format="formatRotation + ''"
          :hideCol="true"
          :max="180"
          :min="-180"
          :prop="'title.rotate'"
          :unit="'°'"
          @summit="summit(arguments)"
        >
          <div slot="title">{{ setItem.title }}</div>
        </chart-base-slider>
      </div>

      <!-- 显示刻度线 -->
      <chart-base-switch
        :prop="'tickLine.show'"
        :switchValue.sync="series.tickLine.show"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.showLine }}</div>
      </chart-base-switch>

      <!-- 刻度线宽度 -->
      <chart-base-slider
        :baseSliderOption.sync="series.tickLine.width"
        :content="setItem.content3"
        :hideCol="true"
        :min="1"
        :prop="'tickLine.width'"
        :unit="'px'"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.lineWidth }}</div>
      </chart-base-slider>
      <!-- 刻度线颜色 -->
      <el-row style="margin-top: 15px">
        <el-col :span="7" class="title">{{ setItem.lineColor }}</el-col>
        <el-col :push="14" :span="3">
          <el-tooltip
            :content="setItem.lineColor"
            :open-delay="500"
            effect="dark"
            placement="bottom"
          >
            <el-color-picker size="mini" v-model="series.tickLine.color"></el-color-picker>
          </el-tooltip>
        </el-col>
      </el-row>

      <!-- 显示刻度 -->
      <chart-base-switch
        :prop="'tick.show'"
        :switchValue.sync="series.tick.show"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.showTick }}</div>
      </chart-base-switch>

      <!-- 刻度位置 -->
      <chart-base-select
        :prop="'tick.position'"
        :selectOption="orient"
        :selectValue.sync="series.tick.position"
        @summit="summit(arguments)"
      >
        <div slot="select">{{ setItem.position }}</div>
      </chart-base-select>

      <!-- 刻度长度 -->
      <chart-base-slider
        :baseSliderOption.sync="series.tick.length"
        :content="setItem.content4"
        :hideCol="true"
        :min="1"
        :prop="'tick.length'"
        :unit="'px'"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.tickLength }}</div>
      </chart-base-slider>

      <!-- 刻度宽度 -->
      <chart-base-slider
        :baseSliderOption.sync="series.tick.width"
        :content="setItem.content5"
        :hideCol="true"
        :max="20"
        :min="1"
        :prop="'tick.width'"
        :unit="'px'"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.tickWidth }}</div>
      </chart-base-slider>
      <!-- 刻度颜色 -->
      <el-row style="margin-top: 15px">
        <el-col :span="6" class="title">{{ setItem.tickColor }}</el-col>
        <el-col :push="14" :span="4">
          <el-tooltip
            :content="setItem.tickColor"
            :open-delay="500"
            effect="dark"
            placement="bottom"
          >
            <el-color-picker size="mini" v-model="series.tick.color"></el-color-picker>
          </el-tooltip>
        </el-col>
      </el-row>

      <!-- 显示刻度标签 -->
      <chart-base-switch
        :prop="'tickLabel.show'"
        :switchValue.sync="series.tickLabel.show"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.showLabel }}</div>
      </chart-base-switch>

      <!-- 倾斜标签 -->
      <chart-base-slider
        :baseSliderOption.sync="series.tickLabel.rotate"
        :content="setItem.content6"
        :format="formatRotation"
        :hideCol="true"
        :max="180"
        :min="-180"
        :prop="'tickLabel.rotate'"
        :unit="'°'"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.rotate }}</div>
      </chart-base-slider>

      <!-- Y轴有数据编辑 -->
      <div v-show="showLabel">
        <!-- 刻度最小值 -->
        <chart-base-input
          :inputValue.sync="series.tickLabel.min"
          :placeholder="setItem.content7"
          :prop="'tickLabel.min'"
          :type="'text'"
          @summit="summit(arguments)"
        >
          <div slot="input">{{ setItem.min }}</div>
        </chart-base-input>
        <!-- 刻度最大值 -->
        <chart-base-input
          :inputValue.sync="series.tickLabel.max"
          :placeholder="setItem.content8"
          :prop="'tickLabel.max'"
          :type="'text'"
          @summit="summit(arguments)"
        >
          <div slot="input">{{ setItem.max }}</div>
        </chart-base-input>
        <!-- 数值缩放比例 -->
        <chart-base-select
          :prop="'format-ratio'"
          :selectOption="ratioOption"
          :selectValue.sync="series.tickLabel.ratio"
          @summit="summit(arguments)"
        >
          <div slot="select">{{ setItem.ratio }}</div>
        </chart-base-select>
        <!-- 小数位数 -->
        <chart-base-select
          :prop="'format-digit'"
          :selectOption="digitOption"
          :selectValue.sync="series.tickLabel.digit"
          @summit="summit(arguments)"
        >
          <div slot="select">{{ setItem.digit }}</div>
        </chart-base-select>
      </div>

      <!-- 标签前缀 -->
      <chart-base-input
        :inputValue.sync="series.tickLabel.prefix"
        :placeholder="setItem.content9"
        :prop="'format-prefix'"
        @summit="summit(arguments)"
      >
        <div slot="input">{{ setItem.prefix }}</div>
      </chart-base-input>
      <!-- 标签后缀 -->
      <chart-base-input
        :inputValue.sync="series.tickLabel.suffix"
        :placeholder="setItem.content10"
        :prop="'format-suffix'"
        @summit="summit(arguments)"
      >
        <div slot="input">{{ setItem.suffix }}</div>
      </chart-base-input>

      <!-- 显示网格线 -->
      <chart-base-switch
        :prop="'netLine.show'"
        :switchValue.sync="series.netLine.show"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.showNet }}</div>
      </chart-base-switch>

      <div v-show="series.netLine.show">
        <!-- 网格线宽度 -->
        <chart-base-slider
          :baseSliderOption.sync="series.netLine.width"
          :content="setItem.content11"
          :hideCol="true"
          :max="20"
          :min="1"
          :prop="'netLine.width'"
          :unit="'px'"
          @summit="summit(arguments)"
        >
          <div slot="title">{{ setItem.netWidth }}</div>
        </chart-base-slider>
        <!-- 网格线类型 -->
        <chart-base-select
          :prop="'netLine.type'"
          :selectOption="lineStyleOption"
          :selectValue.sync="series.netLine.type"
          @summit="summit(arguments)"
        >
          <div slot="select">{{ setItem.netType }}</div>
        </chart-base-select>
        <!-- 网格线颜色 -->
        <el-row style="margin-top: 15px">
          <el-col :span="8" class="title">{{ setItem.netColor }}</el-col>
          <el-col :push="13" :span="3">
            <el-tooltip
              :content="setItem.netColor"
              :open-delay="500"
              effect="dark"
              placement="bottom"
            >
              <el-color-picker :label="true" size="mini" v-model="series.netLine.color"></el-color-picker>
            </el-tooltip>
          </el-col>
        </el-row>
        <!-- 网格线分割间隔数 -->
        <chart-base-select
          :prop="'netLine.interval.value'"
          :selectOption="intervalOption"
          :selectValue.sync="series.netLine.interval.value"
          @summit="summit(arguments)"
        >
          <div slot="select">{{ setItem.netInterval }}</div>
        </chart-base-select>
        <!-- 自定义间隔数 -->
        <chart-base-slider
          :baseSliderOption.sync="series.netLine.interval.cusNumber"
          :content="setItem.content12"
          :prop="'netLine.interval.cusNumber'"
          :unit="'个'"
          @summit="summit(arguments)"
          v-if="series.netLine.interval.value == 'custom'"
        ></chart-base-slider>
      </div>

      <!-- 显示网格区域 -->
      <chart-base-switch
        :prop="'netArea.show'"
        :switchValue.sync="series.netArea.show"
        @summit="summit(arguments)"
      >
        <div slot="title">{{ setItem.showArea }}</div>
      </chart-base-switch>
      <div v-show="series.netArea.show">
        <!-- 网格区域分割间隔数 -->
        <chart-base-select
          :prop="'netArea.interval.value'"
          :selectOption="intervalOption"
          :selectValue.sync="series.netArea.interval.value"
          @summit="summit(arguments)"
        >
          <div slot="select">{{ setItem.areaInterval }}</div>
        </chart-base-select>
        <!-- 自定义间隔数 -->
        <chart-base-slider
          :baseSliderOption.sync="series.netArea.interval.cusNumber"
          :content="setItem.content12"
          :prop="'netArea.interval.cusNumber'"
          :unit="'个'"
          @summit="summit(arguments)"
          v-if="series.netArea.interval.value == 'custom'"
        ></chart-base-slider>

        <el-row style="margin-top: 15px">
          <el-col :span="6">{{ setItem.area1 }}</el-col>
          <el-col :span="3">
            <el-color-picker size="mini" v-model="series.netArea.colorOne"></el-color-picker>
          </el-col>
          <el-col :span="6">{{ setItem.area2 }}</el-col>
          <el-col :span="3">
            <el-color-picker size="mini" v-model="series.netArea.colorTwo"></el-color-picker>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-collapse-item>
</template>

<script>
import * as t from '@/utils/importUtil'
import {
  fontSizeOption,
  lineStyleOption,
  intervalOption,
  digitOption,
  ratioOption
} from '@/data/chartJson'
import transCN from '@/data/cn'
import transEN from '@/data/en'

export default {
  name: 'ChartXaxis',
  props: {
    chartAllType: String,
    axisOption: Object,
    router: String,
    lang: {
      type: String,
      default: 'zh'
    }
  },
  components: {
    ...t.importComp(t)
  },
  data() {
    return {
      axis: {},
      series: {}, //具体坐标轴配置
      fontSizeOption: '',
      lineStyleOption: '',
      ratioOption: '',
      digitOption: '',
      fzPosOption: [
        { value: 'middle', label: '居中' },
        { value: 'start', label: '头部' },
        { value: 'end', label: '尾部' },
        { value: 'hidden', label: '隐藏' }
      ],
      orient: [
        { label: '朝内', value: 'inside' },
        { label: '朝外', value: 'outside' }
      ],
      formatRotation: function(val) {
        return val + ' °'
      },
      setItem: {}
    }
  },
  mounted() {
    if (this.lang == 'zh') {
      this.setItem = transCN['chartAxis']
      return
    }
    this.setItem = transEN['chartAxis']
  },
  watch: {
    axisOption: {
      handler(newVal) {
        if (t.isEqual(this.axis, this.axisOption)) {
          return
        }
        this.axis = t.deepCopy(this.axisOption)
        this.series = this.axis[newVal.axisType]
        this.fontSizeOption = t.deepCopy(fontSizeOption)
        this.lineStyleOption = t.deepCopy(lineStyleOption)
        this.intervalOption = t.deepCopy(intervalOption)
        this.ratioOption = t.deepCopy(ratioOption)
        this.digitOption = t.deepCopy(digitOption)
      },
      immediate: true,
      deep: true
    },
    series: {
      handler: function(newVal, oldVal) {
        // 改变值就重新渲染
        if (oldVal) {
          this.changeAxis()
        }
      },
      deep: true,
      immediate: true
    },
    lang(val) {
      if (val == 'zh') {
        this.setItem = transCN['chartAxis']
        return
      }
      this.setItem = transEN['chartAxis']
    }
  },
  computed: {
    chartType() {
      return this.chartAllType.split('|')[1]
    },
    chartStyle() {
      return this.chartAllType.split('|')[2]
    },
    axisGroup() {
      if (this.chartType == 'bar' && this.chartStyle != 'compare') {
        return [
          { value: 'xAxisDown', label: 'Y轴(左侧垂直)' },
          { value: 'xAxisUp', label: 'Y轴(左侧垂直)' },
          { value: 'yAxisLeft', label: 'X轴(下方水平)' },
          { value: 'yAxisRight', label: 'X轴(上方水平)' }
        ]
      } else if (this.chartStyle == 'compare') {
        return [
          { value: 'xAxisDown', label: 'Y轴(右侧坐标轴)' },
          { value: 'xAxisUp', label: 'Y轴(左侧坐标轴)' },
          { value: 'yAxisLeft', label: 'X轴(右侧坐标轴)' },
          { value: 'yAxisRight', label: 'X轴(左侧坐标轴)' }
        ]
      } else {
        return [
          { value: 'xAxisDown', label: 'X轴(下方水平)' },
          { value: 'xAxisUp', label: 'X轴(上方水平)' },
          { value: 'yAxisLeft', label: 'Y轴(左侧垂直)' },
          { value: 'yAxisRight', label: 'Y轴(右侧垂直)' }
        ]
      }
    },
    showLabel() {
      if (
        (this.chartType == 'bar' && this.axis.axisType.slice(0, 1) == 'x') ||
        (this.chartType != 'bar' && this.axis.axisType.slice(0, 1) == 'y')
      ) {
        return true
      }
    }
  },
  methods: {
    ...t.mapActions('chartSetting', ['updateChartItem', 'updateCurrentProp']),
    changeAxis() {
      let prop = {
        prop: 'axisPlace-' + this.axis.axisType + ':' + this.prop,
        oldValue: this.oldVal,
        value: this.curVal
      }
      const updateObj = {
        updateObj: t.deepCopy(this.series),
        router: this.router + '/' + this.axis.axisType
      }
      this.updateCurrentProp(prop)
      this.updateChartItem(updateObj)
    },
    summit(val) {
      this.prop = val[0]
      this.curVal = val[1]
      this.oldVal = val[2]
    }
  }
}
</script>

<style>
</style>