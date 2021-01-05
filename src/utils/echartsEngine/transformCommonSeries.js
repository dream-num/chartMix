import { floatTool } from '@/utils/chartUtil'
function transform(prop, value, series) {
    let obj = {
        attr: null,
        result: value,
        value,
        series
    }

    // 如果没有formatter
    if (!series.format) {
        series.format = {
            format: "{c}",
            ratio: "1",
            digit: "auto",
            prefix: "",
            suffix: ""
        }
    }

    let final = {}
    let action = new Map([
        ['xradio', () => getAttr(obj, 'xAxisIndex', final)],
        ['yradio', () => getAttr(obj, 'yAxisIndex', final)],
        ['type', () => getAttr(obj, 'type', final)],
        ['lineWidth', () => getStyle(obj, 'lineStyle', 'width', final)],
        ['lineType', () => getStyle(obj, 'lineStyle', 'type', final)],
        ['lineStyle', () => {
            if (value.includes('smooth')) {
                obj.attr = 'smooth'
                final.smooth = true
            } else {
                obj.attr = 'smooth'
                final.smooth = false
            }
            if (value.includes('step')) {
                obj.attr = 'step'
                final.step = true
            } else {
                obj.attr = 'step'
                final.step = false
            }
        }],
        ['cuslineWidth', () => getStyle(obj, 'lineStyle', 'width', final)],
        ['showSymbol', () => getAttr(obj, 'showSymbol', final)],
        ['symbolSize', () => getAttr(obj, 'symbolSize', final)],
        ['symbol', () => getAttr(obj, 'symbol', final)],
        ['cusSymbolSize', () => getAttr(obj, 'symbolSize', final)],
        ['barColor', () => getStyle(obj, 'itemStyle', 'color', final)],
        ['barWidth', () => getAttr(obj, 'barWidth', final)],
        ['cusbarWidth', () => getAttr(obj, 'barWidth', final)],
        ['barMinHeight', () => getAttr(obj, 'barMinHeight', final)],
        ['cusbarMinHeight', () => getAttr(obj, 'barMinHeight', final)],
        ['barGap', () => getAttr(obj, 'barGap', final)],
        ['cusbarGap', () => getAttr(obj, 'barGap', final)],
        ['barCategoryGap', () => getAttr(obj, 'barCategoryGap', final)],
        ['cusbarCategoryGap ', () => getAttr(obj, 'barCategoryGap', final)],
        ['showLabel', () => getStyle(obj, 'label', 'show', final)],
        ['textPos', () => getStyle(obj, 'label', 'position', final)],
        ['fontPlace', () => {
            if (value.includes('bold')) {
                getStyle(obj, 'label', 'fontWeight', final, 'bold')
            } else {
                getStyle(obj, 'label', 'fontWeight', final, 'normal')
            }
            if (value.includes('italic')) {
                getStyle(obj, 'label', 'fontStyle', final, 'italic')
            } else {
                getStyle(obj, 'label', 'fontStyle', final, 'italic')
            }
        }],
        ['fontSize', () => getStyle(obj, 'label', 'fontSize', final)],
        ['offsetX', () => {
            let data = [value + '%', series.label.offset ? series.label.offset[1] : 0]
            getStyle(obj, 'label', 'offset', final, data)
        }],
        ['offsetY', () => {
            let data = [series.label.offset ? series.label.offset[0] : 0, value + '%']
            getStyle(obj, 'label', 'offset', final, data)
        }],
        ['customSize', () => getStyle(obj, 'label', 'fontSize', final)],
        ['showStack', () => {
            if (value) {
                final.stack = value
            } else {
                final.stack = null
            }
        }],
        ['stackValue', () => getAttr(obj, 'stack', final)],
        ['barCategoryGap', () => getAttr(obj, 'barCategoryGap', final)],
        ['cusbarCategoryGap', () => getAttr(obj, 'barCategoryGap', final)],
        ['format-format', () => series.format['format'] = value],
        ['format-digit', () => series.format['digit'] = value],
        ['format-ratio', () => series.format['ratio'] = value],
        ['format-prefix', () => series.format['prefix'] = value],
        ['format-suffix', () => series.format['suffix'] = value]
    ])

    action.get(prop)()

    // 调整formatter形式
    if (prop.includes('format')) {
        let formatter = formatData(series.format)
        getStyle(obj, 'label', 'formatter', final, formatter)
        getAttr(obj, 'format', final, series.format)
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
function getStyle(obj, desc, field, final, value) {
    obj.attr = desc
    if (!obj.series[obj.attr]) {
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
// formatter转换
function formatData(format) {
    let fun
    if (format.format == '{c}') {
        fun = function (params) {
            if (format.digit == 'default') {
                return (
                    format.prefix.trim() +
                    floatTool.multiply(params.value, format.ratio) +
                    format.suffix.trim()
                )

            } else {
                return (
                    format.prefix.trim() +
                    floatTool
                        .multiply(params.value, format.ratio)
                        .toFixed(format.digit) +
                    format.suffix.trim()
                )
            }
        }
    }

    return fun
}

const transformCommonSeries = function (chartAllTypeArray, seriesPlace, series, props) {
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

    setValue(prop, seriesPlace, value)

    if (!props.index) {
        for (let i = 0; i < series.length; i++) {
            result = transform(prop, value, series[i])
            $.extend(true, series[i], result)
        }
    } else {
        result = transform(prop, value, series[props.index - 1])
        $.extend(true, series[props.index - 1], result)
    }

}

export default transformCommonSeries