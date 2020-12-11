import { transTextStyle } from '@/utils/chartUtil'
/**
 * echarts title transform
 * 
 */
function transform(prefix, prop, value, title) {
    let obj = {
        attr: null,
        result: value,
        title
    }

    let final = {}

    let action = new Map([
        ['show', () => getAttr(obj, 'show', final)],
        ['text', () => {
            if (prefix == 'title') {
                getAttr(obj, 'text', final)
            } else {
                getAttr(obj, 'subtext', final)
            }
        }],
        ['label', () => {
            if (prefix == 'title') {
                transTextStyle(title, final, 'textStyle', 'text')
            } else {
                transTextStyle(subtitle, final, 'subtextStyle', 'subtext')
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

function getValue(prop, data) {
    let value
    if (prop.includes('.')) {
        let arr = prop.split('.')

        function repeat(data, arr) {
            for (let i = 0; i < arr.length; i++) {
                if (i != arr.length - 1) {
                    let field = arr[0]
                    arr.shift()
                    repeat(data[field], arr)
                } else {
                    value = data[arr[0]]
                }
            }
        }

        repeat(data, arr)
    } else {
        value = data[prop]
    }
    return value
}

function setValue(prop, data, value){
    if (prop.includes('.')) {
        let arr = prop.split('.')

        function repeat(data, arr) {
            for (let i = 0; i < arr.length; i++) {
                if (i != arr.length - 1) {
                    let field = arr[0]
                    data[field] = data[field] ? data[field] :{}
                    arr.shift()
                    repeat(data[field], arr)
                } else {
                    data[arr[0]] = value
                }
            }
        }

        repeat(data, arr)
    } else {
        data[prop] = value
    }
}

const transformTitle = function (chartAllTypeArray, title, subtitle, props) {
    const chartPro = chartAllTypeArray[0];
    const chartType = chartAllTypeArray[1];
    const chartStyle = chartAllTypeArray[2];
    let prop
    let prefix
    let result

    // init object
    let resultTitle = {
        show: true,
        text: '',
        left: 'auto',
        top: 'auto',
        textStyle: {
            fontSize: 12,
            color: '#333',
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        subtextStyle: {
            fontSize: 12,
            color: '#aaa',
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        subtext: '',
        itemGap: 10
    };

    if (props) {
        prefix = props.prop.split(':')[0]
        prop = props.prop.split(':')[1]
        if (props.reverse) {
            value = props.oldValue
        } else {
            value = props.value
        }
        if (prefix == 'title') {
            result = transform('title', prop, value, title)
            Object.assign(resultTitle, result)
        } else {
            result = transform('subtitle', prop, value, subtitle)
            Object.assign(resultTitle, result)
        }
        if (props.reverse) {
            return { resultTitle, prop: { prop: props.prop, value, oldValue: props.value } }
        }
        return { resultTitle, prop: { prop: props.prop, value, oldValue: props.oldValue } }
    } else {
        if (title.prop || subtitle.prop) {
            if (prefix == 'title') {
                prefix = title.prop.split(':')[0]
                prop = title.prop.split(':')[1]
                value = getValue(prop, title)
                result = transform('title', prop, value, title)
                Object.assign(resultTitle, result)
                return { resultTitle, prop: { prop: title.prop.prop, value, oldValue: title.prop.oldValue } }
            } else {
                prefix = subtitle.prop.split(':')[0]
                prop = subtitle.prop.split(':')[1]
                value = getValue(prop, subtitle)
                result = transform('subtitle', prop, value, subtitle)
                Object.assign(resultTitle, result)
                return { resultTitle, prop: { prop: subtitle.prop.prop, value, oldValue: subtitle.prop.oldValue } }
            }
        }
        return { resultTitle }
    }
}

export default transformTitle