<template>
    <el-row >
        <el-col :span="6" v-if="showCol"><slot name="title"></slot></el-col>
        <el-checkbox-group v-model="boxValue" size="mini">
            <el-tooltip v-for="(value,name) in checkboxOption" :key="name" :open-delay="500" :content="value.des" effect="dark" placement="bottom">
                <el-checkbox-button :label="name"> {{value.text}} </el-checkbox-button>
            </el-tooltip>
        </el-checkbox-group>
    </el-row>
</template>
<script>
import { deepCopy } from '@/utils/util'
export default {
    props: {
        checkboxOption: [Object , Array],
        boxData: {
            type: Array,
            default: []
        },
        showCol: {
            type: Boolean,
            default: false
        },
        prop: String
    },
    data(){
        return {
            boxValue: '',
            oldVal: ''
        }
    },
    watch: {
        boxData(val, oldVal){
            this.boxValue = val
        },
        boxValue(val, oldVal){
           this.$emit('summit', this.prop, val,oldVal)
            this.$emit('update:boxData', val)
        }
    },
    mounted(){
        this.boxValue = this.boxData ? deepCopy(this.boxData) : []
    },
}
</script>
<style>
    
</style>