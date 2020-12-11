<template>
  <el-row style="margin-top: 15px">
    <el-col :span="8"><slot name="title"></slot></el-col>
    <el-col :span="16">
      <el-radio-group size="mini" v-model="radio">
        <el-radio-button
          v-for="(item, i) in radioOption"
          :label="item.label"
          :key="i"
          >{{ item.text }}</el-radio-button
        >
      </el-radio-group>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    radioOption: Array,
    radioValue: [Array, Boolean, String, Number],
    prop: String,
  },
  data() {
    return {
      radio: "",
      oldVal: "",
    };
  },
  watch: {
    radioValue(val, oldVal) {
      this.radio = val;
    },
    radio(val, oldVal){
      this.$emit("summit", this.prop, oldVal);
      this.$emit("update:radioValue", val);
    }
  },
  mounted() {
    this.radio = this.radioValue;
  },
};
</script>
<style>
</style>