<template>
  <!-- 副标题设置 -->
  <el-collapse-item name="2">
    <template slot="title">
      {{ setItem.modalName }}&nbsp;&nbsp;&nbsp;&nbsp;
      <i class="iconfont icon-biaoti"></i>
    </template>

    <!-- 副标题内容 -->
    <chart-base-input
      :inputValue.sync="subTitle.text"
      :placeholder="setItem.placeholder"
      :prop="'text'"
      @summit="summit(arguments)"
    >
      <div slot="input">{{ setItem.text }}</div>
    </chart-base-input>

    <!-- 副标题样式 -->
    <chart-base-label
      :router="router + '/label'"
      :baseLabelOption="subTitle.label"
      :prop="'label'"
      @summit="summit(arguments)"
    >
      <div slot="title">{{ setItem.label }}</div>
    </chart-base-label>

    <!-- 主副标题间距 -->
    <chart-base-select
      :selectOption="distanceOption"
      :selectValue.sync="subTitle.distance.value"
      :prop="'distance.value'"
      @summit="summit(arguments)"
    >
      <div slot="select">{{ setItem.gap }}</div>
    </chart-base-select>

    <!-- 自定义间距 -->
    <chart-base-slider
      v-if="subTitle.distance.value === 'custom'"
      :baseSliderOption.sync="subTitle.distance.cusGap"
      :unit="'px'"
      :prop="'distance.cusGap'"
      @summit="summit(arguments)"
      :content="setItem.content"
    ></chart-base-slider>
  </el-collapse-item>
</template>

<script>
import * as t from "@/utils/importUtil";
import { distanceOption } from "@/data/chartJson";
import transCN from "@/data/cn";
import transEN from "@/data/en";

export default {
  name: "ChartSubTitle",
  props: {
    router: String,
    chartAllType: String,
    subTitleOption: Object,
    lang: {
      type: String,
      default: "zh",
    },
  },
  components: {
    ...t.importComp(t),
  },
  data: function () {
    return {
      subTitle: {}, //整个title设置
      distanceOption: t.deepCopy(distanceOption), //位置选择数组
      setItem: {},
      prop: null,
      oldVal: ''
    };
  },
  mounted() {
    if (this.lang == "zh") {
      this.setItem = transCN["chartSubTitle"];
      return;
    }
    this.setItem = transEN["chartSubTitle"];
  },
  watch: {
    subTitleOption: {
      handler: function (newVal) {
        if (t.isEqual(this.subTitle, newVal)) {
          return;
        }
        this.subTitle = t.deepCopy(newVal); //传过来的值需要深拷贝防止数据流向父组件传递
      },
      immediate: true,
      deep: true,
    },
    subTitle: {
      handler: function (newVal, oldVal) {
        // 改变值就重新渲染
        if (oldVal) {
          this.changeTitle();
        }
      },
      deep: true,
      immediate: true,
    },
    lang(val) {
      if (val == "zh") {
        this.setItem = transCN["chartSubTitle"];
        return;
      }
      this.setItem = transEN["chartSubTitle"];
    },
  },
  methods: {
    ...t.mapActions("chartSetting", ["updateChartItem",'updateCurrentProp']),
    changeTitle() {
      let update = t.deepCopy(this.subTitle);
      update.prop = {
        prop: "subtitle:" + this.prop,
        oldValue: this.oldVal,
      };
      const updateObj = {
        updateObj: update,
        router: this.router,
      };
      this.updateChartItem(updateObj);
      this.updateCurrentProp('subtitle')
    },
    summit(val) {
      this.prop = val[0];
      this.oldVal = val[1];
    },
  },
};
</script>