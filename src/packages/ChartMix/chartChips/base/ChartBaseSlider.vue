<template>
  <div>
    <el-row style="margin-top: 15px;" class="chart-base-slider" v-if="!hideCol">
      <el-col :span="22">
        <el-tooltip :open-delay="500" :content="content" placement="top">
          <el-slider
            :show-input-controls="false"
            :min="min"
            :max="max"
            input-size="mini"
            show-input
            style="padding-left: 12px;"
            v-model="baseSliderData"
            @change="handlerChange"
            :format-tooltip="format?formatter:null"
          ></el-slider>
        </el-tooltip>
      </el-col>
      <el-col :span="1" class="input_content">{{unit}}</el-col>
    </el-row>
    <el-row style="margin-top: 15px;" class="chart-base-slider" v-else>
      <el-col :span="6"><slot name="title"></slot></el-col>
      <el-col :span="17">
        <el-tooltip :open-delay="500" :content="content" placement="top">
          <el-slider
            :show-input-controls="false"
            :min="min"
            :max="max"
            input-size="mini"
            show-input
            style="padding-left: 12px;"
            v-model="baseSliderData"
            @change="handlerChange"
            :format-tooltip="format?formatter:null"
          ></el-slider>
        </el-tooltip>
      </el-col>
      <el-col :span="1" class="input_content">{{unit}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "chart-base-slider",
  props: {
    baseSliderOption: Number,
    unit: String, // % or px
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    content: {
      type: String,
      default: "滑动修改值大小"
    },
    hideCol: false,
    format: [Function , String]
  },
  data() {
    return {
      baseSliderData: 12
    };
  },
  watch:{
    baseSliderOption(val){
      this.baseSliderData = val
    }
  },
  mounted() {
    this.baseSliderData = this.baseSliderOption;
  },
  methods: {
    handlerChange(value) {
      this.$emit("update:baseSliderOption", value);
    },
    formatter(val){
      // eval(this.format)
      return null
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chart-base-slider .el-slider__runway.show-input {
  margin-right: 72px;
}
.chart-base-slider .el-slider__input.el-input-number--mini {
  width: 56px;
}
.chart-base-slider .input_content {
  margin: 6px 0 0 5px;
}
</style>
