/**
 * 鼠标提示转换
 */
import { transTextStyle , floatTool} from '@/utils/chartUtil'
const transformTooltip = function (chartAllTypeArray, tooltip) {
    const resTooltip = {
        show: true,
        trigger: 'item',
        textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14
        },
        backgroundColor: 'rgba(50,50,50,0.7)',
        triggerOn: 'mousemove|click',
        axisPointer: {
            type: 'line',
            lineStyle: {
                type: 'solid',
                width: 1,
                color: '#555'
            }
        },
        position: 'right'
    }
    // tooltip.show
    resTooltip.show = tooltip.show
    // 触发类型
    resTooltip.trigger = tooltip.triggerType
    // 触发条件
    resTooltip.triggerOn = tooltip.triggerOn
    // 文字样式
    transTextStyle(tooltip, resTooltip, 'textStyle')
    // 背景色
    resTooltip.backgroundColor = tooltip.backgroundColor
    // 指示器配置
    resTooltip.axisPointer.lineStyle = tooltip.axisPointer.style
    resTooltip.axisPointer.type = tooltip.axisPointer.type
    // 提示框位置
    resTooltip.position = tooltip.position == 'auto' ? null : tooltip.position
    // 提示formatter
    let format = tooltip.format
    let formatter1 = function (params) {
        console.dir(params)
        let str = params[0].name + "<br>"
        for (var i = 0; i < params.length; i++) {
            if(format[params[i].seriesIndex].digit == 'auto'){
                params[i].value = floatTool.multiply(+params[i].value,format[params[i].seriesIndex].ratio) + format[params[i].seriesIndex].suffix
            }else{
                params[i].value = floatTool.multiply(+params[i].value,format[params[i].seriesIndex].ratio).toFixed(format[params[i].seriesIndex].digit) + format[params[i].seriesIndex].suffix
            }

            str += "<div style='border-radius: 50%;display: inline-block;width: 10px; height: 10px; background-color:" + params[i].color + "'></div>&nbsp;" + params[i].seriesName + ":&nbsp;&nbsp;" + params[i].value + "<br>";
        }
        return str
    }

    let formatter2 = function (params) {
        if(format[params.seriesIndex].digit == 'auto'){
            params.value = floatTool.multiply(+params.value, format[params.seriesIndex].ratio) + format[params.seriesIndex].suffix
        }else{
            params.value = floatTool.multiply(+params.value, format[params.seriesIndex].ratio).toFixed(format[params.seriesIndex].digit) + format[params.seriesIndex].suffix
        }
        let str = params.seriesName + "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + params.name + ":&nbsp;&nbsp;" + params.value;
        return str
    }

    let actions = new Map([
        ['item' , formatter2],
        ['axis' , formatter1]
    ]) 
    resTooltip.formatter = actions.get(resTooltip.trigger)

    return resTooltip
}

export default transformTooltip