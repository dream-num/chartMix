import store from '../store'
import Vue from 'vue'
import { generateRandomKey, deepCopy, getRowColCheck, getRangeSplitArray, getChartDataCache, getChartDataSeriesOrder, addDataToOption } from '../utils/util'
import { changeChartRange , changeChartCellData , renderChart, updateChart, getDefaultJson, restoreChart } from '../utils/chartUtil'
import { chartOptions } from '../data/chartJson'
import echarts from 'echarts'
import $ from 'jquery'

const ChartSetting = store.state.chartSetting

// init chart
function initChart(outDom, lang) {
    let dom = document.createElement('div')
    dom.id = 'chartmix'
    outDom.appendChild(dom);

    new Vue({
        el: '#chartmix',
        store,
        data() {
            return {
                lang
            }
        },
        computed: {
            chartOptions() {
                if (!ChartSetting.currentChartIndex) {
                    return null
                }
                return ChartSetting.chartLists[ChartSetting.currentChartIndex].chartOptions
            }
        },
        template: `<ChartSetting :lang="lang" :chartOptions="chartOptions"></ChartSetting>`
    })

}

/**
 * 
 * @param {*} render 插入图表的容器
 * @param {*} chartData 框选的数据
 * @param {*} chart_id 图表ID
 * 返回容器/id/chart_json图表配置
 */
function createChart(render, chartData, chart_id, rangeArray, rangeTxt, chartTheme, height, width, left, top, chartAllType) {

    let chart_Id = chart_id ? chart_id : generateRandomKey('chart')
    render.id = chart_Id

    // 随机生成图表
    // let ratio = Math.random() * 10
    // if (ratio > 5) {
    //     chartOptions.chartAllType = 'echarts|pie|default'
    // } else {
        // chartOptions.chartAllType = 'echarts|line|default'

        chartAllType = chartAllType ? chartAllType : 'echarts|line|default'
    // }

    // 生成图表数据结构
    let chartOption = insertNewChart(chartOptions, chart_Id, chartAllType, chartData, rangeArray, rangeTxt, chartTheme, height, width, left, top)

    let renderDom = document.createElement('div')
    renderDom.id = 'render' + chart_Id
    render.appendChild(renderDom)

    let chart_json = {
        'chart_id': chart_Id,
        'active': true,
        'chartOptions': deepCopy(chartOption),
        'props': []
    }

    ChartSetting.currentChartIndex = ChartSetting.chartLists.length
    ChartSetting.chartLists.push(chart_json)

    new Vue({
        el: '#render' + chart_Id,
        store,
        data() {
            return {
                chart_Id
            }
        },
        computed: {
            options() {
                let chartJson = ChartSetting.chartLists.find(item => item.chart_id == this.chart_Id)
                if (chartJson) {
                    return chartJson.chartOptions
                } else {
                    return null
                }
            },
            active() {
                let chartJson = ChartSetting.chartLists.find(item => item.chart_id == this.chart_Id)
                if (chartJson) {
                    return chartJson.active
                } else {
                    return null
                }
            }
        },
        template: `<ChartRender :chartOptions="options" :chart_id="chart_Id" :active="active"></ChartRneder>`
    })

    return {
        render,
        chart_Id,
        chart_json
    }
}

