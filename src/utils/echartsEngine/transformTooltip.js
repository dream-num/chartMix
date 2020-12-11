/**
 * 鼠标提示转换
 */
import $ from 'jquery'

function transform(prop, value, tooltipPlace) {
    let obj = {
        attr: null,
        result: value,
        tooltipPlace
    }

    let final = {}

    let action = new Map([
        ['show', () => getAttr(obj, 'show', final)],
        ['triggerOn', () => getAttr(obj, 'triggerOn', final)],
        ['triggerType', () => getAttr(obj, 'trigger', final)],
        ['backgroundColor', () => getAttr(obj, 'backgroundColor', final)],
        ['axisPointer.style.type', () => final = getFullAttr(obj, 'axisPointer.lineStyle.type')],
        ['axisPointer.style.width', () => final = getFullAttr(obj, 'axisPointer.lineStyle.width')],
        ['axisPointer.style.color', () => final = getFullAttr(obj, 'axisPointer.lineStyle.color')],
        ['axisPointer.type', () => final = getFullAttr(obj, 'axisPointer.type')],
        ['position', () => {
            value == 'auto' ? getAttr(obj, 'trigger', final, null) : getAttr(obj, 'trigger', final)
        }],
        ['label.fontSize', () => {
            final = getFullAttr(obj, 'textStyle.fontSize')
        }],
        ['label.fontGroup', () => {
            let fontWeight, fontStyle
            if (value.includes('bold')) {
                fontWeight = getFullAttr(obj, 'textStyle.fontWeight', 'bold')
            } else {
                fontWeight = getFullAttr(obj, 'textStyle.fontWeight', 'normal')
            }
            if (value.includes('italic')) {
                fontStyle = getFullAttr(obj, 'textStyle.fontStyle', 'italic')
            } else {
                fontStyle = getFullAttr(obj, 'textStyle.fontStyle', 'normal')
            }
            $.extend(true, final, fontWeight, fontStyle)
        }],
        ['label.fontSize', () => {
            final = getFullAttr(obj, 'textStyle.fontSize')
        }],
        ['label.color', () => {
            final = getFullAttr(obj, 'textStyle.color')
        }]
    ])

    action.get(prop)()

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

const transformTooltip = function (chartAllTypeArray, tooltipPlace, tooltip, props) {
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

    setValue(prop, tooltipPlace, value)
    result = transform(prop, value, tooltipPlace)

    $.extend(true, tooltip, result)
}

export default transformTooltip