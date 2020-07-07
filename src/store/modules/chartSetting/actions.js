import types from './mutation-types';

export default {
    setActive({commit, state}, {id}) {
        for (let i = 0, l = state.chartLists.length; i < l; i++) {
            if (i === id) {
                commit(types.ENABLE_ACTIVE, i);
                continue;
            }

            commit(types.DISABLE_ACTIVE, i);
        }
    },
    unsetActive({commit}, {id}) {
        commit(types.DISABLE_ACTIVE, id);
    },
    updateChartItem({commit}, updateObj) {
        commit(types.UPDATE_CHART_ITEM, updateObj);
    }
};