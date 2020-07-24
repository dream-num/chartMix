// import single vue component
import ChartSetting from './ChartMix/ChartSetting.vue'
import chartSetting from '../store/modules/chartSetting'
import ChartRender from './ChartMix/ChartRender.vue'
import { initChart , createChart , highlightChart } from '../utils/exportUtil'

// all components
const components = [
    ChartSetting,
    ChartRender
]

/**
 * define install function
 *
 * @param {Object} Vue 
 * @param {Object} [options={}] 
 */
const install = function (Vue, options = {}) {
    if (!install.componentInstalled) {
        // map and register all global components
        components.map(component => {
            Vue.component(component.name, component)
        })

        install.componentInstalled = true
    }

    if (!install.storeRegistered) {
        // register store
        if (!options.store) {
            console.log('Please provide a store!!')
        } else {
            options.store.registerModule('chartSetting', chartSetting)

            install.storeRegistered = true;
        }
    }

}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // must use install function
    install,
    // components list
    ...components,
    initChart,
    createChart,
    highlightChart
    // ChartSetting,
    // ChartRender
}