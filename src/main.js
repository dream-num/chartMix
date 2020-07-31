import Vue from 'vue'
import App from './App.vue'
import store from './store'

import chartmix from './packages/index'
import './plugins/element.js'
import './plugins/svgicon.js'
import './plugins/spectrum.min.css'
import './plugins/spectrum.min'

window.store = store
// registers your plugins, modules, store
Vue.use(chartmix,{store})
console.dir(chartmix)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')