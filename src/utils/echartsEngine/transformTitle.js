import { transTextStyle } from '@/utils/chartUtil'
/**
 * echarts title transform
 * 
 */
const transformTitle = function (chartAllTypeArray, title, subtitle) {
    const chartPro = chartAllTypeArray[0];
    const chartType = chartAllTypeArray[1];
    const chartStyle = chartAllTypeArray[2];

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

    // title.show
    resultTitle.show = title.show;

    // title.text
    resultTitle.text = title.text;
    resultTitle.subtext = subtitle.text

    // textstyle
    transTextStyle(title , resultTitle , 'textStyle' , 'text')
    transTextStyle(subtitle , resultTitle , 'subtextStyle' , 'subtext')

    // title.position
    if (title.position.value === 'custom') {
        resultTitle.left = title.position.offsetX + '%'
        resultTitle.top = title.position.offsetY + '%'
    } else {
        resultTitle.left = title.position.value.split('-')[0]
        resultTitle.top = title.position.value.split('-')[1]
    }

    // title.itemgap
    let actions = new Map([
        ['auto' , 10],
        ['far' , 30],
        ['close' , 5],
        ['normal' , 20],
        ['custom' , subtitle.distance.cusGap]
    ])
    resultTitle.itemGap = actions.get(subtitle.distance.value)

    return resultTitle
}

export default transformTitle