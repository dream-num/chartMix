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
        modalName: 'Title Setting'
    },
    'chartSubTitle': {
        modalName: 'SubTitle Setting'
    },
    'chartAxis': {
        modalName: 'XY-Axis Setting'
    },
    'chartLegend': {
        modalName: 'Legend Setting'
    },
    'chartCursor': {
        modalName: 'Tooltip Setting'
    }
}

export default obj