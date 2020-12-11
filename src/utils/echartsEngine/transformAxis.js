/**
 * 坐标轴转换
 */
import $ from 'jquery'
import { floatTool } from '@/utils/chartUtil'

function transform(prop, value, axisPlace, props, chartType) {
    let obj = {
        attr: null,
        result: value
    }

    if (!axisPlace.format) {
        axisPlace.format = {
            ratio: "1",
            digit: "auto",
            prefix: "",
            suffix: ""
        }
    }

    let final = {}

    let action = new Map([
        ['show', () => getAttr(obj, 'show', final)],
        ['title.text', () => getAttr(obj, 'name', final)],
        ['title.fzPosition', () => getAttr(obj, 'nameLocation', final)],
        ['inverse', () => getAttr(obj, 'inverse', final)],
        ['tickLabel.optimize', () => getAttr(obj, 'interval', final)],
        ['title.nameGap', () => getAttr(obj, 'nameGap', final)],
        ['title.rotate', () => getAttr(obj, 'nameRotate', final)],
        ['label.fontSize', () => {
            final = getFullAttr(obj, 'nameTextStyle.fontSize')
        }],
        ['label.fontGroup', () => {
            let fontWeight, fontStyle
            if (value.includes('bold')) {
                fontWeight = getFullAttr(obj, 'nameTextStyle.fontWeight', 'bold')
            } else {
                fontWeight = getFullAttr(obj, 'nameTextStyle.fontWeight', 'normal')
            }
            if (value.includes('italic')) {
                fontStyle = getFullAttr(obj, 'nameTextStyle.fontStyle', 'italic')
            } else {
                fontStyle = getFullAttr(obj, 'nameTextStyle.fontStyle', 'normal')
            }
            $.extend(true, final, fontWeight, fontStyle)
        }],
        ['label.fontSize', () => {
            final = getFullAttr(obj, 'nameTextStyle.fontSize')
        }],
        ['label.color', () => {
            final = getFullAttr(obj, 'nameTextStyle.color')
        }],
        ['tickLine.show', () => final = getFullAttr(obj, 'axisLine.show')],
        ['tickLine.width', () => final = getFullAttr(obj, 'axisLine.lineStyle.width')],
        ['tickLine.color', () => final = getFullAttr(obj, 'axisLine.lineStyle.color')],
        ['tick.show', () => final = getFullAttr(obj, 'axisTick.show')],
        ['tick.position', () => {
            value == 'inside' ? final = getFullAttr(obj, 'axisTick.show', true) : final = getFullAttr(obj, 'axisTick.show', false)
        }],
        ['tick.length', () => final = getFullAttr(obj, 'axisTick.length')],
        ['tick.width', () => final = getFullAttr(obj, 'axisTick.lineStyle.width')],
        ['tick.color', () => final = getFullAttr(obj, 'axisTick.lineStyle.color')],
        ['tickLabel.show', () => final = getFullAttr(obj, 'axisLabel.show')],
        ['tickLabel.rotate', () => final = getFullAttr(obj, 'axisLabel.rotate')],
        ['tickLabel.max', () => getAttr(obj, 'max', final)],
        ['tickLabel.min', () => getAttr(obj, 'min', final)],
        ['netLine.show', () => final = getFullAttr(obj, 'splitLine.show')],
        ['netLine.width', () => final = getFullAttr(obj, 'splitLine.lineStyle.width')],
        ['netLine.type', () => final = getFullAttr(obj, 'splitLine.lineStyle.type')],
        ['netLine.color', () => final = getFullAttr(obj, 'splitLine.lineStyle.color')],
        ['netArea.show', () => final = getFullAttr(obj, 'splitArea.show')],
        ['netArea.interval.value', () => {
            if (value != 'custom') {
                final = getFullAttr(obj, 'splitArea.interval')
            }
        }],
        ['netLine.interval.value', () => {
            if (value != 'custom') {
                final = getFullAttr(obj, 'splitLine.interval')
            }
        }],
        ['netArea.interval.cusNumber', () => final = getFullAttr(obj, 'splitArea.interval')],
        ['netLine.interval.cusNumber', () => final = getFullAttr(obj, 'splitLine.interval')],
        ['format-digit', () => axisPlace.format['digit'] = value],
        ['format-ratio', () => axisPlace.format['ratio'] = value],
        ['format-prefix', () => axisPlace.format['prefix'] = value],
        ['format-suffix', () => axisPlace.format['suffix'] = value],
    ])

    action.get(prop)()

    // 调整formatter形式
    if (prop.includes('format')) {
        let formatter = formatData(axisPlace.format, props, chartType)
        final = getFullAttr(obj, 'axisLabel.formatter', formatter)
    }

    return final
}

// 属性赋值
function getAttr(obj, attr, final, value) {
    obj.attr = attr
    if (value) {
        final[obj.attr] = value
    } else {
        final[obj.attr] = obj.result
    }
}

// 对象属性赋值
function getFullAttr(obj, attr, value) {
    let arr = attr.split('.')
    let final = {}

    function repeat(obj, final, value) {
        for (let i = 0; i < arr.length; i++) {
            if (i != arr.length - 1) {
                let field = arr[0]
                if (!Reflect.has(final, field)) {
                    final[field] = {}
                }
                arr.shift()
                repeat(obj, final[field], value)
            } else {
                if (value) {
                    final[arr[0]] = value
                } else {
                    final[arr[0]] = obj.result
                }
            }
        }
    }
    repeat(obj, final, value)
    return final
}

function setValue(attr, data, value) {
    if (attr.includes('.')) {
        let arr = attr.split('.')
        repeat(data, arr)
    } else {
        data[attr] = value
    }

    function repeat(data, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (i != arr.length - 1) {
                let field = arr[0]
                if (!Reflect.has(data, field)) {
                    data[field] = {}
                }
                arr.shift()
                repeat(data[field], arr)
            } else {
                data[arr[0]] = value
            }
        }
    }
}

function formatData(format, props, chartType){
    let ori = props.split(':')[0].split('-')[1]
    if ((chartType == 'bar' && ori.slice(0, 1) == 'x') || (chartType != 'bar' && ori.slice(0, 1) == 'y')) {
        return function (params) {
            if (format.digit == 'auto') {
                return format.prefix + floatTool.multiply(+params, format.ratio) + format.suffix
            } else {
                return format.prefix + floatTool.multiply(+params, format.ratio).toFixed(format.digit) + format.suffix
            }
        }
    } else {
        return function (params) {
            return format.prefix + params + format.suffix
        }
    }
}

const transformAxis = function (chartAllTypeArray, axisPlace, axis, props) {
    const chartPro = chartAllTypeArray[0];
    const chartType = chartAllTypeArray[1];
    const chartStyle = chartAllTypeArray[2];
    let prop
    let result
    let value

    prop = props.prop.split(':')[1]
    if (props.reverse) {
        value = props.oldValue
    } else {
        value = props.value
    }

    setValue(prop, axisPlace, value)
    result = transform(prop, value, axisPlace, props, chartType)

    $.extend(true, axis, result)
}

export default transformAxis