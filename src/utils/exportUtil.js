import store from '../store'
import Vue from 'vue'
import { generateRandomKey, deepCopy, replaceHtml, getRowColCheck, getRangeSplitArray, getChartDataCache , getChartDataSeriesOrder , addDataToOption } from '../utils/util'
import { chartOptions } from '../data/chartJson'

function initChart(outDom) {
    let dom = document.createElement('div')
    dom.id = 'chartmix'
    outDom.appendChild(dom);

    new Vue({
        el: '#chartmix',
        store,
        computed: {
            chartOptions() {
                if (!store.state.chartSetting.currentChartIndex) {
                    return null
                }
                return store.state.chartSetting.chartLists[store.state.chartSetting.currentChartIndex].chartOptions
            }
        },
        template: `<ChartSetting :chartOptions="chartOptions"></ChartSetting>`
    })

}

// 创建图表,返回dom便于后续操作
function createChart(outDom, chartData) {

    let chart_id = generateRandomKey('chart')

    chartOptions.defaultOption.series = []

    // 随机生成图表
    let ratio = Math.random()*10
    if(ratio > 5){
        chartOptions.chartAllType = 'echarts|pie|default'
    }else{
        chartOptions.chartAllType = 'echarts|line|default'
    }

    // 生成图表数据机构
    let chartOption = insertNewChart(chartOptions , chart_id , chartOptions.chartAllType , chartData)

    let renderDom = document.createElement('div')
    renderDom.id = 'render' + chart_id

    let modelChartShowHTML =
        '<div id="${id}"class="jfgrid-modal-dialog jfgrid-modal-dialog-chart ${addclass}"tabindex="0"role="dialog"aria-labelledby=":41e"dir="ltr"><div class="jfgrid-modal-dialog-resize"><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-lt"data-type="lt"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-mt"data-type="mt"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-lm"data-type="lm"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-rm"data-type="rm"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-rt"data-type="rt"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-lb"data-type="lb"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-mb"data-type="mb"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-rb"data-type="rb"></div></div><div class="jfgrid-modal-dialog-controll"><span class="jfgrid-modal-controll-btn jfgrid-modal-controll-update"role="button"tabindex="0"aria-label="修改图表"title="修改图表"><i class="fa fa-pencil"aria-hidden="true"></i></span><span class="jfgrid-modal-controll-btn jfgrid-modal-controll-max"role="butjfgrid_chartIns_indexton"tabindex="0"aria-label="最大化"title="最大化"><i class="fa fa-window-maximize"aria-hidden="true"></i></span><span class="jfgrid-modal-controll-btn jfgrid-modal-controll-del"role="button"tabindex="0"aria-label="删除"title="删除"><i class="fa fa-trash"aria-hidden="true"></i></span></div><div class="jfgrid-modal-dialog-content">${content}</div></div>'

    let chart_id_c = chart_id + '_c'

    let $t = $(
        replaceHtml(modelChartShowHTML, {
            id: chart_id_c,
            addclass: 'jfgrid-data-visualization-chart',
            title: '图表生成',
            content: ''
        })
    ).appendTo($(outDom))

    $t.find('.jfgrid-modal-dialog-content').attr('id', chart_id)

    $('.jfgrid-modal-dialog-content').append(renderDom)

    store.state.chartSetting.currentChartIndex = store.state.chartSetting.chartLists.length
    store.state.chartSetting.chartLists.push({
        'chart_id': chart_id,
        'active': true,
        'chartOptions': deepCopy(chartOption)
    })

    console.dir(chartOption)

    new Vue({
        el: '#render' + chart_id,
        store,
        data() {
            return {
                chart_id
            }
        },
        computed: {
            options() {
                console.dir(this.chart_id)
                return store.state.chartSetting.chartLists.find(item => item.chart_id == this.chart_id).chartOptions
            },
            active() {
                return store.state.chartSetting.chartLists.find(item => item.chart_id == this.chart_id).active
            }
        },
        template: `<ChartRender :chartOptions="options" :chart_id="chart_id" :active="active"></ChartRneder>`
    })

    let render = document.getElementById(chart_id)
    let container = document.getElementById(chart_id + '_c')
    return {
        container,
        render
    }
}

// insertChart
function insertNewChart (
    chartOptions,
    chart_id,
    chartAllType,
    chartData,
    chartTheme,
    height,
    width,
    left,
    top
) {
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
    var defaultOptionIni = chartOptions.defaultOption
    //数据的sheet索引
    chart_json.chartData = chartData

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
function highlightChart(id){
    let index = store.state.chartSetting.chartLists.findIndex(item => item.chart_id == id)
    store.state.chartSetting.currentChartIndex = index
}


export {
    initChart,
    createChart,
    highlightChart
}