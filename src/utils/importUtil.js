// 复用的组件和方法(development)
const ChartBaseLabel = () => import('@/packages/ChartMix/chartChips/base/ChartBaseLabel')
const ChartBaseSwitch = () => import('@/packages/ChartMix/chartChips/base/ChartBaseSwitch')
const ChartBaseInput = () => import('@/packages/ChartMix/chartChips/base/ChartBaseInput')
const ChartBaseSelect = () => import('@/packages/ChartMix/chartChips/base/ChartBaseSelect')
const ChartBaseSlider = () => import('@/packages/ChartMix/chartChips/base/ChartBaseSlider')
const ChartBaseBox = () => import('@/packages/ChartMix/chartChips/base/ChartBaseBox')
const ChartBaseRadio = () => import('@/packages/ChartMix/chartChips/base/ChartBaseRadio')

import { mapActions, mapState } from 'vuex'
import { deepCopy } from '@/utils/util'
import isEqual from 'lodash/isEqual'
// import { isEqual } from 'lodash'

// product
// import ChartBaseLabel from '@/packages/ChartMix/chartChips/base/ChartBaseLabel'
// import ChartBaseSwitch from '@/packages/ChartMix/chartChips/base/ChartBaseSwitch'
// import ChartBaseInput from '@/packages/ChartMix/chartChips/base/ChartBaseInput'
// import ChartBaseSelect from '@/packages/ChartMix/chartChips/base/ChartBaseSelect'
// import ChartBaseSlider from '@/packages/ChartMix/chartChips/base/ChartBaseSlider'
// import ChartBaseBox from '@/packages/ChartMix/chartChips/base/ChartBaseBox'
// import ChartBaseRadio from '@/packages/ChartMix/chartChips/base/ChartBaseRadio'


// 重复引入的组件
const importComp = function(t){
    return {
        'chart-base-label': t.ChartBaseLabel,
        'chart-base-input': t.ChartBaseInput,
        'chart-base-switch': t.ChartBaseSwitch,
        'chart-base-slider': t.ChartBaseSlider,
        'chart-base-select': t.ChartBaseSelect,
        'chart-base-radio': t.ChartBaseRadio,
        'chart-base-box': t.ChartBaseBox
    }
}

export {
    ChartBaseLabel,
    ChartBaseSwitch,
    ChartBaseInput,
    ChartBaseSelect,
    ChartBaseSlider,
    ChartBaseBox,
    ChartBaseRadio,
    deepCopy,
    isEqual,
    importComp,
    mapActions,
    mapState
}