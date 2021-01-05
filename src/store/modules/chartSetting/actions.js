import types from './mutation-types';

export default {
    setActive({ commit, state }, { id }) {
        for (let i = 0, l = state.chartLists.length; i < l; i++) {
            if (i === id) {
                commit(types.ENABLE_ACTIVE, i);
                continue;
            }

            commit(types.DISABLE_ACTIVE, i);
        }
    },
    unsetActive({ commit }, { id }) {
        commit(types.DISABLE_ACTIVE, id);
    },
    updateChartItem({ commit }, updateObj) {
        commit(types.UPDATE_CHART_ITEM, updateObj);
    },
    updateChartItemChartlist({ commit }, params) {
        commit(types.UPDATE_CHART_ITEM_CHARTLIST, params)
    },
    updateChartItemOne({ commit }, item) {
        commit(types.UPDATE_CHART_ITEM_ONE, item)
    },
    updateChartItemChartlistOne({ commit }, params) {
        commit(types.UPDATE_CHART_ITEM_CHARTLIST_ONE, params)
    },
    updateProp({ commit }, params) {
        commit(types.UPDATE_PROP, params)
    },
    updateRenderView({ commit }, params) {
        commit(types.UPDATE_RENDER_VIEW, params)
    },
    updateCurrentProp({ commit }, params) {
        commit(types.UPDATE_CURRENT_PROP, params)
    },
    addProp({ commit }, params) {
        commit(types.ADD_PROP, params)
    },
    updateChartType({ commit }, params) {
        commit(types.UPDATE_CHART_TYPE, params)
    }
};