<template>
    <el-row >
        <!-- 加粗 / 斜体 / 垂直-->
        <el-checkbox-group v-model="boxValue" @change="changeStyle" size="mini">
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
        }
    },
    data(){
        return {
            boxValue: ''
        }
    },
    watch: {
        boxData(val){
            this.boxValue = val
        }
    },
    mounted(){
        this.boxValue = this.boxData ? deepCopy(this.boxData) : []
    },
    methods: {
        changeStyle(val){
            this.$emit('update:boxData' , val)
        }
    }
}
</script>
<style>
    
</style>