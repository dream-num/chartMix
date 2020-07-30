<template>
  <div>
    <!-- 需要el-row -->
    <el-row style="margin-top:15px;" v-if="!hideCol">
      <el-col :span="8" class="title"><slot name="input"></slot></el-col>
      <el-col :span="16">
        <el-input
          @change="changeInput"
          :placeholder="placeholder"
          size="mini"
          suffix-icon="el-icon-edit"
          v-model="input"
          :type="type?type:'text'"
        ></el-input>
      </el-col>
    </el-row>
    <!-- 不需要el-row -->
    <el-input v-else :type="type?type:'text'" @change="changeInput" :placeholder="placeholder" size="mini" v-model="input"></el-input>
  </div>
</template>
<script>
export default {
  name: 'chart-base-input',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    inputValue: '',
    hideCol: Boolean,
    type: String
  },
  data(){
    return {
      input: ''
    }
  },
  watch: {
    inputValue(val){
      this.input = val
    }
  },
  mounted() {
    this.input = this.inputValue ? this.inputValue : ''
  },
  methods: {
    changeInput(val){
      this.$emit('update:inputValue' , val)
    }
  }
};
</script>
<style>
</style>