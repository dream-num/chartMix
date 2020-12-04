<template>
  <el-collapse-item name="9" title="饼图">
    <!-- 圆环选择 -->
    <chart-base-select
      :prop="'pieSelect'"
      @summit="summit"
      :selectOption="pie.pieSelection"
      :selectValue.sync="pie.pieSelect"
      v-show="chart_style == 'ringnest'"
    >
      <div slot="select">圆环选择</div>
    </chart-base-select>
    <div v-show="pie.pieSelect == 'inside' || chart_style != 'ringnest'">
      <!-- 饼图类型 -->
      <chart-base-select
        :prop="'pieType'"
        @summit="summit"
        :selectOption="pieTypeOption"
        :selectValue.sync="pie.pieType"
      >
        <div slot="select">饼图类型</div>
      </chart-base-select>
      <!-- 饼图半径 -->
      <el-row style="margin-top: 15px;">
        <el-col :span="6">饼图半径</el-col>
        <el-col :span="12">
          <el-select size="mini" v-model="radius">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item, i) in radiusOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <chart-base-slider
        v-if="radius == 'custom'"
        :baseSliderOption.sync="pie.cusradius"
        :unit="'%'"
        range
        :content="'滑动修改饼图半径'"
        :prop="'cusradius'"
        @summit="summit"
      ></chart-base-slider>
      <!-- 饼图位置 -->
      <chart-base-select
        :prop="'center'"
        @summit="summit"
        :selectOption="centerOption"
        :selectValue.sync="pie.center"
      >
        <div slot="select">饼图位置</div>
      </chart-base-select>

      <div v-show="pie.center == 'custom'">
        <chart-base-slider
          :baseSliderOption.sync="pie.cuscenter1"
          :unit="'%'"
          :content="'滑动修改饼图位置'"
          :prop="'cuscenter'"
          @summit="summit"
        ></chart-base-slider>
        <chart-base-slider
          :baseSliderOption.sync="pie.cuscenter2"
          :unit="'%'"
          :content="'滑动修改饼图位置'"
          :prop="'cuscenter'"
          @summit="summit"
        ></chart-base-slider>
      </div>
      <!-- 排列顺序 -->
      <chart-base-radio
        :radioValue.sync="pie.clockwise"
        :radioOption="clockwiseOption"
        :prop="'clockwise'"
        @summit="summit"
      >
        <div slot="title">排列顺序</div>
      </chart-base-radio>
      <!-- 饼图旋转 -->
      <chart-base-select
        :prop="'startAngle'"
        @summit="summit"
        :selectOption="startAngleOption"
        :selectValue.sync="pie.startAngle"
      >
        <div slot="select">饼图旋转</div>
      </chart-base-select>
      <chart-base-slider
        v-show="pie.startAngle == 'custom'"
        :baseSliderOption.sync="pie.cusAngle"
        :unit="'°'"
        :max="360"
        :content="'滑动修改旋转角度'"
        :prop="'cusradius'"
        @summit="summit"
      ></chart-base-slider>

      <!-- 显示数据标签 -->
      <chart-base-switch
        :switchValue.sync="pie.label.show"
        :prop="'label.show'"
        @summit="summit"
      >
        <div slot="title">显示数据标签</div>
      </chart-base-switch>

      <div v-show="pie.label.show">
        <!-- 标签显示格式 -->
        <chart-base-select
          :selectOption="formatterOption"
          :selectValue.sync="pie.label['format-format']"
          :prop="'label.format-format'"
          @summit="summit"
        >
          <div slot="select">标签显示格式</div>
        </chart-base-select>

        <!-- 小数位数 -->
        <chart-base-select
          :selectOption="digitOption"
          :prop="'label.format-digit'"
          @summit="summit"
          :selectValue.sync="pie.label['format-digit']"
        >
          <div slot="select">小数位数</div>
        </chart-base-select>
        <!-- 数值比例 -->
        <chart-base-select
          :prop="'label.format-ratio'"
          @summit="summit"
          :selectOption="ratioOption"
          :selectValue.sync="pie.label['format-ratio']"
        >
          <div slot="select">数值比例</div>
        </chart-base-select>

        <el-row style="margin-top: 15px">
          <el-col :span="6">
            <chart-base-select
              :hideCol="true"
              :selectOption="posOption"
              :prop="'label.position'"
              @summit="summit"
              :selectValue.sync="pie.label.position"
              :tooltip="'引导线文字位置'"
            ></chart-base-select>
          </el-col>
          <el-col :span="6">
            <chart-base-select
              :hideCol="true"
              :selectOption="fontSizeOption"
              :prop="'label.fontSize'"
              @summit="summit"
              :selectValue.sync="pie.label.fontSize"
              :tooltip="'引导线字体大小'"
            ></chart-base-select>
          </el-col>
        </el-row>
      </div>
      <div v-show="chart_pro == 'echarts' && pie.label.position == 'outside'">
        <!-- 视觉标签引导线 -->
        <chart-base-switch
          :switchValue.sync="pie.labelLine.show"
          :prop="'labelLine.show'"
          @summit="summit"
        >
          <div slot="title">标签视觉引导线</div>
        </chart-base-switch>

        <div v-show="pie.labelLine.show">
          <el-row style="margin-top: 15px">
            <el-col :span="12">
              <!-- 平滑程度 -->
              <chart-base-select
                :selectOption="smoothOption"
                :selectValue.sync="pie.labelLine.smooth"
                :prop="'labelLine.smooth'"
                @summit="summit"
              >
                <div slot="select">平滑程度</div>
              </chart-base-select>
            </el-col>
            <el-col :span="12">
              <!-- 线条样式 -->
              <chart-base-select
                :selectOption="lineStyleOption"
                :selectValue.sync="pie.labelLine.lineStyle.type"
                :prop="'labelLine.lineStyle.type'"
                @summit="summit"
              >
                <div slot="select">线条样式</div>
              </chart-base-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="12">
              <!-- 线条粗细 -->
              <chart-base-select
                :selectOption="lineWidthOption"
                :selectValue.sync="pie.labelLine.lineStyle.width"
                :prop="'labelLine.lineStyle.width'"
                @summit="summit"
              >
                <div slot="select">线条粗细</div>
              </chart-base-select>
            </el-col>
            <el-col :span="12">
              <!-- 引导线第一段长度 -->
              <chart-base-select
                :selectOption="lineLengthOption"
                :selectValue.sync="pie.labelLine.length"
                :prop="'labelLine.length'"
                @summit="summit"
              >
                <div slot="select">引导线第一段长度</div>
              </chart-base-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="12">
              <!-- 引导线第二段长度 -->
              <chart-base-select
                :selectOption="lineLengthOption"
                :selectValue.sync="pie.labelLine.length2"
                :prop="'labelLine.length2'"
                @summit="summit"
              >
                <div slot="select">引导线第二段长度</div>
              </chart-base-select>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 饼图切片 -->
       <el-row>
        <el-col :span="6">切片列表</el-col>
        <el-col :span="12">
          <el-select size="mini" v-model="section">
            <el-option
              :key="i"
              :label="item"
              :value="item"
              v-for="(item, i) in sectionOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    
      <!-- <chart-base-select
        :selectOption="sectionOption"
        :selectValue.sync="section"
        :prop="'section'"
        @summit="summit"
      >
        <div slot="select">饼图切片</div>
      </chart-base-select> -->

      <div v-show="section != '切片列表'">
        <!-- <el-row style="margin-top: 15px">
          <el-col :span="6" class="title">切片颜色</el-col>
          <el-col :span="3">
            <gradient-picker
              size="mini"
              v-model="series.seColor"
            ></gradient-picker>
          </el-col>
        </el-row> -->
        <!-- 显示数据标签 -->
        <chart-base-switch
          :switchValue.sync="pie.option[pie.currentIndex].label.show"
          :prop="'data.label.show'"
          @summit="summit"
        >
          <div slot="title">显示数据标签</div>
        </chart-base-switch>

        <div v-show="pie.option[pie.currentIndex].label.show">
          <el-row style="margin-top: 15px">
            <el-col :span="6">
              <chart-base-select
                :hideCol="true"
                :selectValue.sync="pie.option[pie.currentIndex].label.position"
                :selectOption="posOption"
                :prop="'data.label.position'"
                @summit="summit"
              ></chart-base-select>
            </el-col>

            <el-col :span="6">
              <chart-base-select
                :hideCol="true"
                :selectValue.sync="pie.option[pie.currentIndex].label.fontSize"
                :selectOption="fontSizeOption"
                :prop="'data.label.fontSize'"
                @summit="summit"
              ></chart-base-select>
            </el-col>
            <!-- <el-col :span="3">
              <gradient-picker
                :label="true"
                size="mini"
                v-model="series.fzColor"
              ></gradient-picker>
            </el-col> -->
          </el-row>
        </div>
        <!-- 标签视觉引导线 -->
        <chart-base-switch
          :switchValue.sync="pie.option[pie.currentIndex].labelLine.show"
          :prop="'data.labelLine.show'"
          @summit="summit"
        >
          <div slot="title">标签视觉引导线</div>
        </chart-base-switch>

        <div v-show="pie.option[pie.currentIndex].labelLine.show">
          <el-row style="margin-top: 15px">
            <el-col :span="12">
              <!-- 平滑程度 -->
              <chart-base-select
                :selectOption="smoothOption"
                :selectValue.sync="pie.option[pie.currentIndex].labelLine.smooth"
                :prop="'data.labelLine.smooth'"
                @summit="summit"
              >
                <div slot="select">平滑程度</div>
              </chart-base-select>
            </el-col>
            <el-col :span="12">
              <!-- 线条样式 -->
              <chart-base-select
                :selectOption="lineStyleOption"
                :selectValue.sync="pie.option[pie.currentIndex].labelLine.lineStyle.type"
                :prop="'data.labelLine.lineStyle.type'"
                @summit="summit"
              >
                <div slot="select">线条样式</div>
              </chart-base-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="12">
              <!-- 线条粗细 -->
              <chart-base-select
                :selectOption="lineWidthOption"
                :selectValue.sync="pie.option[pie.currentIndex].labelLine.lineStyle.width"
                :prop="'data.labelLine.lineStyle.width'"
                @summit="summit"
              >
                <div slot="select">线条粗细</div>
              </chart-base-select>
            </el-col>
            <el-col :span="12">
              <!-- 引导线第一段长度 -->
              <chart-base-select
                :selectOption="lineLengthOption"
                :selectValue.sync="pie.option[pie.currentIndex].labelLine.length"
                :prop="'data.labelLine.length'"
                @summit="summit"
              >
                <div slot="select">引导线第一段长度</div>
              </chart-base-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="12">
              <!-- 引导线第二段长度 -->
              <chart-base-select
                :selectOption="lineLengthOption"
                :selectValue.sync="pie.option[pie.currentIndex].labelLine.length2"
                :prop="'data.labelLine.length2'"
                @summit="summit"
              >
                <div slot="select">引导线第二段长度</div>
              </chart-base-select>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- <second-pie
      v-show="
        (pieSelect == 'outside' && chart_pro == 'echarts') ||
        (pieSelect == 'inside' && chart_pro == 'highcharts')
      "
    ></second-pie> -->
  </el-collapse-item>
