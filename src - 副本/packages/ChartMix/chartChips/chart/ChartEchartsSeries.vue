<template>
  <el-collapse-item name="9" title="系列">
    <!-- 系列设置 -->
    <el-row>
      <el-col :span="2">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="10">系列设置</el-col>
      <el-col :span="12">
        <el-select size="mini" v-model="seriesValue">
          <el-option
            :key="i"
            :label="item"
            :value="item"
            v-for="(item, i) in seriesOption"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 类型 -->
    <el-row>
      <el-col :span="6">类型</el-col>
      <el-col :span="12">
        <el-select size="mini" v-model="series.type" @change="exType">
          <el-option
            :key="i"
            :label="item.label"
            :value="item.value"
            v-for="(item, i) in typeOption"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <!-- 主次坐标 -->
    <chart-base-radio
      :radioValue.sync="series.yradio"
      :radioOption="radioOption"
      :prop="'yradio'"
      @summit="summit(arguments)"
    >
      <div slot="title">Y轴主次坐标</div>
    </chart-base-radio>
    <chart-base-radio
      :radioValue.sync="series.xradio"
      :radioOption="radioOption"
      :prop="'xradio'"
      @summit="summit(arguments)"
    >
      <div slot="title">X轴主次坐标</div>
    </chart-base-radio>

    <!-- 折线图设置 -->
    <div v-show="series.type == 'line'">
      <el-row style="margin-top: 15px">
        <el-col :span="3">线条</el-col>
        <!-- 线宽 -->
        <el-col :span="9">
          <chart-base-select
            :hideCol="true"
            :selectValue.sync="series.lineWidth"
            :selectOption="lineWidthOption"
            :prop="'lineWidth'"
            @summit="summit(arguments)"
          ></chart-base-select>
        </el-col>
        <!-- 线类型 -->
        <el-col :span="9">
          <chart-base-select
            :hideCol="true"
            :selectValue.sync="series.lineType"
            :selectOption="lineStyleOption"
            :prop="'lineType'"
            @summit="summit(arguments)"
          ></chart-base-select>
        </el-col>
        <el-col :span="3">
          <el-color-picker
            size="mini"
            v-model="series.lineColor"
          ></el-color-picker>
        </el-col>
      </el-row>
      <!-- 线样式 -->
      <chart-base-box
        :boxData.sync="series.lineStyle"
        :checkboxOption="lineTypeOption"
        :showCol="true"
        :prop="'lineStyle'"
        @summit="summit(arguments)"
      >
        <div slot="title">线条样式</div>
      </chart-base-box>

      <!-- 线宽 -->
      <chart-base-slider
        v-if="series.lineWidth == 'custom'"
        :baseSliderOption.sync="series.cuslineWidth"
        :unit="'px'"
        :content="'滑动修改线宽'"
        :prop="'cuslineWidth'"
        @summit="summit(arguments)"
      ></chart-base-slider>

      <!-- 显示数据点 -->
      <chart-base-switch
        :switchValue.sync="series.showSymbol"
        :prop="'showSymbol'"
        @summit="summit(arguments)"
      >
        <div slot="title">数据点</div>
      </chart-base-switch>

      <!-- 数据点样式 -->
      <el-row style="margin-top: 15px">
        <el-col :span="4">数据点样式</el-col>
        <el-col :span="8">
          <chart-base-select
            :selectValue.sync="series.symbolSize"
            :prop="'symbolSize'"
            @summit="summit(arguments)"
            :selectOption="symbolSizeOption"
          ></chart-base-select>
        </el-col>
        <el-col :span="8">
          <chart-base-select
            :selectValue.sync="series.symbol"
            :prop="'symbol'"
            @summit="summit(arguments)"
            :selectOption="symbolOption"
          ></chart-base-select>
        </el-col>
        <el-col :span="3">
          <el-color-picker
            size="mini"
            v-model="series.itemColor"
          ></el-color-picker>
        </el-col>
      </el-row>
      <!-- 数据点大小 -->
      <chart-base-slider
        v-if="series.symbolSize == 'custom'"
        :baseSliderOption.sync="series.cusSymbolSize"
        :unit="'px'"
        :prop="'cusSymbolSize'"
        @summit="summit(arguments)"
        :content="'滑动修改数据点大小'"
      ></chart-base-slider>
    </div>
    <!-- 柱状图设置 -->
    <div v-show="series.type == 'bar'">
      <el-row style="margin-top: 15px">
        <el-col :span="6">柱状图颜色</el-col>
        <el-col :span="3">
          <el-color-picker
            size="mini"
            v-model="series.barColor"
          ></el-color-picker>
        </el-col>
      </el-row>
      <!-- 柱状宽度 -->
      <chart-base-select
        :prop="'barWidth'"
        @summit="summit(arguments)"
        :selectOption="barWidthOption"
        :selectValue.sync="series.barWidth"
      >
        <div slot="select">柱状宽度</div>
      </chart-base-select>

      <chart-base-slider
        v-if="series.barWidth == 'custom'"
        :baseSliderOption.sync="series.cusbarWidth"
        :unit="'px'"
        :prop="'cusbarWidth'"
        @summit="summit(arguments)"
        :content="'滑动修改柱子宽度'"
      ></chart-base-slider>

      <!-- 柱条最小高度 -->
      <chart-base-select
        :selectOption="barMinHeightOption"
        :prop="'barMinHeight'"
        @summit="summit(arguments)"
        :selectValue.sync="series.barMinHeight"
      >
        <div slot="select">柱条最小高度</div>
      </chart-base-select>
      <chart-base-slider
        v-if="series.barMinHeight == 'custom'"
        :baseSliderOption.sync="series.cusbarMinHeight"
        :unit="'px'"
        :prop="'cusbarMinHeight'"
        @summit="summit(arguments)"
        :content="'滑动修改柱条最小高度'"
      ></chart-base-slider>
      <!-- 不同系列的柱间距离 -->
      <chart-base-select
        :selectOption="barGapOption"
        :selectValue.sync="series.barGap"
        :prop="'barGap'"
        @summit="summit(arguments)"
        v-show="!chart_style.includes('stack')"
      >
        <div slot="select">不同系列的柱间距离</div>
      </chart-base-select>

      <chart-base-slider
        v-if="series.barGap == 'custom'"
        :baseSliderOption.sync="series.cusbarGap"
        :unit="'%'"
        :min="-100"
        :prop="'cusbarGap'"
        @summit="summit(arguments)"
        :content="'滑动修改不同系列的柱间距离'"
      ></chart-base-slider>
      <!-- 相同系列的柱间距离 -->
      <chart-base-select
        :selectOption="barCategoryGapOption"
        :selectValue.sync="series.barCategoryGap"
        :prop="'barCategoryGap'"
        @summit="summit(arguments)"
        v-show="!chart_style.includes('stack')"
      >
        <div slot="select">相同系列的柱间距离</div>
      </chart-base-select>

      <chart-base-slider
        v-if="series.barCategoryGap == 'custom'"
        :baseSliderOption.sync="series.cusbarCategoryGap"
        :unit="'%'"
        :min="-100"
        :prop="'cusbarCategoryGap'"
        @summit="summit(arguments)"
        :content="'滑动修改相同系列的柱间距离'"
      ></chart-base-slider>
    </div>
    <!-- 数据标签 -->
    <chart-base-switch
      :switchValue.sync="series.showLabel"
      :prop="'showLabel'"
      @summit="summit(arguments)"
    >
      <div slot="title">显示数据标签</div>
    </chart-base-switch>

    <div v-show="series.showLabel">
      <!-- 标签显示格式 -->
      <chart-base-select
        :selectOption="formatterOption"
        :selectValue.sync="series['format-format']"
        :prop="'format-format'"
        @summit="summit(arguments)"
      >
        <div slot="select">标签显示格式</div>
      </chart-base-select>
      <!-- 小数位数 -->
      <chart-base-select
        :selectOption="digitOption"
        :prop="'format-digit'"
        @summit="summit(arguments)"
        :selectValue.sync="series['format-digit']"
      >
        <div slot="select">小数位数</div>
      </chart-base-select>
      <!-- 数值比例 -->
      <chart-base-select
        :prop="'format-ratio'"
        @summit="summit(arguments)"
        :selectOption="ratioOption"
        :selectValue.sync="series['format-ratio']"
      >
        <div slot="select">数值比例</div>
      </chart-base-select>
      <!-- 标签前缀 -->
      <chart-base-input
        :type="'text'"
        :prop="'format-prefix'"
        @summit="summit(arguments)"
        :inputValue.sync="series['format-prefix']"
        :placeholder="'标签前缀'"
      >
        <div slot="input">标签前缀</div>
      </chart-base-input>
      <!-- 标签后缀 -->
      <chart-base-input
        :type="'text'"
        :prop="'format-suffix'"
        @summit="summit(arguments)"
        :inputValue.sync="series['format-suffix']"
        :placeholder="'标签后缀'"
      >
        <div slot="input">标签后缀</div>
      </chart-base-input>

      <el-row style="margin-top: 15px">
        <!-- 标签位置 -->
        <el-col :span="7">
          <chart-base-select
            :hideCol="true"
            :selectOption="textPosOption"
            :prop="'textPos'"
            @summit="summit(arguments)"
            :selectValue.sync="series.textPos"
            :tooltip="'标签位置'"
          ></chart-base-select>
        </el-col>
        <!-- 字体样式 -->
        <el-col :span="7">
          <el-checkbox-group
            size="mini"
            v-model="series.fontPlace"
            :prop="'fontPlace'"
            @summit="summit(arguments)"
          >
            <el-checkbox-button label="bold">B</el-checkbox-button>
            <el-checkbox-button label="italic" style="fontstyle: italic"
              >I</el-checkbox-button
            >
          </el-checkbox-group>
        </el-col>
        <!-- 字体大小 -->
        <el-col :span="7">
          <chart-base-select
            :hideCol="true"
            :prop="'fontSize'"
            @summit="summit(arguments)"
            :selectOption="fontSizeOption"
            :selectValue.sync="series.fontSize"
            :tooltip="'字体大小'"
          ></chart-base-select>
        </el-col>
        <el-col :span="3">
          <el-color-picker
            :label="true"
            size="mini"
            v-model="series.fzColor"
          ></el-color-picker>
        </el-col>
      </el-row>
      <!-- 自定义位置 -->
      <div v-show="series.textPos == 'custom'">
        <chart-base-slider
          :baseSliderOption.sync="series.offsetX"
          :unit="'%'"
          :content="'滑动修改水平距离'"
          :max="500"
          :min="-200"
          :prop="'offsetX'"
          @summit="summit(arguments)"
        ></chart-base-slider>
        <chart-base-slider
          :baseSliderOption.sync="series.offsetY"
          :unit="'%'"
          :content="'滑动修改垂直距离'"
          :max="200"
          :min="-200"
          :prop="'offsetY'"
          @summit="summit(arguments)"
        ></chart-base-slider>
      </div>
      <!-- 自定义文字大小 -->
      <chart-base-slider
        v-if="series.fontSize == 'custom'"
        :baseSliderOption.sync="series.customSize"
        :prop="'customSize'"
        @summit="summit(arguments)"
        :unit="'px'"
        :content="'滑动修改字体大小'"
      ></chart-base-slider>
    </div>
    <!-- 堆叠图 -->
    <div>
      <!-- 显示堆叠图 -->
      <chart-base-switch
        :switchValue.sync="series.showStack"
        :prop="'showStack'"
        @summit="summit(arguments)"
      >
        <div slot="title">设置为堆叠图</div>
      </chart-base-switch>

      <div v-show="series.showStack">
        <!-- 堆叠名称 -->
        <chart-base-input
          :type="'text'"
          :inputValue.sync="series.stackValue"
          :placeholder="'堆叠名称'"
          :prop="'stackValue'"
          @summit="summit(arguments)"
        >
          <div slot="input">堆叠名称</div>
        </chart-base-input>
        <!-- 类目间柱形距离 -->
        <chart-base-select
          v-show="series.type == 'bar'"
          :selectOption="barCategoryGapOption"
          :selectValue.sync="series.barCategoryGap"
          :prop="'barCategoryGap'"
          @summit="summit(arguments)"
        >
          <div slot="select">类目间柱形距离</div>
        </chart-base-select>
        <!-- 自定义类目间柱形距离 -->
        <chart-base-slider
          v-if="series.barCategoryGap == 'custom'"
          :baseSliderOption.sync="series.cusbarCategoryGap"
          :unit="'%'"
          :min="-100"
          :prop="'cusbarCategoryGap'"
          @summit="summit(arguments)"
          :content="'滑动修改类目间柱形距离'"
        ></chart-base-slider>
      </div>
    </div>
    <div v-show="series.ype == 'line'">
      <!-- 设置为面积图 -->
      <chart-base-switch :switchValue.sync="show">
        <div slot="title">设置为面积图</div>
      </chart-base-switch>

      <el-row style="margin-top: 15px" v-show="show">
        <el-col :span="6" class="title">面积图覆盖颜色</el-col>
        <el-col :span="18">
          <el-color-picker
            size="mini"
            v-model="series.areaColor"
          ></el-color-picker>
        </el-col>
      </el-row>
    </div>
  </el-collapse-item>
