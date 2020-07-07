<template>
    <div>
        <!-- 文本样式 -->
        <el-row style="margin-top:15px;">
            <el-col :span="8" class="title"><slot name="title"></slot></el-col>
            <el-col :span="16">
                <chart-base-box :boxData.sync="baseLabelOptionData.fontGroup" :checkboxOption="fontStyleObj"></chart-base-box>

                <el-row style="margin-top:5px;">
                    <!-- 字体大小 -->
                    <el-col :span="12">
                        <chart-base-select :hideCol="true" :tooltip="'选择字体大小'" :selectOption="fontSizeList" :selectValue.sync="baseLabelOptionData.fontSize"></chart-base-select>
                    </el-col>

                    <!-- 颜色  -->
                    <el-col :span="8" :offset="2">
                        <el-color-picker size="mini" v-model="baseLabelOptionData.color" @change="changeStyle"></el-color-picker>
                    </el-col> 
                </el-row>
            </el-col>
        </el-row>
        <!-- 自定义字体大小 -->
        <chart-base-slider v-if="baseLabelOptionData.fontSize === 'custom'" :baseSliderOption.sync="baseLabelOptionData.cusFontSize" :unit="'px'" :content="'滑动修改字体大小'"></chart-base-slider>
    </div>
</template>
<script>
import * as t from '@/utils/importUtil'
import { fontSizeList, fontStyleIBV , fontStyleIB } from '@/data/chartJson'

export default {
    name: 'chart-base-label',
    props: {
        router: String,
        baseLabelOption: Object,
    },
    components: {
        'chart-base-slider': t.ChartBaseSlider,
        'chart-base-select': t.ChartBaseSelect,
        'chart-base-box': t.ChartBaseBox
    },
    data: function() {
        return {
            baseLabelOptionData: {}, //整个label设置
            fontSizeList: t.deepCopy(fontSizeList), //位置选择数组
            fontStyleObj: {}, //字体样式:数据=>DOM转换
        };
    },
    watch: {
       
        baseLabelOption: {
            handler: function(newVal) {
                if(t.isEqual(this.baseLabelOptionData,newVal)){
                    return;
                }
                this.baseLabelOptionData = t.deepCopy(newVal);//传过来的值需要深拷贝防止数据流向父组件传递
                
                //根据在不同的组件内渲染不同的结构
                if(this.router.includes('title')){ //在主标题/副标题组件内
                    this.fontStyleObj = t.deepCopy(fontStyleIBV);
                }else{ //鼠标提示组件内
                    this.fontStyleObj = t.deepCopy(fontStyleIB);
                }
                
            },
            immediate: true,
            deep: true
        },
        baseLabelOptionData: {
            handler: function(newVal , oldVal) {
                if(oldVal){
                    this.changeStyle()
                } 
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        ...t.mapActions('chartSetting' , ['updateChartItem']),
        changeStyle(){
            const updateObj = {
                updateObj: t.deepCopy(this.baseLabelOptionData),
                router:this.router,
            }
            this.updateChartItem( updateObj); 
        }
    },
};

</script>
<style>
</style>