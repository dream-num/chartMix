/**
 * 深度克隆数据,包括对象，数组，map
 * @param {*} obj 对象，数组，map
 */
function deepCopy(obj) {
    if (!isObject(obj) && !isMap(obj)) {
        return obj;
    }

    let cloneObj;
    if (isMap(obj)) {
        cloneObj = new Map();
        for (let key of obj.keys()) {
            let value = obj.get(key);
            if (isMap(value) || isObject(value) || Array.isArray(obj)) {
                let copyVal = deepCopy(value);
                cloneObj.set(key, copyVal);
            } else {
                cloneObj.set(key, value);
            }
        }
    } else if (typeof obj === "function") {
        cloneObj = obj
    } else {
        cloneObj = Array.isArray(obj) ? [] : {};
        if (obj instanceof HTMLElement) {
            cloneObj = obj.cloneNode(true)
        } else {
            for (let key in obj) {
                // if (obj.hasOwnProperty(key)) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    cloneObj[key] =
                        isMap(obj[key]) || isObject(obj[key])
                            ? deepCopy(obj[key])
                            : obj[key];
                }
            }

        }
    }
    return cloneObj;
}

/**
 * 判断参数是否是Object类型
 * @param {*} o 
 */
function isObject(o) {
    return (
        !isMap(o) &&
        (typeof o === 'object' || typeof o === 'function') &&
        o !== null
    );
}

/**
 * 判断参数是否是Map类型
 * @param {*} obj 
 */
function isMap(obj) {
    if (obj instanceof Map) {
        return true;
    } else {
        return false;
    }
}

/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
const deepClone = function (obj, cache = []) {
    // typeof [] => 'object'
    // typeof {} => 'object'
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
	/**
	 * 类似下面这种
	 * var a = {b:1}
	 * a.c = a
	 * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
	 */
    const hit = cache.filter(c => c.original === obj)[0]
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
    cache.push({
        original: obj,
        copy
    })
    Object.keys(obj).forEach(key => {
        copy[key] = deepClone(obj[key], cache)
    })

    return copy
}

//生成随机的图表id
function generateRandomKey(prefix) {
    if (prefix == null) {
        prefix = 'chart'
    }

    var userAgent = window.navigator.userAgent
        .replace(/[^a-zA-Z0-9]/g, '')
        .split('')
    var mid = ''
    for (var i = 0; i < 12; i++) {
        mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))]
    }
    var time = new Date().getTime()

    return prefix + '_' + mid + '_' + time
}


// 替换temp中的${xxx}为指定内容 ,temp:字符串，这里指html代码，dataarry：一个对象{"xxx":"替换的内容"}
// 例：jfgrid.replaceHtml("${image}",{"image":"abc","jskdjslf":"abc"})   ==>  abc
function replaceHtml(temp, dataarry) {
    return temp.replace(/\$\{([\w]+)\}/g, function (s1, s2) { var s = dataarry[s2]; if (typeof (s) != "undefined") { return s; } else { return s1; } });
}

function hasChinaword(s) {
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    if (!patrn.exec(s)) {
        return false;
    }
    else {
        return true;
    }
}

