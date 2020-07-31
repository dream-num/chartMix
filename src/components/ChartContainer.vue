<template>
    <div id="chartContainer">
        <el-row id="create-btn">
            <!-- <el-button plain size="mini" @click="createChart">新建</el-button> -->
        </el-row>
        <div class="list" id="list">
            <VueDragResize v-for="(rect, index) in rects"
                           :key="index"
                           :w="rect.width"
                           :h="rect.height"
                           :x="rect.left"
                           :y="rect.top"
                           :parentW="listWidth"
                           :parentH="listHeight"
                           :axis="rect.axis"
                           :isActive="rect.active"
                           :minw="rect.minw"
                           :minh="rect.minh"
                           :isDraggable="rect.draggable"
                           :isResizable="rect.resizable"
                           :parentLimitation="rect.parentLim"
                           :snapToGrid="rect.snapToGrid"
                           :aspectRatio="rect.aspectRatio"
                           :z="rect.zIndex"
                           v-on:activated="activateEv(index)"
                           v-on:deactivated="deactivateEv(index)"
                           v-on:dragging="changePosition($event, index)"
                           v-on:resizing="changeSize($event, index)"
            >
                <ChartRender class="filler" :style="{backgroundColor:rect.color}" :id="rect.chart_id" :active="chartLists[index].active" :chart_id="rect.chart_id" :chartOptions="chartLists[index].chartOptions"></ChartRender>
            </VueDragResize>
        </div>

        <!-- setting panel -->
        <el-tabs v-model="activePanel" @tab-click="changePanel" class="settingPanel">
            <el-tab-pane label="ToolBar" name="ToolBar">
                <ToolBar ></ToolBar>
            </el-tab-pane>
            <el-tab-pane label="ChartSetting" name="ChartSetting" style="height: 500px;">
                <div class="chartsetting-container">
                    <ChartSetting :chartOptions="currentChartOptions" ></ChartSetting>
                </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="ChartList" name="ChartList">
                <div class="chartsetting-container">
                    <ChartSetting :chartOptions="currentChartOptions" ></ChartSetting>
                </div>
            </el-tab-pane> -->
        </el-tabs>
        
    </div>
</template>

<script>
    import { mapState , mapActions} from 'vuex'
    import VueDragResize from './VueDragResize';
    // import ChartRender from '../packages/ChartMix/ChartRender';
    import ToolBar from './ToolBar';
    // import ChartSetting from '../packages/ChartMix/ChartSetting'
    import ChartList from '../packages/ChartMix/ChartList'
    import '../assets/icons';
    import {deepCopy} from '@/utils/util'

    export default {
        name: 'ChartContainer',

        components: {
            VueDragResize,
            // ChartRender,
            ToolBar,
            // ChartSetting,
            ChartList
        },

        data(){
            return {
                listWidth: 0,
                listHeight: 0,
                activePanel:'ToolBar',
            }
        },

        mounted() {
            let listEl = document.getElementById('list');
            this.listWidth = listEl.clientWidth;
            this.listHeight = listEl.clientHeight;

            window.addEventListener('resize', ()=>{
                this.listWidth = listEl.clientWidth;
                this.listHeight = listEl.clientHeight;
            })
            
        },

        computed: {
            ...mapState('rect' , ['rects']),
            ...mapState('chartSetting' , ['chartLists' , 'currentChartIndex']),
            currentChartOptions() {
                return this.currentChartIndex === null ? null : deepCopy(this.chartLists[this.currentChartIndex].chartOptions);
            },
        },

        methods: {
            ...mapActions('rect' , ['setActive' , 'unsetActive' , 'setTop' , 'setLeft' , 'setWidth' , 'setHeight']),
            ...mapActions({
                'setActive_chart': 'chartSetting/setActive',
                'unsetActive_chart': 'chartSetting/unsetActive'
            }),
            activateEv(index) {
                this.setActive({id: index}),
                this.setActive_chart({id: index})
            },

            deactivateEv(index) {
                this.unsetActive({id: index})
                this.unsetActive_chart({id: index})
            },

            changePosition(newRect, index) {
                this.setTop({id: index, top: newRect.top})
                this.setLeft({id: index, left: newRect.left})
                this.setWidth({id: index, width: newRect.width})
                this.setHeight({id: index, height: newRect.height})
            },

            changeSize(newRect, index){
                this.changePosition(newRect, index)
            },

            // 创建新的图表
            createChart(){

            },
            changePanel(){
                // this.activeComponent = this.activeComponent === 'ToolBar' ? 'ChartSetting' : 'ToolBar';
            }
        }
    }
</script>


<style>   
    #create-btn{
        position: absolute;
        top: 5px;
        left: 29px;
    }
    .filler {
        width: 100%;
        height: 100%;
        display: inline-block;
        position: absolute;
    }

    .list {
        position: absolute;
        top: 35px;
        bottom: 30px;
        left: 30px;
        right: 400px;
        box-shadow: 0 0 2px #AAA;
        background-color: white;
    }
    :root {
        --toolbar-width: 300px;
    }
    .settingPanel {
        position: absolute;
        right: 0;
        top: 0;
        width: var(--toolbar-width);
        padding: 15px 15px 0 15px;
        box-shadow: 0 0 2px #aaa;
        box-sizing: border-box;
        background-color: white;
        margin: 30px 30px 30px 0;
    }
    .chartsetting-container {
        width: 100%;
        height: 100%;
    }
</style>