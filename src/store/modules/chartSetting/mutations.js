import {
    ENABLE_ACTIVE,
    DISABLE_ACTIVE,
    UPDATE_CHART_ITEM,
    IS_UPDATE
} from './mutation-types';
import { setChartOptionsByRouter } from '@/utils/chartUtil';

export default {
    [ENABLE_ACTIVE](state, id) {
        // 1. set active
        state.chartLists[id].active = true;

        // 2. set current chart index
        state.currentChartIndex = id;
    },
    [DISABLE_ACTIVE](state, id) {
        state.chartLists[id].active = false;
    },
    /**
       *根据对象属性的路径, 更新图表子属性的方法
      //自定义一种类型'router',updateObj内部也是采用颗粒更新的模式,防止全部替换chartOptions造成的chartsetting内部组件全局重刷
      params:{
          updateSubObj:{label:{},show:true,...} //子属性新的值
          router:'title/label' //属性路径
      }
      */
    [UPDATE_CHART_ITEM](state,params) {
        //子组件设置更新到chartOptions上后再更新到fabric组件上
        console.info('updateObj', params)
        const { router , updateObj } = params
        const currentChartOptions = state.chartLists[state.currentChartIndex].chartOptions;

        setChartOptionsByRouter(currentChartOptions,router , updateObj); //更新到子对象
    }
};