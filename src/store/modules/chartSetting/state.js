import { merge, cloneDeep } from 'lodash';
import { chartOptions } from '@/data/chartJson';
export default {
     // store all chart objects
     chartLists:[
        {
            'chart_id': 'chart_a_001',
            'active': false,
            'chartOptions': merge(cloneDeep(chartOptions),{defaultOption:{title:{text:'默认标题'}}})
        },
        {
            'chart_id': 'chart_a_002',
            'active': false,
            'chartOptions': merge(cloneDeep(chartOptions),{defaultOption:{title:{text:'默认标题'}}})
        },
        {
            'chart_id': 'chart_a_003',
            'active': false,
            'chartOptions': merge(cloneDeep(chartOptions),{defaultOption:{title:{text:'默认标题'}}})
        },
    ],
    // store current chart index
    currentChartIndex: null,
    // current chart objects, bind to chartSetting component
    // currentChart: {},
};