</template>

<script>
import {
  lineStyleOption,
  ratioOption,
  digitOption,
  fontSizeOption,
} from "@/data/chartJson";
import * as t from "@/utils/importUtil";

export default {
  props: {
    chartAllType: String,
    pieOptionData: Object,
    router: String,
    lang: {
      type: String,
      default: "zh",
    },
  },
  data() {
    return {
      pie: {},
      series: {},
      radiusOption: [
        { value: "0%-75%", label: "默认" },
        { value: "0%-90%", label: "大圆" },
        { value: "0%-30%", label: "小圆" },
        { value: "30%-85%", label: "小圆环" },
        { value: "50%-85%", label: "大圆环" },
        { value: "custom", label: "自定义" },
      ],
      centerOption: [
        { value: "left-top", label: "左上" },
        { value: "left-center", label: "左中" },
        { value: "left-bottom", label: "左下" },
        { value: "right-top", label: "右上" },
        { value: "right-center", label: "右中" },
        { value: "right-bottom", label: "右下" },
        { value: "center-top", label: "中上" },
        { value: "center-center", label: "居中" },
        { value: "center-bottom", label: "中下" },
        { value: "custom", label: "自定义" },
      ],
      startAngleOption: [
        { value: 90, label: "90°" },
        { value: 0, label: "0°" },
        { value: 45, label: "45°" },
        { value: 135, label: "135°" },
        { value: 180, label: "180°" },
        { value: "custom", label: "自定义" },
      ],
      formatterOption: [
        { value: "{b}", label: "仅数据名" },
        { value: "{b}{c}", label: "数据名+数值" },
        { value: "{b}{c}{d}", label: "数据名+数值+百分比" },
      ],
      posOption: [
        { value: "outside", label: "外侧" },
        { value: "inside", label: "内部" },
        { value: "center", label: "中心" },
      ],
      smoothOption: [
        { value: 0, label: "默认" },
        { value: 0.5, label: "一般" },
        { value: 1, label: "平滑" },
      ],
      lineWidthOption: [
        { value: 1, label: "1px" },
        { value: 2, label: "2px" },
        { value: 3, label: "3px" },
        { value: 4, label: "4px" },
        { value: 5, label: "5px" },
        { value: 6, label: "6px" },
        { value: 7, label: "7px" },
        { value: 8, label: "8px" },
      ],
      lineLengthOption: [
        { value: 15, label: "默认" },
        { value: 5, label: "5px" },
        { value: 8, label: "8px" },
        { value: 10, label: "10px" },
        { value: 12, label: "12px" },
        { value: 18, label: "18px" },
        { value: 20, label: "20px" },
        { value: 25, label: "25px" },
        { value: "custom", label: "自定义" },
      ],
      clockwiseOption: [
        {
          label: true,
          text: "顺时针",
        },
        {
          label: false,
          text: "逆时针",
        },
      ],
    };
  },
  components: {
    ...t.importComp(t),
    // "second-pie": SecondPie,
  },
  watch: {
    pieOptionData: {
      handler(newVal, oldVal) {
        if (t.isEqual(this.pie, this.pieOptionData)) {
          return;
        }
        this.pie = t.deepCopy(this.pieOptionData);
        // 初始化给每个元素name
        if (!Reflect.has(this.pie.option[0], "name")) {
          let data = this.chartLists[this.currentChartIndex].chartOptions
            .defaultOption.legend.data;

          this.pie.option[0].name = "切片列表";

          // 初始化时动态赋值的变量
          for (let i = 0; i < data.length; i++) {
            let option = t.deepCopy(this.pie.option[0]);
            option.name = data[i].name;
            this.pie.option.push(option);
          }
        }

        this.lineStyleOption = t.deepCopy(lineStyleOption);
        this.ratioOption = t.deepCopy(ratioOption);
        this.digitOption = t.deepCopy(digitOption);
        this.fontSizeOption = t.deepCopy(fontSizeOption);
      },
      immediate: true,
      deep: true,
    },
    pie: {
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
    pieSelection() {
      if (this.chart_style == "ringnest") {
        var option = [];
        var arr = this.chartLists[this.currentChartIndex].chartOptions
          .defaultOption.legend.data;
        arr.length = 2;
        if (this.chart_pro == "echarts") {
          option.push({ value: "inside", label: arr[0] + "(内环)" });
          option.push({ value: "outside", label: arr[1] + "(外环)" });
        } else if (this.chart_pro == "highcharts") {
          option.push({ value: "inside", label: arr[1] + "(内环)" });
          option.push({ value: "outside", label: arr[0] + "(外环)" });
        }
        return option;
      }
    },
    sectionOption() {
      let arr = [];
      for (let i = 0; i < this.pie.option.length; i++) {
        arr.push(this.pie.option[i].name);
      }
      return arr;
    },
    section: {
      get() {
        return this.sectionOption[this.pie.currentIndex];
      },
      set(val) {
        this.pie.currentIndex = this.sectionOption.findIndex(
          (item) => item == val
        );
        this.series = this.pie.option[this.pie.currentIndex];
      },
    },
    pieType: {
      get() {
        let index = this.pieTypeOption.findIndex(
          (item) =>
            item.value ==
            this.chartLists[this.currentChartIndex].chartOptions.defaultOption
              .type
        );
        return this.pieTypeOption[index].value;
      },
      set(val) {
        this.chartLists[
          this.currentChartIndex
        ].chartOptions.defaultOption.type = val;
      },
    },
    pieTypeOption() {
      if (this.chart_pro == "echarts") {
        return [
          { value: false, label: "普通饼图" },
          { value: "radius", label: "南丁格尔图-半径" },
          { value: "area", label: "南丁格尔图-面积" },
        ];
      } else {
        return [
          { value: false, label: "普通饼图" },
          { value: "radius", label: "南丁格尔图" },
        ];
      }
    },
    radius: {
      get() {
        let radius = this.chartLists[this.currentChartIndex].chartOptions
          .defaultOption.series[0].radius;

        if (radius instanceof Array) {
          radius = `${radius[0]}-${radius[1]}`;
        }
        let rindex = this.radiusOption.findIndex(
          (item) => item.value == radius
        );
        if (rindex == -1) {
          rindex = 5;
        }
        return this.radiusOption[rindex].value;
      },
      set(val) {
        // this.chartLists[
        //   this.currentChartIndex
        // ].chartOptions.defaultOption.series[0].radius = val;
        let update = t.deepCopy(this.pie);
        update.prop = 'radius';
        update.radius = val
        const updateObj = {
          updateObj: update,
          router: this.router,
        };
        this.updateChartItem(updateObj);
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
  },
  methods: {
    ...t.mapActions("chartSetting", ["updateChartItem"]),
    changeSeries() {
      let update = t.deepCopy(this.pie);
      // 记录改变了哪个属性
      update.prop = this.prop;
      const updateObj = {
        updateObj: update,
        router: this.router,
      };
      this.updateChartItem(updateObj);
    },
    summit(val) {
      this.prop = val;
    },
  },
};
</script>

<style>
</style>