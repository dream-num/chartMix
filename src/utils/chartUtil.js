import echartsEngine from '@/utils/echartsEngine/index'
// import highchartsEngine from './highchartsEngine'
const echarts = require('echarts');


/**
 * update main object's subject attribute by router
 * @param {Object} chartOptions main object
 * @param {String} router router
 * @param {Object} updateObj subject attribute
 */
const setChartOptionsByRouter = function (chartOptions, router, updateObj) {
    if (chartOptions == undefined || router == undefined) {
        return chartOptions;
    }

    let routerArray = router.split('/');
    const defaultOption = chartOptions.defaultOption;

    //递归获取内部属性
    function deepFind(curObj) {
        if (routerArray.length != 0) {
            return deepFind(curObj[routerArray.shift()])
        } else {
            Object.assign(curObj, updateObj)
            return curObj
        }

    }
    deepFind(defaultOption);
    return chartOptions;
}

/**
 * 渲染图表的方法,拿到store的配置json(对应于chartJson中的数据格式,可能是初始化图表的数据,也可能是后台传输来的特定配置的数据),执行转换引擎后,渲染到图表插件中,独立于vue组件.可用于编辑器和预览端
 * 
 */
const renderChart = function (renderChartObj, ele) {
    const { chart_id, chartOptions } = renderChartObj;
    const chartAllTypeArray = chartOptions.chartAllType.split('|');
    const chartPro = chartAllTypeArray[0];
    const container = ele || document.getElementById(chart_id);

    if (chartPro === 'echarts') {
        const options = echartsEngine(chartOptions);

        let chart = echarts.getInstanceByDom(container);
        if (chart == null) {
            chart = echarts.init(container)
        }

        chart.setOption(options, true);

        setTimeout(() => {
            echarts.getInstanceById(container.getAttribute('_echarts_instance_')).resize();
        }, 0);
    }
}

/**
 * textStyle转化
 */
const transTextStyle = function(origin , result , attr , attr1){
    // fontGroup
    let fontGroupList = ['bold', 'vertical', 'italic'];
    origin.label.fontGroup.forEach(element => {
        if (fontGroupList.includes(element)) {
            switch (element) {
                case 'bold':
                    result[attr].fontWeight = element;
                    break;
                case 'vertical':
                    // TODO: '标题01'
                    result[attr1] = origin.text.replace(/\B/g, '\n');
                    break;
                case 'italic':
                    result[attr].fontStyle = element;
                    break;
            }
        }
    });
    // fontColor
    result[attr].color = origin.label.color
    // fontSize
    result[attr].fontSize = transCustom(origin.label.fontSize , origin.label.cusFontSize)
}

// 解决精度
const floatTool = function() {
    
    /*
     * 判断obj是否为一个整数
     */
    function isInteger(obj) {
        return Math.floor(obj) === obj;
    }
    
    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    function toInteger(floatNum) {
        var ret = {times: 1, num: 0};

        if (isInteger(floatNum)) {
            ret.num = floatNum;
            return ret;
        }

        var strfi  = floatNum + '';
        var dotPos = strfi.indexOf('.');
        var len    = strfi.substr(dotPos + 1).length;
        var times  = Math.pow(10, len);
        var intNum = parseInt(floatNum * times + 0.5, 10);

        ret.times  = times;
        ret.num    = intNum;

        return ret;
    }
    
    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, op) {
        var o1 = toInteger(a);
        var o2 = toInteger(b);
        var n1 = o1.num;
        var n2 = o2.num;
        var t1 = o1.times;
        var t2 = o2.times;
        var max = t1 > t2 ? t1 : t2;
        var result = null;

        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2;
                } 
                else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2);
                } 
                else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2;
                }

                return result / max;
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2;
                } 
                else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2);
                } 
                else {
                    result = n1 * (t2 / t1) - n2;
                }

                return result / max;
            case 'multiply':
                result = (n1 * n2) / (t1 * t2);
                
                return result;
            case 'divide':
                return result = function() {
                    var r1 = n1 / n2;
                    var r2 = t2 / t1;
                    return operation(r1, r2, 'multiply');
                }();
        }
    }
    
    // 加减乘除的四个接口
    function add(a, b) {
        return operation(a, b, 'add');
    }
    function subtract(a, b) {
        return operation(a, b, 'subtract');
    }
    function multiply(a, b) {
        return operation(a, b, 'multiply');
    }
    function divide(a, b) {
        return operation(a, b, 'divide');
    }
    
    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    };
}();

/**
 * lineStyle转化
 */
const transLineStyle = function (width , color , type='solid'){
    return {
        width,
        color,
        type 
    }
}

/**
 自定义* custom数据
 */
const transCustom = function (a , b){
    if(a != 'custom'){
        return a
    }else{
        return b
    }
}


export {
    setChartOptionsByRouter,
    renderChart,
    transTextStyle,
    floatTool,
    transLineStyle,
    transCustom
}