</template>

<script>
import * as t from "@/utils/importUtil";
import {
  lineStyleOption,
  symbolSizeOption,
  symbolOption,
  ratioOption,
  digitOption,
  fontSizeOption,
} from "@/data/chartJson";

export default {
  props: {
    chartAllType: String,
    seriesOptionData: Object,
    router: String,
    lang: {
      type: String,
      default: "zh",
    },
  },
  data() {
    return {
      seriesData: {},
      radioOption: [
        {
          label: 0,
          text: "主坐标轴",
        },
        {
          label: 1,
          text: "次坐标轴",
        },
      ],
      lineTypeOption: {
        step: {
          text: "阶梯",
          des: "阶梯",
        },
        smooth: {
          text: "平滑",
          des: "平滑",
        },
      },
      series: {},
      prop: null,
      lineWidthOption: [
        { value: 1, label: "1px" },
        { value: 2, label: "2px" },
        { value: 3, label: "3px" },
        { value: 4, label: "4px" },
        { value: 5, label: "5px" },
        { value: 6, label: "6px" },
        { value: 7, label: "7px" },
        { value: 8, label: "8px" },
        { value: "custom", label: "自定义" },
      ],
      lineStyleOption: "",
      symbolSizeOption: "",
      symbolOption: "",
      barWidthOption: [
        { value: null, label: "自适应" },
        { value: 10, label: "窄" },
        { value: 30, label: "一般" },
        { value: 50, label: "宽" },
        { value: "custom", label: "自定义" },
      ],
      barMinHeightOption: [
        { value: 0, label: "默认" },
        { value: 5, label: "矮" },
        { value: 10, label: "一般" },
        { value: 30, label: "高" },
        { value: "custom", label: "自定义" },
      ],
      barGapOption: [
        { value: "30%", label: "默认" },
        { value: "50%", label: "远" },
        { value: "40%", label: "一般" },
        { value: "20%", label: "近" },
        { value: "0%", label: "重叠" },
        { value: "-10%", label: "交错" },
        { value: "custom", label: "自定义" },
      ],
      ratioOption: "",
      digitOption: "",
      textPosOption: [
        { value: "top", label: "顶端" },
        { value: "left", label: "左侧" },
        { value: "right", label: "右侧" },
        { value: "bottom", label: "底部" },
        { value: "inside", label: "内部居中" },
        { value: "insideLeft", label: "内部左侧" },
        { value: "insideRight", label: "内部右侧" },
        { value: "insideTop", label: "内部顶端" },
        { value: "insideBottom", label: "内部底部" },
        { value: "insideTopLeft", label: "内部左上" },
        { value: "insideBottomLeft", label: "内部左下" },
        { value: "insideTopRight", label: "内部右上" },
        { value: "insideBottomRight", label: "内部右下" },
        { value: "custom", label: "自定义" },
      ],
      fontSizeOption: "",
      alignOption: [
        { value: "left", label: "左对齐" },
        { value: "center", label: "居中对齐" },
        { value: "right", label: "右对齐" },
      ],
      verticalAlignOption: [
        { value: "top", label: "底部对齐" },
        { value: "middle", label: "居中对齐" },
        { value: "bottom", label: "顶部对齐" },
        { value: "custom", label: "自定义" },
      ],
      barCategoryGapOption: [
        { value: "20%", label: "默认" },
        { value: "40%", label: "远" },
        { value: "30%", label: "一般" },
        { value: "10%", label: "近" },
        { value: "custom", label: "自定义" },
      ],
      radiusOption: [
        { value: 0, label: "默认无" },
        { value: "custom", label: "自定义" },
      ],
    };
  },
  components: {
    ...t.importComp(t),
  },
  watch: {
    seriesOptionData: {
      handler(newVal, oldVal) {
        if (t.isEqual(this.seriesData, this.seriesOptionData)) {
          return;
        }
        this.seriesData = t.deepCopy(this.seriesOptionData);
        // 初始化给每个元素name
        if (!Reflect.has(this.seriesData.option[0], "name")) {
          let data = this.chartLists[this.currentChartIndex].chartOptions
            .defaultOption.legend.data;

          this.seriesData.option[0].name = "通用设置";
          let type = this.chartLists[this.currentChartIndex].chartOptions
            .defaultOption.type;
          if (type == "area") {
            type = "line";
          } else if (type == "column") {
            type = "bar";
          }
          this.seriesData.option[0].type = type;
          // 初始化时动态赋值的变量
          for (let i = 0; i < data.length; i++) {
            let option = t.deepCopy(this.seriesData.option[0]);
            option.name = data[i];
            this.seriesData.option.push(option);
          }
        }

        this.series = this.seriesData.option[this.seriesData.currentIndex];
        this.lineStyleOption = t.deepCopy(lineStyleOption);
        this.symbolSizeOption = t.deepCopy(symbolSizeOption);
        this.symbolOption = t.deepCopy(symbolOption);
        this.ratioOption = t.deepCopy(ratioOption);
        this.digitOption = t.deepCopy(digitOption);
        this.fontSizeOption = t.deepCopy(fontSizeOption);
      },
      immediate: true,
      deep: true,
    },
    series: {
      handler: function (newVal, oldVal) {
        // 改变值就重新渲染
        if (oldVal) {
          this.changeSeries();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...t.mapState("chartSetting", ["chartLists", "currentChartIndex"]),
    seriesOption() {
      let arr = [];
      if (this.seriesData.option) {
        for (let i = 0; i < this.seriesData.option.length; i++) {
          arr[i] = this.seriesData.option[i].name;
        }
      }
      return arr;
    },
    seriesValue: {
      get() {
        return this.seriesOption[this.seriesData.currentIndex];
      },
      set(val) {
        this.seriesData.currentIndex = this.seriesOption.findIndex(
          (item) => item == val
        );
        this.series = this.seriesData.option[this.seriesData.currentIndex];
      },
    },
    chart_pro: function () {
      return this.chartAllType.split("|")[0];
    },
    chart_type() {
      return this.chartAllType.split("|")[1];
    },
    chart_style() {
      return this.chartAllType.split("|")[2];
    },
    typeOption() {
      return [
        { value: "bar", label: "柱状图" },
        { value: "line", label: "折线图" },
      ];
    },
    formatterOption() {
      return [
        { value: "{c}", label: "仅数据" },
        { value: "{bc}", label: "系列名+数据" },
      ];
    },

    // 是否显示面积图,选图是面积图时默认显示
    show: {
      get() {
        let flag = this.chartLists[this.currentChartIndex].chartOptions
          .defaultOption.area;
        return flag;
      },
      set(val) {
        this.chartLists[
          this.currentChartIndex
        ].chartOptions.defaultOption.area = val;
      },
    },
  },
  methods: {
    ...t.mapActions("chartSetting", ["updateChartItem",'updateCurrentProp']),
    changeSeries() {
      let update = t.deepCopy(this.seriesData);
      // 记录改变了哪个属性
      update.prop = {
        prop: 'commonSeries:' + this.prop,
        oldValue: this.oldVal,
        index: this.seriesData.currentIndex
      }

      const updateObj = {
        updateObj: update,
        router: this.router,
      };
      this.updateChartItem(updateObj);
      this.updateCurrentProp('comminSeries')
    },
    exType(){
      this.prop = 'type'
      this.changeSeries()
    },
    summit(val) {
      this.prop = val[0];
      this.oldVal = val[1]
    },
  },
};
</script>

<style>
</style>
