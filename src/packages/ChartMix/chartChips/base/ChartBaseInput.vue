<template>
  <div>
    <!-- 需要el-row -->
    <el-row style="margin-top: 15px" v-if="!hideCol">
      <el-col :span="8" class="title"><slot name="input"></slot></el-col>
      <el-col :span="16">
        <el-input
          :placeholder="placeholder"
          size="mini"
          suffix-icon="el-icon-edit"
          v-model="input"
          :type="type ? type : 'text'"
        ></el-input>
      </el-col>
    </el-row>
    <!-- 不需要el-row -->
    <el-input
      v-else
      :type="type ? type : 'text'"
      :placeholder="placeholder"
      size="mini"
      v-model="input"
    ></el-input>
  </div>
</template>
<script>
export default {
  name: "chart-base-input",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    inputValue: "",
    hideCol: Boolean,
    type: String,
    prop: String,
  },
  data() {
    return {
      input: "",
      oldVal: "",
    };
  },
  watch: {
    inputValue(val, oldVal) {
      this.input = val;
    },
    input(val, oldVal) {
      this.$emit("summit", this.prop,val, oldVal);
      this.$emit("update:inputValue", val);
    },
  },
  mounted() {
    this.input = this.inputValue ? this.inputValue : "";
  },
};
</script>
<style>
</style>