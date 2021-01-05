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
    let prop = props ? props : store.state.chartSetting.prop
    prop = deepCopy(prop)

    if (prop.prop) {
        // 每次操作设置项添加该操作
        prop.chart_id = chartOptions.chart_id
        store.dispatch('chartSetting/addProp', prop)

        const chartAllTypeArray = chartOptions.chartAllType.split('|');
        const chartPro = chartAllTypeArray[0];
        const chartType = chartAllTypeArray[1];
        const chartStyle = chartAllTypeArray[2];

        let action = new Map([
            ['titlePlace', () => transformTitle(chartAllTypeArray, chartOptions.defaultOption.titlePlace, chartOptions.defaultOption.title, prop)],
            ['subtitlePlace', () => transformTitle(chartAllTypeArray, chartOptions.defaultOption.subtitlePlace, chartOptions.defaultOption.title, prop)],
            ['legendPlace', () => transformLegend(chartAllTypeArray, chartOptions.defaultOption.legendPlace, chartOptions.defaultOption.legend, prop)],
            ['cursorPlace', () => transformTooltip(chartAllTypeArray, chartOptions.defaultOption.tooltipPlace, chartOptions.defaultOption.tooltip, prop)],
            ['axis', () => {
                let axis
                let target = prop.prop.split(':')[0].split('-')[1]
                let axisPlace = chartOptions.defaultOption.axis[target]

                if (target == 'xAxisDown') {
                    axis = chartOptions.defaultOption.xAxis[0]
                } else if (target == 'xAxisUp') {
                    axis = chartOptions.defaultOption.xAxis[1]
                } else if (target == 'yAxisLeft') {
                    axis = chartOptions.defaultOption.yAxis[0]
                } else {
                    axis = chartOptions.defaultOption.yAxis[1]
                }

                transformAxis(chartAllTypeArray, axisPlace, axis, prop)
            }],
            ['commonSeries', () => transformCommonSeries(chartAllTypeArray, chartOptions.defaultOption.commonSeries, chartOptions.defaultOption.series, prop)],
            ['pieSeries', () => transformPie(chartAllTypeArray, chartOptions.defaultOption.pieSeries, chartOptions.defaultOption.series, prop)]
        ])

        let attr = prop.prop.split(':')[0]
        if (attr.includes('axis')) {
            attr = 'axis'
        }
        action.get(attr)()
    }

    return chartOptions.defaultOption;
}

export default echartsEngine