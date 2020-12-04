<template>
  <!-- 需要el-row样式 -->
  <el-row style="margin-top:15px;" v-if="!hideCol">
    <el-col :span="1" v-if="showIcon">
      <i class="el-icon-menu"></i>
    </el-col>
    <el-col :span="8" class="title">
      <slot name="select"></slot>
    </el-col>
    <el-col :span="15">
      <el-tooltip
        :disabled="!tooltip"
        :open-delay="500"
        :content="tooltip"
        effect="dark"
        placement="bottom"
      >
        <el-select size="mini" v-model="select">
          <el-option
            :key="i"
            :label="item.label"
            :value="item.value"
            v-for="(item,i) in selectOption"
          ></el-option>
        </el-select>
      </el-tooltip>
    </el-col>
  </el-row>
  <!-- 不需要el-row样式 -->
  <el-tooltip
    :disabled="!tooltip"
    :open-delay="500"
    :content="tooltip"
    effect="dark"
    placement="bottom"
    v-else
  >
    <el-select size="mini" v-model="select">
      <el-option :key="i" :label="item.label" :value="item.value" v-for="(item,i) in selectOption"></el-option>
    </el-select>
  </el-tooltip>
</template>
<script>
export default {
  props: {
    selectOption: Array,
    tooltip: String,
    selectValue: '',
    hideCol: Boolean,
    showIcon: Boolean,
    prop: String
  },
  data() {
    return {
      select: "",
    };
  },
  watch: {
    selectValue(val, oldVal) {
      this.select = val;
    },
    select(val, oldVal){
      this.$emit('summit', this.prop, val,oldVal)
      this.$emit("update:selectValue", val);
      this.$emit('show', val)
    }
  },
  mounted() {
    this.select = this.selectValue;
  },
};
</script>
<style>
</style>