function isdatetime(s) {
    if (s == null || s.toString().length < 5) {
        return false;
    }
    else if (checkDateTime(s)) {
        return true;
    }
    else {
        return false;
    }

    function checkDateTime(str) {
        var reg1 = /^(\d{4})-(\d{1,2})-(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/;
        var reg2 = /^(\d{4})\/(\d{1,2})\/(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/;

        if (!reg1.test(str) && !reg2.test(str)) {
            return false;
        }

        var year = RegExp.$1,
            month = RegExp.$2,
            day = RegExp.$3;

        if (year < 1900) {
            return false;
        }

        if (month > 12) {
            return false;
        }

        if (day > 31) {
            return false;
        }

        if (month == 2) {
            if (new Date(year, 1, 29).getDate() == 29 && day > 29) {
                return false;
            }
            else if (new Date(year, 1, 29).getDate() != 29 && day > 28) {
                return false;
            }
        }

        return true;
    }
}

function isRealNum(val) {
    if (val === "" || val == null) {
        return false;
    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }
}

function isdatatype(s) {
    var type = "string";
    if (isdatetime(s)) {
        type = "date";
    }
    else if (!isNaN(parseFloat(s)) && !hasChinaword(s)) {
        type = "num";
    }
    return type;
}


function dataTranspose(getdata) {
    var arr = []
    for (var c = 0; c < getdata[0].length; c++) {
        var a = []
        for (var r = 0; r < getdata.length; r++) {
            var value = ''
            if (getdata[r] != null && getdata[r][c] != null) {
                value = getdata[r][c]
            }
            a.push(value)
        }
        arr.push(a)
    }
    return arr
}

function dataChangeOrder(data, order) {
    if (data.length == 0 || data.length != order.length) {
        return data
    }
    var ret = []
    for (var i = 0; i < data.length; i++) {
        ret[order[i]] = data[i]
    }
    return ret
}

function dataChangeOrderTwo(data, order) {
    var ret = []
    for (var r = 0; r < data.length; r++) {
        var d = data[r]
        ret.push(dataChangeOrder(d, order))
    }
    return ret
}

function getObjType(obj) {
    var toString = Object.prototype.toString;

    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }

    // if(obj instanceof Element){
    //     return 'element';
    // }

    return map[toString.call(obj)];
}

function getRowColCheck(data) {
    //从右下角开始，按照斜角网上遍历，如果非数字格式则取得上一个斜角的行列值。然后分别按行和按列往左遍历，遇到非数字则记0-i为列头或行头
    var r = data.length - 1,
        c = data[0].length - 1
    var r_cal, c_cal
    while (r >= 0 && c >= 0) {
        var cell = data[r][c]
        //cell的可能值,都判断为同数字一样略过，不作为标题
        //1.cell = 3;
        //2.cell = {v:3}
        //3.cell = {}
        //4.cell = ""
        //5.cell.v = ""
        if (
            cell === null ||
            isRealNum(cell) ||
            (getObjType(cell) == 'object' && isRealNum(cell.v)) ||
            (getObjType(cell) == 'object' &&
                getObjType(cell.v) == 'undefined') ||
            cell === '' ||
            cell.v === ''
        ) {
            if (cell && cell.ct && cell.ct.fa == 'yyyy-MM-dd') {
                r_cal = r + 1
                c_cal = c + 1
                break
            } else {
                r_cal = r--
                c_cal = c--
            }
        } else {
            if (r == data.length - 1 && c == data[0].length - 1) {
                r_cal = r
                c_cal = c
            } else {
                r_cal = r + 1
                c_cal = c + 1
            }
            break
        }
    }

    var rowcheck = { exits: false, range: [0, 0] } //默认取第一行，让设计界面的check可以有值
    if (r_cal > 0) {
        for (var i = r_cal; i >= 0; i--) {
            var cell = data[i][c_cal]
            if (
                cell === null ||
                isRealNum(cell) ||
                (getObjType(cell) == 'object' && isRealNum(cell.v)) ||
                (getObjType(cell) == 'object' &&
                    getObjType(cell.v) == 'undefined') ||
                cell === '' ||
                cell.v === ''
            ) {
            } else {
                rowcheck.exits = true
                rowcheck.range = [0, i]
                break
            }
        }
    }

    var colcheck = { exits: false, range: [0, 0] } //默认取第一列，让设计界面的check可以有值
    if (c_cal > 0) {
        for (var i = c_cal; i >= 0; i--) {
            var cell = data[r_cal][i]
            if (
                cell === null ||
                isRealNum(cell) ||
                (getObjType(cell) == 'object' && isRealNum(cell.v)) ||
                (getObjType(cell) == 'object' &&
                    getObjType(cell.v) == 'undefined') ||
                cell === '' ||
                cell.v === ''
            ) {
                if (cell && cell.ct && cell.ct.fa == 'yyyy-MM-dd') {
                    colcheck.exits = true
                    colcheck.range = [0, i]
                    break
                }
            } else {
                colcheck.exits = true
                colcheck.range = [0, i]
                break
            }
        }
    }

    //处理行标题和列标签为整个数据的时候，把标题去除，只用作内容
    if (rowcheck.range[1] + 1 == data.length) {
        rowcheck = { exits: false, range: [0, 0] }
    }
    if (colcheck.range[1] + 1 == data[0].length) {
        colcheck = { exits: false, range: [0, 0] }
    }
    // console.dir([rowcheck, colcheck])
    return [rowcheck, colcheck]
}

function getRangeSplitArray(
    chartData,
    rangeColCheck,
    rangeRowCheck
) {
    var rangeSplitArray = {}
    //生成类似excel的图表选区
    //上左、上右、下左、下右
    if (rangeColCheck.exits && rangeRowCheck.exits) {
        rangeSplitArray = {
            title: { row: rangeRowCheck.range, column: rangeColCheck.range },
            rowtitle: {
                row: rangeRowCheck.range,
                column: [rangeColCheck.range[1] + 1, chartData[0].length - 1]
            },
            coltitle: {
                row: [rangeRowCheck.range[1] + 1, chartData.length - 1],
                column: rangeColCheck.range
            },
            content: {
                row: [rangeRowCheck.range[1] + 1, chartData.length - 1],
                column: [rangeColCheck.range[1] + 1, chartData[0].length - 1]
            },
            type: 'normal',
        }
    }
    //左、右，没有行标题
    else if (rangeColCheck.exits) {
        //处理"content"：如果列标题的列数等于整个数据的列数，则没有内容
        rangeSplitArray = {
            title: null,
            rowtitle: null,
            coltitle: {
                row: [0, chartData.length - 1],
                column: rangeColCheck.range
            },
            content: {
                row: [0, chartData.length - 1],
                column: [rangeColCheck.range[1] + 1, chartData[0].length - 1]
            },
            type: 'leftright',
        }
    }
    //上、下，没有列标题
    else if (rangeRowCheck.exits) {
        //处理"content"：如果行标题的行数等于整个数据的行数，则没有内容
        rangeSplitArray = {
            title: null,
            rowtitle: {
                row: rangeRowCheck.range,
                column: [0, chartData[0].length - 1]
            },
            coltitle: null,
            content: {
                row: [rangeRowCheck.range[1] + 1, chartData.length - 1],
                column: [0, chartData[0].length - 1]
            },
            type: 'topbottom',
        }
    }
    //无标题，纯数据没有标题
    else {
        rangeSplitArray = {
            title: null,
            rowtitle: null,
            coltitle: null,
            content: {
                row: [0, chartData.length - 1],
                column: [0, chartData[0].length - 1]
            },
            type: 'contentonly',
        }
    }
    // }
    // console.dir(rangeSplitArray)
    return rangeSplitArray
}

//处理qk格式的数据返回原始值，###########需要完善日期获取############。
function getChartCellData(r, c, d) {
    var value = null
    // if (jfgrid != null && jfgrid.getcellvalue != null) {
    //   value = jfgrid.getcellvalue(r, c, d)
    // } else {
    var cell = d[r][c]
    if (cell != null) {
        if (cell.v != null) {
            value = cell.v
        } else {
            value = cell
        }
    }
    // }
    //处理undefined
    if (value == undefined) {
        value = ''
    }
    return value
}

function getChartDataCache(
    chartData,
    rangeSplitArray,
    product,
    type,
    style,
    rangeConfigCheck
) {
    var ret = {}
    if (
        type == 'line' ||
        type == 'column' ||
        type == 'area' ||
        type == 'scatter' ||
        type == 'bar' ||
        type == 'pie' ||
        type == 'radar' ||
        type == 'funnel' ||
        type == 'gauge' ||
        type == 'map'
    ) {
        //转置
        if (rangeConfigCheck) {
            if (rangeSplitArray.type == 'normal') {
                var rangeSA = rangeSplitArray

                //取原数据标签及列标题 用作X轴
                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle != null) {
                    ret.title = {
                        //标题不变
                        text: getChartCellData(
                            rangeSA.title.row[0],
                            rangeSA.title.column[0],
                            chartData
                        )
                    }

                    for (var c = rtitle.column[0]; c <= rtitle.column[1]; c++) {
                        var value = ''
                        for (var r = rtitle.row[0]; r <= rtitle.row[1]; r++) {
                            value += '\n' + getChartCellData(r, c, chartData) //使用X轴处理方式
                        }
                        value = value.substr(1, value.length)
                        if (product == 'highcharts') {
                            value = value.replace(/\n/g, '<br/>')
                        }
                        rtitleData.push(value)
                    }
                    ret.xAxis = rtitleData
                }

                //取x轴以及行标题 用作数据标签
                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle != null) {
                    for (var r = ctitle.row[0]; r <= ctitle.row[1]; r++) {
                        var value = ''
                        for (var c = ctitle.column[0]; c <= ctitle.column[1]; c++) {
                            value += ' ' + getChartCellData(r, c, chartData)
                        }
                        ctitleData.push(value.substr(1, value.length))
                    }
                    ret.label = ctitleData
                }

                //系列series的数据
                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var c = content.column[0]; c <= content.column[1]; c++) {
                        var row = []
                        var i = 0
                        for (var r = content.row[0]; r <= content.row[1]; r++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)
                            //######需要再细化时间、数字、字符的判断#####
                            if (c == content.column[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData
                    //用于在界面上显示系列的格式符号
                    ret.series_tpye = series_tpye
                }
            }
            //左、右，行标题用系列1、系列2、系列3 等样式表示
            else if (rangeSplitArray.type == 'leftright') {
                var rangeSA = rangeSplitArray

                //取x轴以及行标题 用作数据标签
                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle != null) {
                    for (var r = ctitle.row[0]; r <= ctitle.row[1]; r++) {
                        var value = ''
                        for (var c = ctitle.column[0]; c <= ctitle.column[1]; c++) {
                            value += ' ' + getChartCellData(r, c, chartData)
                        }
                        ctitleData.push(value.substr(1, value.length))
                    }
                    ret.label = ctitleData
                }

                //系列series的数据
                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var c = content.column[0]; c <= content.column[1]; c++) {
                        var row = []
                        var i = 0
                        for (var r = content.row[0]; r <= content.row[1]; r++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)
                            //######需要再细化时间、数字、字符的判断#####
                            if (c == content.column[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData
                    //用于在界面上显示系列的格式符号
                    ret.series_tpye = series_tpye
                }

                //取原数据标签及列标题 用作X轴
                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle == null) {
                    ret.title = {
                        //标题不变
                        text: '图表标题' //标题直接使用 "图表标题"
                    }

                    for (var c = 0; c <= content.column[1] - content.column[0]; c++) {
                        rtitleData.push(c + 1) //列标题用1、2、3 表示
                    }
                    ret.xAxis = rtitleData
                }
            }
            //上、下，列标题用1、2、3等样式表示
            else if (rangeSplitArray.type == 'topbottom') {
                var rangeSA = rangeSplitArray

                //取原数据标签及列标题 用作X轴
                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle != null) {
                    ret.title = {
                        //标题不变
                        text: '图表标题' //标题直接使用 "图表标题"
                    }

                    for (var c = rtitle.column[0]; c <= rtitle.column[1]; c++) {
                        var value = ''
                        for (var r = rtitle.row[0]; r <= rtitle.row[1]; r++) {
                            value += '\n' + getChartCellData(r, c, chartData) //使用X轴处理方式
                        }
                        value = value.substr(1, value.length)
                        if (product == 'highcharts') {
                            value = value.replace(/\n/g, '<br/>')
                        }
                        rtitleData.push(value)
                    }
                    ret.xAxis = rtitleData
                }

                //系列series的数据
                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var c = content.column[0]; c <= content.column[1]; c++) {
                        var row = []
                        var i = 0
                        for (var r = content.row[0]; r <= content.row[1]; r++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)
                            //######需要再细化时间、数字、字符的判断#####
                            if (c == content.column[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData
                    //用于在界面上显示系列的格式符号
                    ret.series_tpye = series_tpye
                }

                //取x轴以及行标题 用作数据标签
                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle == null) {
                    for (var r = 0; r <= content.row[1] - content.row[0]; r++) {
                        ctitleData.push('系列' + (r + 1)) //用系列1、系列2、系列3 样式表示
                    }
                    ret.label = ctitleData
                }
            }
            //无标题，行标题用系列1、系列2、系列3样式表示，列标题用1、2、3 样式表示
            else if (rangeSplitArray.type == 'contentonly') {
                var rangeSA = rangeSplitArray

                //系列series的数据
                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var c = content.column[0]; c <= content.column[1]; c++) {
                        var row = []
                        var i = 0
                        for (var r = content.row[0]; r <= content.row[1]; r++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)
                            //######需要再细化时间、数字、字符的判断#####
                            if (c == content.column[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData
                    //用于在界面上显示系列的格式符号
                    ret.series_tpye = series_tpye
                }

                //取原数据标签及列标题 用作X轴
                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle == null) {
                    ret.title = {
                        //标题不变
                        text: '图表标题' //标题直接使用 "图表标题"
                    }

                    for (var c = 0; c <= content.column[1] - content.column[0]; c++) {
                        rtitleData.push(c + 1) //列标题用1、2、3 表示
                    }
                    ret.xAxis = rtitleData
                }

                //取x轴以及行标题 用作数据标签
                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle == null) {
                    for (var r = 0; r <= content.row[1] - content.row[0]; r++) {
                        ctitleData.push('系列' + (r + 1)) //用系列1、系列2、系列3 样式表示
                    }
                    ret.label = ctitleData
                }
            }
        } else {
            //不转置
            if (rangeSplitArray.type == 'normal') {
                var rangeSA = rangeSplitArray
                //数据标签及列标题
                var rtitle = rangeSA.rowtitle,
                    rtitleData = []

                if (rtitle != null) {
                    for (var c = rtitle.column[0]; c <= rtitle.column[1]; c++) {
                        var value = ''
                        for (var r = rtitle.row[0]; r <= rtitle.row[1]; r++) {
                            value += ' ' + getChartCellData(r, c, chartData)
                        }
                        rtitleData.push(value.substr(1, value.length))
                    }
                    ret.label = rtitleData
                }

                //x轴以及行标题
                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle != null) {
                    for (var r = ctitle.row[0]; r <= ctitle.row[1]; r++) {
                        var value = ''
                        for (var c = ctitle.column[0]; c <= ctitle.column[1]; c++) {
                            value += '\n' + getChartCellData(r, c, chartData)
                        }
                        value = value.substr(1, value.length)
                        if (product == 'highcharts') {
                            value = value.replace(/\n/g, '<br/>')
                        }
                        ctitleData.push(value)
                    }
                    // 饼图x轴数据,散点图X轴数据不一样
                    // if (type != 'pie') {
                    ret.xAxis = ctitleData
                    // } else if (type == 'pie') {
                    //   ret.pieName = ctitleData
                    // }
                }

                //系列series的数据
                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var r = content.row[0]; r <= content.row[1]; r++) {
                        var row = []
                        var i = 0
                        for (var c = content.column[0]; c <= content.column[1]; c++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)
                            //######需要再细化时间、数字、字符的判断#####
                            if (r == content.row[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData
                    //用于在界面上显示系列的格式符号
                    ret.series_tpye = series_tpye
                }
            }
            //左、右，行标题用系列1、系列2、系列3 等样式表示
            else if (rangeSplitArray.type == 'leftright') {
                var rangeSA = rangeSplitArray

                //x轴以及行标题
                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle != null) {
                    for (var r = ctitle.row[0]; r <= ctitle.row[1]; r++) {
                        var value = ''
                        for (var c = ctitle.column[0]; c <= ctitle.column[1]; c++) {
                            value += '\n' + getChartCellData(r, c, chartData)
                        }
                        value = value.substr(1, value.length)
                        if (product == 'highcharts') {
                            value = value.replace(/\n/g, '<br/>')
                        }
                        ctitleData.push(value)
                    }
                    ret.xAxis = ctitleData
                }

                //系列series的数据
                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var r = content.row[0]; r <= content.row[1]; r++) {
                        var row = []
                        var i = 0
                        for (var c = content.column[0]; c <= content.column[1]; c++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)
                            //######需要再细化时间、数字、字符的判断#####
                            if (r == content.row[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData
                    //用于在界面上显示系列的格式符号
                    ret.series_tpye = series_tpye
                }

                //数据标签及列标题
                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle == null) {
                    ret.title = {
                        text: '图表标题' //标题直接使用 "图表标题"
                    }

                    for (var c = 0; c <= content.column[1] - content.column[0]; c++) {
                        rtitleData.push('系列' + (c + 1)) //行标题用系列1、系列2、系列3 样式表示
                    }
                    ret.label = rtitleData
                }
            }
            //上、下，列标题用1、2、3等样式表示
            else if (rangeSplitArray.type == 'topbottom') {
                var rangeSA = rangeSplitArray

                //数据标签及列标题
                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle != null) {
                    ret.title = {
                        text: '图表标题' //标题直接使用 "图表标题"
                    }

                    for (var c = rtitle.column[0]; c <= rtitle.column[1]; c++) {
                        var value = ''
                        for (var r = rtitle.row[0]; r <= rtitle.row[1]; r++) {
                            value += ' ' + getChartCellData(r, c, chartData)
                        }
                        rtitleData.push(value.substr(1, value.length))
                    }
                    ret.label = rtitleData
                }

                //系列series的数据
                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var r = content.row[0]; r <= content.row[1]; r++) {
                        var row = []
                        var i = 0
                        for (var c = content.column[0]; c <= content.column[1]; c++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)
                            //######需要再细化时间、数字、字符的判断#####
                            if (r == content.row[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData
                    //用于在界面上显示系列的格式符号
                    ret.series_tpye = series_tpye
                }

                //x轴以及行标题
                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle == null) {
                    for (var r = 0; r <= content.row[1] - content.row[0]; r++) {
                        ctitleData.push(r + 1) //列标题用1、2、3 表示
                    }
                    ret.xAxis = ctitleData
                }
            }
            //无标题，行标题用系列1、系列2、系列3样式表示，列标题用1、2、3 样式表示
            else if (rangeSplitArray.type == 'contentonly') {
                var rangeSA = rangeSplitArray

                //系列series的数据
                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var r = content.row[0]; r <= content.row[1]; r++) {
                        var row = []
                        var i = 0
                        for (var c = content.column[0]; c <= content.column[1]; c++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)
                            //######需要再细化时间、数字、字符的判断#####
                            if (r == content.row[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData
                    //用于在界面上显示系列的格式符号
                    ret.series_tpye = series_tpye
                }

                //数据标签及列标题
                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle == null) {
                    ret.title = {
                        text: '图表标题' //标题直接使用 "图表标题"
                    }

                    for (var c = 0; c <= content.column[1] - content.column[0]; c++) {
                        rtitleData.push('系列' + (c + 1)) //用系列1、系列2、系列3 样式表示
                    }
                    ret.label = rtitleData
                }

                //x轴以及行标题
                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle == null) {
                    for (var r = 0; r <= content.row[1] - content.row[0]; r++) {
                        ctitleData.push(r + 1) //列标题用1、2、3 表示
                    }
                    ret.xAxis = ctitleData
                }
            }
        }
    }

    // if(product=="echarts"){
    // 	if(type=="line" || type=="column" || type=="area" || type=="scatter"){
    // 		ret = {"chart"};
    // 	}
    // }
    // else if(product=="highcharts"){

    // }
    // else if(product=="g2" || product=="g6"){

    // }
    // else if(product=="amcharts"){

    // }
    return ret
}