// insert chart
function insertNewChart(
    chartOptions,
    chart_id,
    chartAllType,
    chartData,
    rangeArray,
    rangeTxt,
    chartTheme,
    height,
    width,
    left,
    top
) {
    // 插入图表时清空prop
    store.dispatch('chartSetting/updateRenderView', false)
    store.dispatch('chartSetting/updateCurrentProp', {})

    var chart_json = {}

    var chartAllTypeArray = chartAllType.split('|')

    var chartPro = chartAllTypeArray[0],
        chartType = chartAllTypeArray[1],
        chartStyle = chartAllTypeArray[2]

    chart_json.chart_id = chart_id
    chart_json.chartAllType = chartAllType
    chart_json.chartPro = chartPro
    chart_json.chartType = chartType
    chart_json.chartStyle = chartStyle

    chart_json.height = height
    chart_json.width = width
    chart_json.left = left
    chart_json.top = top

    //按照图表类型得到图表的默认设置
    var defaultOptionIni = Object.assign(chartOptions.defaultOption, getDefaultJson(chartPro, chartType, chartStyle))
    //数据的sheet索引
    chart_json.chartData = chartData
    chart_json.rangeArray = rangeArray
    chart_json.rangeTxt = rangeTxt

    //根据数据集得到按钮状态，rangeColCheck表示首列是否标题，rangeRowCheck表示首行是否标题，rangeConfigCheck表示是否转置。
    var rowColCheck = getRowColCheck(chartData)
    var rangeRowCheck = rowColCheck[0],
        rangeColCheck = rowColCheck[1],
        rangeConfigCheck = false

    chart_json.rangeColCheck = rangeColCheck
    chart_json.rangeRowCheck = rangeRowCheck
    chart_json.rangeConfigCheck = rangeConfigCheck

    //按照数据范围文字得到具体数据范围
    var rangeSplitArray = getRangeSplitArray(
        chartData,
        rangeArray,
        rangeColCheck,
        rangeRowCheck
    )
    chart_json.rangeSplitArray = rangeSplitArray

    //根据数据集、功能按钮状态、图表类型，得到图表可操作的数据格式，例如：{ "x":[], "y":[], series:[] }，可以按照次格式渲染数据页中的系列和轴控件。
    //数据为一行且为汉字的时候，chartDataCache的series为空数组
    var chartDataCache = getChartDataCache(
        chartData,
        rangeSplitArray,
        chartPro,
        chartType,
        chartStyle
    )
    chart_json.chartDataCache = chartDataCache

    //生成默认的系列顺序，默认根据series数组的位置，用户可以在界面上操作更改这个位置。
    var chartDataSeriesOrder = getChartDataSeriesOrder(
        chartDataCache.series[0].length
    )

    chart_json.chartDataSeriesOrder = chartDataSeriesOrder

    //设置图表皮肤
    chart_json.chartTheme = chartTheme

    //根据图表的默认设置、图表数据、图表系列顺序，等到一个完整的图表配置串。
    var defaultOption = addDataToOption(
        defaultOptionIni,
        chartDataCache,
        chartDataSeriesOrder,
        chartPro,
        chartType,
        chartStyle
    )

    //根据图表厂商选择渲染引擎，并根据设置渲染出图表
    chart_json.defaultOption = defaultOption
    return chart_json
}

// highlight current chart
function highlightChart(chart_id) {
    let index = ChartSetting.chartLists.findIndex(item => item.chart_id == chart_id)
    ChartSetting.currentChartIndex = index
    return ChartSetting.chartLists[ChartSetting.currentChartIndex].chartOptions
}

// resize chart
function resizeChart(chart_id) {
    let index = ChartSetting.chartLists.findIndex(item => item.chart_id == chart_id)
    var chartAllType = ChartSetting.chartLists[index].chartOptions.chartAllType;
    var chartAllTypeArray = chartAllType.split("|");
    var chartPro = chartAllTypeArray[0],
        chartType = chartAllTypeArray[1],
        chartStyle = chartAllTypeArray[2];

    if (chartPro == "echarts") {
        echarts.getInstanceById($("#" + chart_id).attr("_echarts_instance_")).resize();
    } 
}

function resizeChartAll(){
    for(let i = 0; i < ChartSetting.chartLists.length; i++){
        let chartJson = ChartSetting.chartLists[i].chartOptions
        if(chartJson.chartAllType.split('|')[0] == 'echarts'){
            echarts.getInstanceById($('#' + chartJson.chart_id).attr('_echarts_instance_')).resize()
        }
    }
}

// delete chart
function deleteChart(chart_id) {
    store.dispatch('chartSetting/updateRenderView', false)

    let index = ChartSetting.chartLists.findIndex(item => item.chart_id == chart_id)
    let chart = ChartSetting.chartLists.splice(index, 1)
    ChartSetting.currentChartIndex--
    if (ChartSetting.currentChartIndex < 0) {
        if (ChartSetting.chartLists[0]) {
            ChartSetting.currentChartIndex = 0
            return chart
        }
        ChartSetting.currentChartIndex = null
    }
    return chart
}

function getChartJson(chart_id){
    let index = ChartSetting.chartLists.findIndex(item => item.chart_id == chart_id)
    return  ChartSetting.chartLists[index].chartOptions;
}

function insertToStore(chart_json){
    ChartSetting.chartLists.push(chart_json)
}

export {
    initChart,
    createChart,
    highlightChart,
    deleteChart,
    resizeChart,
    resizeChartAll,
    changeChartRange,
    changeChartCellData,
    getChartJson,
    renderChart,
    insertToStore,
    updateChart,
    restoreChart
}