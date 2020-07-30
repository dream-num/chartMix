<template>
  <!-- 需要el-row样式 -->
  <el-row style="margin-top:15px;" v-if="!hideCol">
    <el-col :span="8" class="title"><slot name="select"></slot></el-col>
    <el-col :span="16">
      <el-tooltip :disabled="!tooltip" :open-delay="500" :content="tooltip" effect="dark" placement="bottom">
        <el-select @change="changeSelect" size="mini" v-model="select">
          <el-option :key="i" :label="item.label" :value="item.value" v-for="(item,i) in selectOption"></el-option>
        </el-select>
      </el-tooltip>
    </el-col>
  </el-row>
  <!-- 不需要el-row样式 -->
  <el-tooltip :disabled="!tooltip" :open-delay="500" :content="tooltip" effect="dark" placement="bottom" v-else>
    <el-select @change="changeSelect" size="mini" v-model="select">
      <el-option :key="i" :label="item.label" :value="item.value" v-for="(item,i) in selectOption"></el-option>
    </el-select>
  </el-tooltip>
</template>
<script>
export default {
    props: {
        selectOption: Array,
        tooltip: String,
        selectValue: [String , Number, Array],
        hideCol: Boolean
    },
    data(){
        return {
            select: '',
        }
    },
    watch:{
      selectValue(val){
        this.select = val
      }
    },
    mounted(){
        this.select = this.selectValue
    },
    methods: {
        changeSelect(val){
            this.$emit('update:selectValue' , val)
        }
    }
};
</script>
<style>
</style>