export default {
    getActive: state => {
        for (let i = 0, l = state.chartLists.length; i < l; i++) {
            let chartList = state.chartLists[i];

            if (chartList.active) {
                return i;
            }
        }
        return null;
    }
}