function getChartDataSeriesOrder(len) {
    var ret = {}
    ret.length = len
    for (var i = 0; i < len; i++) {
        ret[i] = i
    }
    return ret
}

function addDataToOption(
    defaultOptionIni,
    chartDataCache,
    chartDataSeriesOrder,
    chartPro,
    chartType,
    chartStyle,
) {

    if (chartPro == 'echarts' && chartType == 'bar') {
        defaultOptionIni.axis.yAxisLeft.data = chartDataCache.xAxis
        defaultOptionIni.axis.yAxisLeft.type = 'category'
        defaultOptionIni.axis.xAxisDown.type = 'value'
    } else if (
        !!chartDataCache.xAxis &&
        chartStyle != 'polarStack' &&
        !defaultOptionIni.firstShow &&
        (chartType != 'radar' || chartPro == 'highcharts') &&
        chartType != 'pie'
    ) {
        //由于配置可能来自已经让用户配置过的项，所以为了不丢失选项，更新数据的时候需要进行判断。如果是象限数据为空、象限数据与需要更新的数据大小不一致，则全量更新。否则深入到每一项进行更新。以下同
        if (
            defaultOptionIni.axis.xAxisDown.data == null ||
            defaultOptionIni.axis.xAxisDown.data.length == 0 ||
            defaultOptionIni.axis.xAxisDown.data.length != chartDataCache.xAxis.length
        ) {
            defaultOptionIni.axis.xAxisDown.data = chartDataCache.xAxis
            defaultOptionIni.axis.xAxisDown.type = 'category'
            defaultOptionIni.axis.yAxisLeft.type = 'value'
        } else {
            for (var i = 0; i < defaultOptionIni.axis.xAxisDown.data.length; i++) {
                var cell = defaultOptionIni.axis.xAxisDown.data[i]
                if (cell instanceof Object) {
                    cell.value = chartDataCache.xAxis[i]
                } else {
                    defaultOptionIni.axis.xAxisDown.data[i] = chartDataCache.xAxis[i]
                }
            }
        }
    }

    if (
        !!chartDataCache.yAxis &&
        chartStyle != 'polarStack' &&
        !defaultOptionIni.firstShow &&
        (chartType != 'radar' && chartPro == 'echarts')
    ) {
        if (
            defaultOptionIni.axis.yAxisLeft.data == null ||
            defaultOptionIni.axis.yAxisLeft.data.length == 0 ||
            defaultOptionIni.axis.yAxisLeft.data.length != chartDataCache.yAxis
        ) {
            defaultOptionIni.axis.yAxisLeft.data = chartDataCache.yAxis
            defaultOptionIni.axis.yAxisLeft.type = 'category'
            defaultOptionIni.axis.xAxisDown.type = 'value'
        } else {
            for (var i = 0; i < defaultOptionIni.axis.yAxisLeft.data.length; i++) {
                var cell = defaultOptionIni.axis.yAxisLeft.data[i]
                if (cell instanceof Object) {
                    cell.value = chartDataCache.yAxis[i]
                } else {
                    defaultOptionIni.axis.yAxisLeft.data[i] = chartDataCache.yAxis[i]
                }
            }
        }
    }

    if (!!chartDataCache.series) {
        
        // console.dir(chartDataCache)
        var seriesData = dataTranspose(
            dataChangeOrderTwo(chartDataCache.series, chartDataSeriesOrder)
        )

        var legendData = dataChangeOrder(
            chartDataCache.label,
            chartDataSeriesOrder
        )
        defaultOptionIni.legend.data = legendData
        defaultOptionIni.seriesData = seriesData

        // echarts默认所需初始数据格式
        if (chartType == 'pie') {
            defaultOptionIni.legendData = legendData
            defaultOptionIni.legend.data = []
            // 图例data结构改动,变为对象形式
            if (seriesData[0].length == 1) {
                for (var i = 0; i < chartDataCache.label.length; i++) {
                    defaultOptionIni.legend.data.push({
                        name: chartDataCache.label[i],
                        textStyle: { color: null },
                        value: seriesData[i][0]
                    })
                }
            } else {
                for (var i = 0; i < chartDataCache.xAxis.length; i++) {
                    defaultOptionIni.legend.data.push({
                        name: chartDataCache.xAxis[i],
                        textStyle: { color: null },
                        value: seriesData[0][i]
                    })
                }
            }


            defaultOptionIni.series.length = 0
            var seriesObj = {
                name: legendData[0],
                type: 'pie',
                radius: ['0%', '75%'],
                data: [],
                dataLabels: {}
            }
            defaultOptionIni.series1Data = []
            // 如果选一行
            if (seriesData[0].length == 1) {
                for (var i = 0; i < seriesData.length; i++) {
                    defaultOptionIni.minus = []
                    if (seriesData[i].toString().slice(0, 1) == '-') {
                        defaultOptionIni.minus.push(i)
                    }
                    var value, name
                    if (seriesData[i] > 0) {
                        value = seriesData[i][0]
                        name = legendData[i]
                    } else if (seriesData[i] <= 0) {
                        value = ''
                        name = ''
                    }
                    seriesObj.data.push({
                        value: value,
                        name: name,
                        label: {},
                        labelLine: {
                            lineStyle: {}
                        },
                        itemStyle: {}
                    })
                }
                defaultOptionIni.series.push(seriesObj)
            } else {
                // 如果选多行
                // console.dir(seriesData)
                for (var i = 0; i < seriesData.length; i++) {
                    if (i == 0) {
                        for (var j = 0; j < seriesData[0].length; j++) {
                            var value, name
                            if (seriesData[0][j] > 0) {
                                value = seriesData[0][j]
                                name = chartDataCache.xAxis[j]
                            } else if (seriesData[0][j] <= 0) {
                                value = ''
                                name = ''
                            }
                            seriesObj.data.push({
                                value: value,
                                name: name,
                                label: {},
                                labelLine: {
                                    lineStyle: {}
                                },
                                itemStyle: {}
                            })
                        }
                        defaultOptionIni.series.push(seriesObj)
                    }
                    // 如果是环形嵌套图,第二列为数据项
                    if (i == 1) {
                        defaultOptionIni.legend.name1 = defaultOptionIni.legendData[1]
                        for (var a = 0; a < seriesData[1].length; a++) {
                            var value, name
                            if (seriesData[1][a] > 0) {
                                value = seriesData[1][a]
                                name = chartDataCache.xAxis[a]
                            } else if (seriesData[1][a] <= 0) {
                                value = ''
                                name = ''
                            }
                            defaultOptionIni.series1Data.push({
                                value: value,
                                name: name,
                                label: {},
                                labelLine: {
                                    lineStyle: {}
                                },
                                itemStyle: {}
                            })
                        }
                    }
                }
            }


            // console.dir(defaultOptionIni)
        } else {
            if (
                defaultOptionIni.series.length != seriesData.length &&
                chartStyle != 'special'
            ) {
                defaultOptionIni.series = []
            }
            for (var i = 0; i < seriesData.length; i++) {
                if (defaultOptionIni.series[i] == null) {
                    defaultOptionIni.series[i] = {}
                    defaultOptionIni.series[i].data = deepCopy(
                        seriesData[i]
                    )
                    defaultOptionIni.series[i].type = chartType
                    // 如果是echarts,并且是面积图,将type改为line
                    if (chartPro == 'echarts' && chartType == 'area') {
                        defaultOptionIni.series[i].type = 'line'
                    } else if (chartPro == 'echarts' && chartType == 'column') {
                        defaultOptionIni.series[i].type = 'bar'
                    }
                    defaultOptionIni.series[i].name = legendData[i]
                    defaultOptionIni.series[i].markPoint = {}
                    defaultOptionIni.series[i].markPoint.data = []
                    defaultOptionIni.series[i].markLine = {}
                    defaultOptionIni.series[i].markLine.data = []
                    defaultOptionIni.series[i].markArea = {}
                    defaultOptionIni.series[i].markArea.data = []
                } else {
                    if (
                        defaultOptionIni.series[i].data == null ||
                        defaultOptionIni.series[i].data.length == 0 ||
                        defaultOptionIni.series[i].data.length != seriesData[i].length
                    ) {
                        defaultOptionIni.series[i].data = deepCopy(
                            seriesData[i]
                        )
                        defaultOptionIni.series[i].name = legendData[i]
                    } else {
                        for (
                            var a = 0;
                            a < defaultOptionIni.series[i].data.length;
                            a++
                        ) {
                            var cell = defaultOptionIni.series[i].data[a]
                            if (cell instanceof Object) {
                                cell.value = seriesData[i][a]
                            } else {
                                defaultOptionIni.series[i].data[a] = seriesData[i][a]
                            }
                        }
                        defaultOptionIni.series[i].name = legendData[i]
                    }
                }
            }

            if (chartStyle == 'costComposition') {
                if (defaultOptionIni.series.length > 1) {
                    defaultOptionIni.series.splice(
                        1,
                        defaultOptionIni.series.length - 1
                    )
                }
                var sum = 0
                var sum1 = 0
                for (var i = 0; i < defaultOptionIni.series[0].data.length; i++) {
                    sum = sum + Number(defaultOptionIni.series[0].data[i])
                }
                var data2 = []
                for (var j = 0; j < defaultOptionIni.series[0].data.length; j++) {
                    sum1 = sum1 + Number(defaultOptionIni.series[0].data[j])
                    data2.push(sum - sum1)
                }
                data2.unshift(0)
                // defaultOptionIni.series[0].stack = '总量'
                // defaultOptionIni.series[0].type = 'bar'
                var series1obj = deepCopy(defaultOptionIni.series[0])
                series1obj.data.unshift(sum)
                if (series1obj.itemStyle) {
                    delete series1obj.itemStyle
                }
                defaultOptionIni.series.push(series1obj)

                defaultOptionIni.series[0].data = data2
            }
            if (chartPro == 'echarts' && chartType == 'bar') {
                defaultOptionIni.seriesData = seriesData
                // 第一个条形图系列的zindex置顶
                defaultOptionIni.series[0].zlevel = 1
                // 处理组件中的formatter数据
                if (defaultOptionIni.config.option1) {
                    defaultOptionIni.config.option1.data = seriesData
                    // 大屏所需
                    if (seriesData.length > 1) {
                        var speArr = []
                        for (var i = 0; i < seriesData[0].length; i++) {
                            speArr.push((seriesData[0][i] / seriesData[1][i]) * 100)
                        }
                        defaultOptionIni.config.option1.speArr = speArr
                    }
                }

            }

            // 折线柱状图
            if (chartStyle == 'linemix') {
                if (defaultOptionIni.series.length > 1) {
                    for (var j = 0; j < chartData[1].length; j++) {
                        if (
                            chartData[1][j] &&
                            JSON.stringify(chartData[1][j]) != '{}' &&
                            chartData[1][j].ct.fa.slice(-1) == '%'
                        ) {
                            // defaultOption.isPercent = true
                            if (typeof chartData[1][0].v == 'string') {
                                var data = defaultOptionIni.series[j - 1].data
                                // defaultOptionIni.series[j-1].yAxisIndex = 1
                            } else {
                                var data = defaultOptionIni.series[j].data
                                // defaultOptionIni.series[j].yAxisIndex = 1
                            }
                            for (var k = 0; k < data.length; k++) {
                                data[k] *= 100
                            }

                        }
                    }
                }
            }
            // 如果有百分比数据乘以100
            if (
                (chartType == 'bar' || chartType == 'column') &&
                chartStyle != 'special'
            ) {
                for (var j = 0; j < chartData[1].length; j++) {
                    if (
                        chartData[1][j] &&
                        JSON.stringify(chartData[1][j]) != '{}' &&
                        (chartData[1][j].ct.fa.slice(-1) == '%' ||
                            chartData[1][j].m.slice(-1) == '%')
                    ) {
                        // 如果是移动端,并且是tab切换,不执行
                        if (
                            !(window.previewOption && window.previewOption.noChangeData)
                        ) {
                            if (
                                typeof chartData[1][0].v == 'string' ||
                                chartData[1][0].ct.fa == 'yyyy-MM-dd'
                            ) {
                                var data = defaultOptionIni.series[j - 1].data
                            } else {
                                var data = defaultOptionIni.series[j].data
                            }
                            for (var k = 0; k < data.length; k++) {
                                data[k] *= 100
                            }
                        }
                    }
                }
            }
        }

    }

    return defaultOptionIni
}

export {
    deepCopy,
    deepClone,
    generateRandomKey,
    replaceHtml,
    getRowColCheck,
    getRangeSplitArray,
    getChartDataCache,
    getChartDataSeriesOrder,
    addDataToOption
}