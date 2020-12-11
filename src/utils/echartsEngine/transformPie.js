import { floatTool } from '@/utils/chartUtil'
import { deepCopy } from '@/utils/util'
function transform(prop, value, series, index) {
    let obj = {
        attr: null,
        result: value,
        value,
        series
    }

    // 如果没有formatter
    if (!series.format) {
        series.format = {
            format: "{b}",
            ratio: 1,
            digit: "auto",
            prefix: "",
            suffix: ""
        }
    }

    let final = {}
    let action = new Map([
        ['pieType', () => getAttr(obj, 'roseType', final)],
        ['radius', () => {
            obj.result = obj.result.split('-')
            getAttr(obj, 'radius', final)
        }],
        ['cusradius', () => {
            obj.result = [obj.result[0] + '%', obj.result[1] + '%']
            getAttr(obj, 'radius', final)
        }],
        ['center', () => {
            obj.result = obj.result.split('-')
            getAttr(obj, 'center', final)
        }],
        ['cuscenter', () => {
            obj.result = [obj.result[0] + '%', obj.result[1] + '%']
            getAttr(obj, 'center', final)
        }],
        ['clockwise', () => getAttr(obj, 'clockwise', final)],
        ['startAngle', () => getAttr(obj, 'startAngle', final)],
        ['cusAngle', () => getAttr(obj, 'startAngle', final)],
        ['label.show', () => final = getFullAttr(obj, 'label.show')],
        ['label.position', () => final = getFullAttr(obj, 'label.position')],
        ['label.fontSize', () => final = getFullAttr(obj, 'label.fontSize')],
        ['labelLine.show', () => final = getFullAttr(obj, 'labelLine.show')],
        ['labelLine.smooth', () => final = getFullAttr(obj, 'labelLine.smooth')],
        ['labelLine.lineStyle.type', () => final = getFullAttr(obj, 'labelLine.lineStyle.type')],
        ['labelLine.lineStyle.width', () => final = getFullAttr(obj, 'labelLine.lineStyle.width')],
        ['labelLine.length', () => final = getFullAttr(obj, 'labelLine.length')],
        ['labelLine.length2', () => final = getFullAttr(obj, 'labelLine.length2')],
        ['data.label.show', () => {
            final.data = obj.series.data
            Object.assign(final.data[index], getFullAttr(obj, 'data.label.show', obj.series.data[index]))
        }],
        ['data.label.position', () => {
            final.data = obj.series.data
            Object.assign(final.data[index], getFullAttr(obj, 'data.label.position', obj.series.data[index]))
        }],
        ['data.label.fontSize', () => {
            final.data = obj.series.data
            Object.assign(final.data[index], getFullAttr(obj, 'data.label.fontSize', obj.series.data[index]))
        }],
        ['data.labelLine.show', () => {
            final.data = obj.series.data
            Object.assign(final.data[index], getFullAttr(obj, 'data.labelLine.show', obj.series.data[index]))
        }],
        ['data.labelLine.smooth', () => {
            final.data = obj.series.data
            Object.assign(final.data[index], getFullAttr(obj, 'data.labelLine.smooth', obj.series.data[index]))
        }],
        ['data.labelLine.lineStyle.type', () => {
            final.data = obj.series.data
            Object.assign(final.data[index], getFullAttr(obj, 'data.labelLine.lineStyle.type', obj.series.data[index]))
        }],
        ['data.labelLine.lineStyle.width', () => {
            final.data = obj.series.data
            Object.assign(final.data[index], getFullAttr(obj, 'data.labelLine.lineStyle.width', obj.series.data[index]))
        }],
        ['data.labelLine.length', () => {
            final.data = obj.series.data
            Object.assign(final.data[index], getFullAttr(obj, 'data.labelLine.length', obj.series.data[index]))
        }],
        ['data.labelLine.length2', () => {
            final.data = obj.series.data
            Object.assign(final.data[index], getFullAttr(obj, 'data.labelLine.length2', obj.series.data[index]))
        }],

        ['label.format-format', () => series.format['format'] = value],
        ['label.format-digit', () => series.format['digit'] = value],
        ['label.format-ratio', () => series.format['ratio'] = value],
    ])

    action.get(prop)()

    // 调整formatter形式
    if (prop.includes('format')) {
        let formatter = formatData(series.format)
        getStyle(obj, 'label', 'formatter', final, formatter)
    }

    return final
}

