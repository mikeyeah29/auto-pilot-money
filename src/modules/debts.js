import axios from 'axios';

var baseUrl = 'https://autopilot.rwdstaging.co.uk';

const state = {
	debts: []
};

const getters = {
	
};

const mutations = {
	setDebts(state, debts) {
		state.debts = debts;
	}
};

const actions = {
	getDebts({commit, rootState}) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.get(baseUrl + '/api/debts')
			.then((res) => {
				commit('setDebts', res.data.debts);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
};

export default {
	state,
	getters,
	mutations,
	actions
}