let obj = {
    'chartSetting': {
        data: '数据',
        chartType: '图表类型',
        transpose: '转置(切换行/列)',
        row1: '设选中项第',
        row2: '行为标题',
        column: '设选中项第',
        column: '列为标题',
        style: '样式',
        echarts: {
            line: {
                default: '默认折线图',
                smooth: '平滑折线图',
                label: '带标签的折线图'
            },
            area: {
                default: '默认面积图',
                stack: '堆叠面积图'
            },
            column: {
                default: '默认柱状图',
                stack: '堆叠柱状图'
            },
            bar: {
                default: '默认条形图',
                stack: '堆叠条形图'
            },
            pie: {
                default: '默认饼图',
                split: '分离型饼图',
                ring: '环形饼图'
            }
        }
    },
    'chartTitle': {
        modalName: '标题设置'
    },
    'chartSubTitle': {
        modalName: '副标题设置'
    },
    'chartAxis': {
        modalName: 'XY轴设置'
    },
    'chartLegend': {
        modalName: '图例设置'
    },
    'chartCursor': {
        modalName: '鼠标提示'
    }
}

export default obj