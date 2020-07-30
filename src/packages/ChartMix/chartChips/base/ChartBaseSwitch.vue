<template>
  <el-row style="margin-top:15px;">
    <el-col :span="8" class="title"><slot name="title"></slot></el-col>
    <el-col :span="16">
      <el-switch
        @change="changeSwitch"
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
    }
  },
  data(){
    return {
      switchData: false
    }
  },
  watch:{
    switchValue(val){
      this.switchData = val
    }
  },
  mounted() {
    this.switchData = this.switchValue ? this.switchValue : false
  },
  methods: {
    changeSwitch(val) {
      this.$emit('update:switchValue', val);
    }
  }
};
</script>
<style>
</style>