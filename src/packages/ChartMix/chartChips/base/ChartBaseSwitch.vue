<template>
  <el-row style="margin-top:15px;">
    <el-col :span="8" class="title"><slot name="title"></slot></el-col>
    <el-col :span="16">
      <el-switch
        active-color="#13ce66"
        inactive-color="#d8d8d8"
        v-model="switchData"
      ></el-switch>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "chart-base-switch",
  props: {
    switchValue: {
      type: Boolean,
      default: false
    },
    prop: String
  },
  data(){
    return {
      switchData: false,
    }
  },
  watch:{
    switchValue(val){
      this.switchData = val
    },
    switchData(val, oldVal){
      this.$emit('summit', this.prop, val,oldVal)
      this.$emit('update:switchValue', val);
    }
  },
  mounted() {
    this.switchData = this.switchValue ? this.switchValue : false
  }
};
</script>
<style>
</style>