<template>
  <el-collapse-item name="3">
        <template slot="title">
      {{setItem.modalName}}
      <i class="iconfont icon-biaoti"></i>
    </template>

    <!-- 图例显示 -->
    <chart-base-switch :switchValue.sync="legend.show">
      <div slot="title">显示图例</div>
    </chart-base-switch>

    <div v-show="legend.show">
      <!-- 图例样式  -->
      <chart-base-label :router="router + '/label'" :baseLabelOption.sync="legend.label">
        <div slot="title">图例样式</div>
      </chart-base-label>

      <!-- 图例位置/朝向-->
      <chart-base-select :selectOption="positionOption" :selectValue.sync="legend.position.value">
        <div slot="select">图例位置</div>
      </chart-base-select>

      <!-- 自定义图例位置 -->
      <el-row v-if="legend.position.value === 'custom'">
        <!-- 水平偏移量 -->
        <chart-base-slider
          :baseSliderOption.sync="legend.position.offsetX"
          :unit="'%'"
          :content="'滑动修改水平偏移量'"
        ></chart-base-slider>

        <!-- 垂直偏移量 -->
        <chart-base-slider
          :baseSliderOption.sync="legend.position.offsetY"
          :unit="'%'"
          :content="'滑动修改垂直偏移量'"
        ></chart-base-slider>
      </el-row>

      <chart-base-select :selectOption="dirOptions" :selectValue.sync="legend.position.direction">
        <div slot="select">图例朝向</div>
      </chart-base-select>

      <!-- 图例大小 -->
      <chart-base-select :selectOption="sizeOption" :selectValue.sync="legend.width.value">
        <div slot="select">图例宽度</div>
      </chart-base-select>
      <chart-base-select :selectOption="sizeOption" :selectValue.sync="legend.height.value">
        <div slot="select">图例高度</div>
      </chart-base-select>

      <!-- 自定义图例大小 -->
      <chart-base-slider
        v-if="legend.width.value == 'custom'"
        :baseSliderOption.sync="legend.width.cusSize"
        :unit="'px'"
        :content="'滑动修改图例宽度'"
      ></chart-base-slider>
      <chart-base-slider
        v-if="legend.height.value == 'custom'"
        :baseSliderOption.sync="legend.height.cusSize"
        :unit="'px'"
        :content="'滑动修改图例高度'"
      ></chart-base-slider>

      <!-- 图例间距 -->
      <chart-base-select :selectOption="distanceOption" :selectValue.sync="legend.distance.value">
        <div slot="select">图例间距</div>
      </chart-base-select>

      <!-- 自定义图例间距 -->
      <chart-base-slider
        v-if="legend.distance.value == 'custom'"
        :baseSliderOption.sync="legend.distance.cusGap"
        :unit="'px'"
        :content="'滑动修改图例间距'"
      >
        <div slot="title">图例间距</div>
      </chart-base-slider>
    </div>
  </el-collapse-item>
</template>

<script>
import { positionOption, sizeOption, distanceOption } from "@/data/chartJson";
import * as t from "@/utils/importUtil";
import transCN from "@/data/cn";
import transEN from "@/data/en";

export default {
  props: {
    legendOption: Object,
    chartAllType: String,
    router: String,
    lang: {
      type: String,
      default: "cn",
    },
  },
  data() {
    return {
      legend: {}, //图例设置
      positionOption: t.deepCopy(positionOption),
      sizeOption: t.deepCopy(sizeOption),
      distanceOption: t.deepCopy(distanceOption),
      dirOptions: [
        { value: "horizontal", label: "水平" },
        { value: "vertical", label: "垂直" },
      ],
      setItem:{}
    };
  },
  components: {
    ...t.importComp(t),
  },
  mounted() {
    if (this.lang == "ch") {
      this.setItem = transCN["chartLegend"];
      return;
    }
    this.setItem = transEN["chartLegend"];
  },
  watch: {
    legendOption: {
      handler(newVal) {
        if (t.isEqual(this.legend, newVal)) {
          return;
        }
        this.legend = t.deepCopy(newVal);
      },
      immediate: true,
      deep: true,
    },
    legend: {
      handler: function (newVal, oldVal) {
        // 改变值就重新渲染
        if (oldVal) {
          this.changeLegend();
        }
      },
      deep: true,
      immediate: true,
    },
    lang(val) {
      if (val == "ch") {
        this.setItem = transCN["chartLegend"];
        return;
      }
      this.setItem = transEN["chartLegend"];
    },
  },
  methods: {
    ...t.mapActions("chartSetting", ["updateChartItem"]),
    changeLegend() {
      const updateObj = {
        updateObj: t.deepCopy(this.legend),
        router: this.router,
      };
      this.updateChartItem(updateObj);
    },
  },
};
</script>

<style>
</style>

