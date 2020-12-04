/**
 * echarts title transform
 * 
 */
import $ from 'jquery'

function transform(prefix, prop, value, titlePlace) {
    let obj = {
        attr: null,
        result: value,
        titlePlace
    }

    let final = {}

    let action = new Map([
        ['show', () => getAttr(obj, 'show', final)],
        ['text', () => {
            if (prefix == 'titlePlace') {
                getAttr(obj, 'text', final)
            } else {
                getAttr(obj, 'subtext', final)
            }
        }],
        ['label.fontGroup', () => {
            let fontWeight,fontStyle
            if (value.includes('bold')) {
                if(prefix == 'titlePlace'){
                    fontWeight = getFullAttr(obj, 'textStyle.fontWeight', 'bold')
                }else{
                    fontWeight = getFullAttr(obj, 'subtextStyle.fontWeight', 'bold')
                }
            }else{
                if(prefix == 'titlePlace'){
                    fontWeight = getFullAttr(obj, 'textStyle.fontWeight', 'normal')
                }else{
                    fontWeight = getFullAttr(obj, 'subtextStyle.fontWeight', 'normal')
                }
            }
            if (value.includes('italic')) {
                if(prefix == 'titlePlace'){
                    fontStyle = getFullAttr(obj, 'textStyle.fontStyle', 'italic')
                }else{
                    fontStyle = getFullAttr(obj, 'subtextStyle.fontStyle', 'italic')
                }
            }else{
                if(prefix == 'titlePlace'){
                    fontStyle = getFullAttr(obj, 'textStyle.fontStyle', 'normal')
                }else{
                    fontStyle = getFullAttr(obj, 'subtextStyle.fontStyle', 'normal')
                }
            }

            $.extend(true, final, fontStyle, fontWeight)
        }],
        ['label.fontSize', () => {
            if(prefix == 'titlePlace'){
                final = getFullAttr(obj, 'textStyle.fontSize')
            }else{
                final = getFullAttr(obj, 'subtextStyle.fontSize')
            }
        }],
        ['label.color', () => {
            if(prefix == 'titlePlace'){
                final = getFullAttr(obj, 'textStyle.color')
            }else{
                final = getFullAttr(obj, 'subtextStyle.color')
            }
        }],
        ['position.value', () => {
            if (value != 'custom') {
                getAttr(obj, 'left', final, value.split('-')[0])
                getAttr(obj, 'top', final, value.split('-')[1])
            }
        }],
        ['position.offsetX', () => getAttr(obj, 'left', final, value + '%')],
        ['position.offsetY', () => getAttr(obj, 'top', final, value + '%')],
        ['distance.value', () => {
            let actions = new Map([
                ['auto', 10],
                ['far', 30],
                ['close', 5],
                ['normal', 20],
            ])
            getAttr(obj, 'itemGap', final, actions.get(value))
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

function setValue(attr, data, value){
    if(attr.includes('.')){
        let arr = attr.split('.')
        repeat(data, arr)
    }else{
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

const transformTitle = function (chartAllTypeArray, titlePlace, title, props) {
    const chartPro = chartAllTypeArray[0];
    const chartType = chartAllTypeArray[1];
    const chartStyle = chartAllTypeArray[2];
    let prop
    let prefix
    let result
    let value

    prefix = props.prop.split(':')[0]
    prop = props.prop.split(':')[1]
    if (props.reverse) {
        value = props.oldValue
    } else {
        value = props.value
    }
    if (prefix == 'titlePlace') {
        result = transform('titlePlace', prop, value, titlePlace)
    } else {
        result = transform('subtitlePlace', prop, value, titlePlace)
    }
    setValue(prop, titlePlace, value)
    $.extend(true, title, result)
}

export default transformTitle