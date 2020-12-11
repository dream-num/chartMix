/**
 * legend转换
 */
import { transTextStyle } from '@/utils/chartUtil'
const transformLegend = function(chartAllTypeArray , legend){
    let resLegend = {
        show: true,
        textStyle: {
            color: '#333',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12
        },
        left: 'auto',
        top: 'auto',
        orient: 'horizontal',
        itemWidth: 25,
        itemGap: 10
    }
    // legend.show
    resLegend.show = legend.show
    // legend.textStyle
    transTextStyle(legend , resLegend , 'textStyle')
    // legend.position
    if (legend.position.value === 'custom') {
        resLegend.left = legend.position.offsetX 
        resLegend.top = legend.position.offsetY 
    } else {
        resLegend.left = legend.position.value.split('-')[0]
        resLegend.top = legend.position.value.split('-')[1]
    }
    // legend.orient
    resLegend.orient = legend.position.direction
    // legend.itemWidth
    let width = new Map([
        ['auto' , 25],
        ['big' , 45],
        ['medium' , 18],
        ['small' , 10],
        ['custom' , legend.width.cusSize]
    ])
    let height = new Map([
        ['auto' , 14],
        ['big' , 30],
        ['medium' , 20],
        ['small' , 10],
        ['custom' , legend.height.cusSize]
    ])
    resLegend.itemWidth = width.get(legend.width.value)
    resLegend.itemHeight = height.get(legend.height.value)
    // legend.itemGap
    let distance = new Map([
        ['auto' , 10],
        ['far' , 20],
        ['near' , 5],
        ['general' , 15],
        ['custom' , legend.distance.cusGap]
    ])
    resLegend.itemGap = distance.get(legend.distance.value) 

    return resLegend
}

export default transformLegend