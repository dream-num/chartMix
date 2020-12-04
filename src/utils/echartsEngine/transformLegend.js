/**
 * legend转换
 */
import $ from 'jquery'

function transform(prop, value, legengPlace) {
    let obj = {
        attr: null,
        result: value,
        legengPlace
    }

    let final = {}

    let action = new Map([
        ['show', () => getAttr(obj, 'show', final)],
        ['position.direction', () => getAttr(obj, 'orient', final)],
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
        }],
        ['position.value', () => {
            if (value != 'custom') {
                getAttr(obj, 'left', final, value.split('-')[0])
                getAttr(obj, 'top', final, value.split('-')[1])
            }
        }],
        ['position.offsetX', () => getAttr(obj, 'left', final, value + '%')],
        ['position.offsetY', () => getAttr(obj, 'top', final, value + '%')],
        ['position.direction', () => getAttr(obj, 'orient', final)],
        ['width.value', () => {
            if (value != 'custom') {
                let width = new Map([
                    ['auto', 25],
                    ['big', 45],
                    ['medium', 18],
                    ['small', 10],
                ])
                getAttr(obj, 'itemWidth', final, width.get(value))
            }
        }],
        ['width.cusSize', () => getAttr(obj, 'itemWidth', final)],
        ['height.value', () => {
            if (value != 'custom') {
                let height = new Map([
                    ['auto', 14],
                    ['big', 30],
                    ['medium', 20],
                    ['small', 10],
                ])
                getAttr(obj, 'itemHeight', final, height.get(value))
            }
        }],
        ['height.cusSize', () => getAttr(obj, 'itemHeight', final)],
        ['distance.value', () => {
            let distance = new Map([
                ['auto', 10],
                ['far', 20],
                ['near', 5],
                ['general', 15],
            ])
            getAttr(obj, 'itemGap', final, distance.get(value))
        }],
        ['distace.cusGap', () => getAttr(obj, 'itemGap', final)]
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

const transformLegend = function (chartAllTypeArray, legendPlace, legend, props) {
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

    setValue(prop, legendPlace, value)
    result = transform(prop, value, legendPlace)

    $.extend(true, legend, result)
}


export default transformLegend