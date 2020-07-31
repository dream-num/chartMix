/**
 * 坐标轴转换
 */
import $ from 'jquery'
import { transTextStyle , transLineStyle , floatTool ,transCustom } from '@/utils/chartUtil'
import { deepCopy } from '@/utils/util'
const transformAxis = function(chartAllTypeArray , axis){
    let chartType = chartAllTypeArray[1]
    let option = {
        show: true,
        name: '',
        nameTextStyle: {
            color: '#333',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12
        },
        nameLocation: 'end',
        inverse: false,
        interval: null,
        nameGap: 15,
        nameRotate: null,
        axisLine: {
            show: true,
            lineStyle: {
                color: '#333',
                width: 1
            }
        },
        axisTick: {
            show: true,
            inside: false,
            length: 5,
            lineStyle: {
                width: 1,
                type: 'solid',
                color: null
            }
        },
        axisLabel: {
            show: true,
            rotate: 0,
            formatter: null
        },
        min: null,
        max: null,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#ccc',
                width: 1,
                type: 'solid'
            },
            interval: 'auto'
        },
        splitArea: {
            show: false,
            areaStyle: {
                color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
            }
        }
    }

    let transAxis = function(res , ori){
        let origin = deepCopy(axis[ori])
        res = $.extend(res , origin)
        // axis.show
        res.show = origin.show
        // axis.name
        res.name = origin.title.text
        // axis.label
        transTextStyle(origin.title , res , 'nameTextStyle')
        res.nameLocation = origin.title.fzPosition
        // 反向坐标轴
        res.inverse = origin.inverse
        // 坐标轴间隔个数
        if(res.type != 'value'){
            res.interval = origin.tickLabel.optimize
        }
        // 标题与轴线距离
        res.nameGap = origin.title.rotate
        // 刻度线设置
        res.axisLine.show = origin.tickLine.show
        res.axisLine.lineStyle = transLineStyle(origin.tickLine.width , origin.tickLine.color)
        // 刻度设置
        res.axisTick.show = origin.tick.show
        res.axisTick.lineStyle = transLineStyle(origin.tick.width , origin.tick.color)
        res.axisTick.inside = origin.tick.position == 'inside' ? true : false
        res.axisTick.length = origin.tick.length
        // 刻度标签
        res.axisLabel.show = origin.tickLabel.show
        res.axisLabel.rotate = origin.tickLabel.rotate
        // 标签formatter
        if((chartType == 'bar' && ori.slice(0,1) == 'x') || (chartType != 'bar' && ori.slice(0,1) == 'y')){
            res.min = origin.tickLabel.min
            res.max = origin.tickLabel.max
            res.axisLabel.formatter = function(params){
                if(origin.tickLabel.digit == 'auto'){
                    return origin.tickLabel.prefix + floatTool.multiply(+params , origin.tickLabel.ratio) + origin.tickLabel.suffix
                }else{
                    return origin.tickLabel.prefix + floatTool.multiply(+params , origin.tickLabel.ratio).toFixed(origin.tickLabel.digit) + origin.tickLabel.suffix
                }
            }
        }else{
            res.axisLabel.formatter = function(params){
                return origin.tickLabel.prefix + params + origin.tickLabel.suffix
            }
        }
        // 网格线
        res.splitLine.show = origin.netLine.show
        res.splitLine.lineStyle = transLineStyle(origin.netLine.width , origin.netLine.color , origin.netLine.type)
        res.splitLine.interval = transCustom(origin.netLine.interval.value , origin.netLine.interval.cusNumber)
        // 网格区域
        res.splitArea.show = origin.netArea.show
        res.splitArea.interval = transCustom(origin.netArea.interval.value , origin.netArea.interval.cusNumber)
        res.splitArea.areaStyle.color = [origin.netArea.colorOne == 'auto' ? 'rgba(250,250,250,0.3)' : origin.netArea.colorOne , origin.netArea.colorTwo == 'auto' ? 'rgba(200,200,200,0.3)' : origin.netArea.colorTwo]

        return res
    }

    return {
        xAxisUp: transAxis(deepCopy(option) , 'xAxisUp'),
        xAxisDown: transAxis(deepCopy(option) , 'xAxisDown'),
        yAxisLeft: transAxis(deepCopy(option) , 'yAxisLeft'),
        yAxisRight: transAxis(deepCopy(option) , 'yAxisRight')
    }
}

export default transformAxis