// 属性赋值
function getAttr(obj, attr, final, value) {
    obj.attr = attr
    if(value){
        final[obj.attr] = value
    }else{
        final[obj.attr] = obj.result
    }
}
// 对象属性赋值
function getStyle(obj, desc, field, final, value) {
    obj.attr = desc
    if(!obj.series[obj.attr]){
        obj.series[obj.attr] = {}
    }
    if (value) {
        obj.series[obj.attr][field] = value
    } else {
        obj.series[obj.attr][field] = obj.value
    }
    obj.result = obj.series[obj.attr]

    getAttr(obj, desc, final)
}

// 
function getFullAttr(obj, attr, data, value){
    let arr = attr.split('.')
    let final
    if(data){
        if(arr[0] == 'series'){
            arr.splice(0 , 1)
        }
        if(Reflect.has(data, arr[0])){
            final = {}
            final[arr[0]] = data[arr[0]]
        }else{
            final = {}
        }
    }else{
        if(Reflect.has(obj.series, arr[0])){
            final = {}
            final[arr[0]] = obj.series[arr[0]]
        }else{
            final = {}
        }
    }

    function repeat(obj, final, value){
        for(let i = 0; i < arr.length; i++){
            if(i != arr.length - 1){
                let field = arr[0]
                if(!Reflect.has(final, field)){
                    final[field] = {}
                }
                arr.shift()
                repeat(obj, final[field], value)
            }else{
                if(value){
                    final[arr[0]] = value
                }else{
                    final[arr[0]] = obj.result
                }
            }
        }
    }
    repeat(obj, final, value)
    return final
}

// formatter转换
function formatData(format) {
    let fun
    if (format.format == '{b}') {
        fun = '{b}'
    }else if(format.format == '{b}{c}'){
        fun = function (params) {
            if (format.digit == 'default') {
                return (
                    params.name + format.prefix.trim() +
                    floatTool.multiply(params.value, format.ratio) +
                    format.suffix.trim()
                )

            } else {
                return (
                    params.name + format.prefix.trim() +
                    floatTool
                        .multiply(params.value, format.ratio)
                        .toFixed(format.digit) +
                    format.suffix.trim()
                )
            }
        }
    }else if(format.format == '{b}{c}{d}'){
        fun = function(params){
            if (format.digit == 'default') {
                return (
                    params.name + format.prefix.trim() +
                    floatTool.multiply(params.value, format.ratio) +
                    format.suffix.trim() + params.percent.toFixed(2) + '%'
                )
    
            } else {
                return (
                    params.name + format.prefix.trim() +
                    floatTool
                        .multiply(params.value, format.ratio)
                        .toFixed(format.digit) +
                    format.suffix.trim() + params.percent.toFixed(2) + '%'
                )
            }
        }
    }

    return fun
}

const transformPie = function (chartAllTypeArray, seriesPlace, series, props) {
    const chartPro = chartAllTypeArray[0];
    const chartType = chartAllTypeArray[1];
    const chartStyle = chartAllTypeArray[2];

    let prop
    let result
    let value
    let index = seriesPlace.currentIndex - 1

    prop = props.prop.split(':')[1]
    if (props.reverse) {
        value = props.oldValue
    } else {
        value = props.value
    }

    setValue(prop, seriesPlace, value)

    result = transform(prop, value, deepCopy(series[0]), index)
    $.extend(true, series[0], result)

}

export default transformPie