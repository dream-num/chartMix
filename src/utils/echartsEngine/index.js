/**
    * echarts转换引擎
    */

import transformTitle from './transformTitle'
import transformLegend from './transformLegend'
import transformTooltip from './transformTooltip'
import transformAxis from './transformAxis'

const echartsEngine = function (chartOptions) {
    //TODO: chartOptions 转换后导出

    const chartAllTypeArray = chartOptions.chartAllType.split('|');
    const chartPro = chartAllTypeArray[0];
    const chartType = chartAllTypeArray[1];
    const chartStyle = chartAllTypeArray[2];

    const titleOption = transformTitle(chartAllTypeArray , chartOptions.defaultOption.title,chartOptions.defaultOption.subtitle)
    // const configOption = transformConfig(chartOptions.defaultOption.config);
    const legendOption = transformLegend(chartAllTypeArray , chartOptions.defaultOption.legend)
    const tooltipOption = transformTooltip(chartAllTypeArray , chartOptions.defaultOption.tooltip)
    const axisOption = transformAxis(chartAllTypeArray , chartOptions.defaultOption.axis)
    axisOption.xAxisDown.data = chartOptions.defaultOption.axis.xAxisDown.data

    const option = {
        title:{...titleOption},
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
        series: chartOptions.defaultOption.series ? chartOptions.defaultOption.series : [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
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