import Vue from 'vue'
import Vuex from 'vuex'
import rect from './modules/rect'
import chartRender from './modules/chartRender'
import chartSetting from './modules/chartSetting'

Vue.use(Vuex)

const store = new Vuex.Store()

export { store }



const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    /**
     * Assign the modules to the store
     */
    modules: {
        'rect':  rect,
        'chartRender': chartRender,
        'chartSetting': chartSetting
    },

    /**
     * If strict mode should be enabled
     */
    strict: debug
});
