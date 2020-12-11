/**
    * echarts转换引擎
    */

import transformTitle from './transformTitle'
import transformLegend from './transformLegend'
import transformTooltip from './transformTooltip'
import transformAxis from './transformAxis'
import transformCommonSeries from './transformCommonSeries'
import transformPie from './transformPie'
import { deepCopy } from '@/utils/util'
import store from '../../store'

const echartsEngine = function (chartOptions, props) {
    //TODO: chartOptions 转换后导出

    const chartAllTypeArray = chartOptions.chartAllType.split('|');
    const chartPro = chartAllTypeArray[0];
    const chartType = chartAllTypeArray[1];
    const chartStyle = chartAllTypeArray[2];
    let prop = ''

    const titleOption = transformTitle(chartAllTypeArray , chartOptions.defaultOption.title,chartOptions.defaultOption.subtitle, props)
    // const configOption = transformConfig(chartOptions.defaultOption.config);
    const legendOption = transformLegend(chartAllTypeArray , chartOptions.defaultOption.legend)
    const tooltipOption = transformTooltip(chartAllTypeArray , chartOptions.defaultOption.tooltip)
    const axisOption = transformAxis(chartAllTypeArray , chartOptions.defaultOption.axis)
    // 系列设置
    let seriesOption
    // 普通图的系列
    if(chartType == 'line' || chartType == 'bar' || chartType == 'area' || chartType == 'column'){
        seriesOption = transformCommonSeries(chartAllTypeArray, chartOptions.defaultOption.commonSeries, chartOptions.defaultOption.series, props)
    }
    // 饼图系列
    if(chartType == 'pie'){
        seriesOption = transformPie(chartAllTypeArray, chartOptions.defaultOption.pieSeries, chartOptions.defaultOption.series)
    }

    axisOption.xAxisDown.data = chartOptions.defaultOption.axis.xAxisDown.data

    let action = new Map([
        ['title', prop = titleOption.prop],
        ['subtitle', prop = titleOption.prop],
        ['series', prop = seriesOption.prop]
    ])

    action.get(store.state.chartSetting.currentProp)

    const option = {
        title:{...titleOption.resultTitle},
        tooltip: {
            ...tooltipOption
        },
        legend: {
            ...legendOption
        },
        xAxis: [{
            ...axisOption.xAxisDown
        },{
            ...axisOption.xAxisUp
        }],
        yAxis: [
            axisOption.yAxisLeft,
            axisOption.yAxisRight
        ],
        series: seriesOption ? seriesOption.series : [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }],
        prop: {
            ...prop,
            chart_id: chartOptions.chart_id
        }
    };
    // 饼图去掉XY轴
    if(chartType == 'pie'){
        delete option.xAxis
        delete option.yAxis
    }

    console.dir(option)
    console.dir(JSON.stringify(option))
    return option;
}

export default echartsEngine