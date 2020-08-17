let obj = {
    'chartSetting': {
        data: 'data',
        chartType: 'chartType',
        transpose: 'transpose(switch row/column)',
        row1: 'set number',
        row2: 'row as title',
        column1: 'set number',
        column2: 'column as title',
        style: 'style',
        echarts: {
            line: {
                default: 'Basic Line',
                smooth: 'Smoothed Line',
                label: 'Line With Label'
            },
            area: {
                default: 'Basic Area',
                stack: 'Stacked Area'
            },
            column: {
                default: 'Basic Column',
                stack: 'Stacked Column'
            },
            bar: {
                default: 'Basic Bar',
                stack: 'Stacked Bar'
            },
            pie: {
                default: 'Basic Pie',
                split: 'Split Pie',
                ring: 'Doughnut Pie'
            }
        }
    },
    'chartTitle': {
        modalName: 'Title Setting',
        show: 'show title',
        text: 'content',
        placeholder: 'enter the title',
        label: 'label style',
        position: 'position',
        offsetL: 'slide to change offsetLeft',
        offsetT: 'slide to change offsetTop'
    },
    'chartSubTitle': {
        modalName: 'SubTitle Setting',
        placeholder: 'enter the title',
        text: 'content',
        label: 'label style',
        gap: 'The gap between the main title and subtitle',
        content: 'silde to change gap'
    },
    'chartAxis': {
        modalName: 'XY-Axis Setting',
        select: 'select axis',
        text: 'title content',
        placeholder: 'enter title content',
        label: 'label style',
        align: 'text align',
        reverse: 'invert the axis',
        content: 'slide to change interval',
        intenval: 'interval for axis',
        content1: 'slide to change gap',
        gap: 'Gap between name and line',
        content2: 'slide to change rotate',
        title: 'Rotation of axis name',
        showLine: 'show axisLine',
        content3: 'slide to change lineWidth',
        lineWidth: 'lineWidth',
        lineColor: 'lineColor',
        showTick: 'showTick',
        position: 'tick position',
        content4: 'slide to change tickLength',
        tickLength: 'tickLength',
        content5: 'slide to change tickWidth',
        tickWidth: 'tickWidth',
        tickColor: 'tickColor',
        showLabel: 'show axisLabel',
        content6: 'slide to change rotate',
        rotate: 'Rotation of axisLabel',
        content7: 'enter minValue',
        min: 'minValue',
        content8: 'enter maxValue',
        max: 'maxValue',
        ratio: 'scale value',
        digit: 'decimal digits',
        content9: 'enter prefix',
        prefix: 'prefix',
        content10: 'enter suffix',
        suffix: 'suffix',
        showNet: 'show splitLine',
        content11: 'slide to change lineWidth',
        netWidth: 'splitLine line width',
        netType: 'splitLine type',
        netColor: 'splitLine color',
        netInterval: 'Interval of Axis splitLine',
        content12: 'slide to change interval',
        showArea: 'show splitArea',
        areaInterval: 'Interval of Axis splitArea',
        area1: 'areaOne',
        area2: 'areaTwo'
    },
    'chartLegend': {
        modalName: 'Legend Setting',
        show: 'show legend',
        label: 'label style',
        position: 'position',
        contentH: 'slide to change ox',
        contentV: 'slide to change oy',
        direction: 'direction',
        width: 'itenWidth',
        height: 'itemHeight',
        contentWidth: 'slide to change height',
        contentHeight: 'slide to change width',
        gap: 'The distance between each legend',
        contentGap: 'slide to change thes gap'
    },
    'chartCursor': {
        modalName: 'Tooltip Setting',
        show: 'show tooltip',
        label: 'label style',
        background: 'backgroundColor',
        trigger: 'Conditions to trigger',
        type: 'Type of triggering',
        lineType: 'line type',
        lineWidth: 'line width',
        color: 'line color',
        axisType: 'Indicator type',
        position: 'position',
        suffix: 'suffix of tooltip',
        placeholder: 'suffix',
        ratio: 'scale value',
        digit: 'decimal digits'
    }
}

export default obj