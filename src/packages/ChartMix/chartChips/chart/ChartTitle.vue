<template>
  <!-- 主标题设置 -->
  <el-collapse-item name="1">
    <template slot="title">
      {{setItem.modalName}}
      <i class="iconfont icon-biaoti"></i>
    </template>

    <!-- 显示标题 -->
    <chart-base-switch :switchValue.sync="title.show">
      <div slot="title">{{setItem.show}}</div>
    </chart-base-switch>

    <!-- 标题内容 -->
    <chart-base-input :inputValue.sync="title.text" :placeholder="setItem.placeholder">
      <div slot="input">{{setItem.text}}</div>
    </chart-base-input>

    <!-- 字体样式 -->
    <chart-base-label :router="router + '/label'" :baseLabelOption.sync="title.label">
      <div slot="title">{{setItem.label}}</div>
    </chart-base-label>

    <!-- 标题位置 -->
    <chart-base-select :selectOption="positionData" :selectValue.sync="title.position.value">
      <div slot="select">{{setItem.position}}</div>
    </chart-base-select>

    <!-- 自定义位置 -->
    <el-row v-if="title.position.value === 'custom'">
      <!-- 左边距偏移量 -->
      <chart-base-slider
        :baseSliderOption.sync="title.position.offsetX"
        :unit="'%'"
        :content="setItem.offsetL"
      ></chart-base-slider>

      <!--  上边距偏移量 -->
      <chart-base-slider
        :baseSliderOption.sync="title.position.offsetY"
        :unit="'%'"
        :content="setItem.offsetT"
      ></chart-base-slider>
    </el-row>
  </el-collapse-item>
</template>

<script>
import * as t from "@/utils/importUtil";
import { positionOption } from "@/data/chartJson";
import transCN from "@/data/cn";
import transEN from "@/data/en";

export default {
  name: "ChartTitle",
  props: {
    router: String,
    chartAllType: String,
    titleOption: Object,
    lang: {
      type: String,
      default: "cn",
    },
  },
  components: {
    ...t.importComp(t),
  },
  mounted() {
    if (this.lang == "ch") {
      this.setItem = transCN["chartTitle"];
      return;
    }
    this.setItem = transEN["chartTitle"];
  },
  data: function () {
    return {
      title: "", //整个title设置,
      positionData: positionOption,
      isChange: false,
      setItem:{}
    };
  },
  watch: {
    titleOption: {
      handler: function (newVal, oldVal) {
        if (t.isEqual(this.title, newVal)) {
          return;
        }
        if (oldVal) {
          this.isChange = true;
        }
        this.title = t.deepCopy(newVal);
      },
      deep: true,
      immediate: true,
    },
    title: {
      handler: function (newVal, oldVal) {
        if (this.isChange) {
          this.isChange = !this.isChange;
          return;
        }
        // 改变值就重新渲染
        if (oldVal) {
          this.changeTitle();
        }
      },
      deep: true,
      immediate: true,
    },
    lang(val) {
      if (val == "ch") {
        this.setItem = transCN["chartTitle"];
        return;
      }
      this.setItem = transEN["chartTitle"];
    },
  },
  methods: {
    ...t.mapActions("chartSetting", ["updateChartItem"]),
    changeTitle() {
      const updateObj = {
        updateObj: t.deepCopy(this.title),
        router: this.router,
      };
      this.updateChartItem(updateObj);
    },
  },
};
</script>

<style></style>
