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
        modalName: '标题设置',
        show: '显示主标题',
        text: '标题内容',
        placeholder: '请输入标题内容',
        label: '文本样式',
        position: '标题位置',
        offsetL: '滑动修改左边距偏移量',
        offsetT: '滑动修改上边距偏移量'
    },
    'chartSubTitle': {
        modalName: '副标题设置',
        placeholder: '请输入标题内容',
        text: '副标题内容',
        label: '文本样式',
        gap: '主副标题间距',
        content: '滑动修改间距'
    },
    'chartAxis': {
        modalName: 'XY轴设置',
        select: '选择坐标轴',
        text: '标题内容',
        placeholder: '请输入标题内容',
        label: '文本样式',
        align: '文本对齐方式',
        reverse: '反向坐标轴',
        content: '滑动修改坐标轴间隔个数',
        intenval: '坐标轴间隔个数',
        content1: '滑动修改标题与轴线距离',
        gap: '标题与轴线距离',
        content2: '滑动修改倾斜角度',
        title: '倾斜轴标题',
        showLine: '显示刻度线',
        content3: '滑动修改刻度线宽度',
        lineWidth: '刻度线宽度',
        lineColor: '刻度线颜色',
        showTick: '显示刻度',
        position: '刻度位置',
        content4: '滑动修改刻度长度',
        tickLength: '刻度长度',
        content5: '滑动修改刻度宽度',
        tickWidth: '刻度宽度',
        tickColor: '刻度颜色',
        showLabel: '显示刻度标签',
        content6: '滑动修改标签倾斜角度',
        rotate: '倾斜标签',
        content7: '请输入刻度最小值',
        min: '刻度最小值',
        content8: '请输入刻度最大值且最大值不能小于最小值',
        max: '刻度最大值',
        ratio: '数值缩放比例',
        digit: '小数位数',
        content9: '请输入标签前缀',
        prefix: '标签前缀',
        content10: '请输入标签后缀',
        suffix: '标签后缀',
        showNet: '显示网格线',
        content11: '滑动修改网格线宽度',
        netWidth: '网格线宽度',
        netType: '网格线类型',
        netColor: '网格线颜色',
        netInterval: '网格线分割间隔数',
        content12: '滑动修改间隔数',
        showArea: '显示网格区域',
        areaInterval: '网格区域分割间隔数',
        area1: '网格区域第一颜色',
        area2: '网格区域第二颜色'
    },
    'chartLegend': {
        modalName: '图例设置',
        show: '显示图例',
        label: '图例样式',
        position: '图例位置',
        contentH: '滑动修改水平偏移量',
        contentV: '滑动修改垂直偏移量',
        direction: '图例朝向',
        width: '图例宽度',
        height: '图例高度',
        contentWidth: '滑动修改图例宽度',
        contentHeight: '滑动修改图例高度',
        gap: '图例间距',
        contentGap: '滑动修改图例间距'
    },
    'chartCursor': {
        modalName: '鼠标提示',
        show: '显示提示框',
        label: '鼠标提示样式',
        background: '背景颜色',
        trigger: '提示触发条件',
        type: '提示触发类型',
        lineType: '指示器线类型',
        lineWidth: '指示器线宽',
        color: '线条颜色',
        axisType: '指示器类型',
        position: '提示框浮层位置',
        suffix: '鼠标提示后缀',
        placeholder: '后缀',
        ratio: '数值比例',
        digit: '小数位数'
    }
}

export default obj