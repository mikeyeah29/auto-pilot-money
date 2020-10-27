import axios from 'axios';

var baseUrl = 'https://autopilot.rwdstaging.co.uk';

const state = {
	budgets: []
};

const getters = {
	budgeted(state) {
		var amount = 0;
		for(var i=0;i<state.budgets.length;i++) {
			amount += state.budgets[i].allowance;
		}
		return amount;
	},
	unspentFromBudgets(state) {
		var budgets = state.budgets;
		var remaining = 0;
		for(var i=0;i<budgets.length;i++) {
			remaining += (budgets[i].allowance - budgets[i].spent);
		}
		return remaining;
	}
};

const mutations = {
	setBudgets(state, budgets) {
		state.budgets = budgets;
	},
};

const actions = {
	getBudgets({commit, rootState}) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.get(baseUrl + '/api/budgets')
			.then((res) => {
				commit('setBudgets', res.data.budgets);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});

	},
	addBudgetItem({commit, rootState, dispatch}, budget) {
		commit('setLoading', true);
		commit('setSuccess', '');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(baseUrl + '/api/budgets', budget)
			.then((res) => {
				dispatch('getBudgets');
				commit('setSuccess', res.data.message);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	removeBudgetItem({commit, rootState, dispatch}, id) {
		commit('setLoading', true);
		commit('setSuccess', '');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.delete(baseUrl + '/api/budgets/' + id)
			.then((res) => {
				console.log(res.data);
				dispatch('getBudgets');
				commit('setSuccess', res.data.message);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	updateBudgetItem({commit, rootState, dispatch}, data) {
		commit('setLoading', true);
		commit('setSuccess', '');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(baseUrl + '/api/budgets/' + data.id, data)
			.then((res) => {
				dispatch('getBudgets');
				commit('setSuccess', res.data.message);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	spendBudgetItem({commit, rootState, dispatch}, data) {
		commit('setLoading', true);
		commit('setSuccess', '');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(baseUrl + '/api/budgets/' + data.id + '/spend', data)
			.then((res) => {
				dispatch('getBudgets');
				commit('setSuccess', res.data.message);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	resetBudgetItem({commit, rootState, dispatch}, id) {
		commit('setLoading', true);
		commit('setSuccess', '');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(baseUrl + '/api/budgets/' + id + '/reset', {})
			.then((res) => {
				dispatch('getBudgets');
				commit('setSuccess', res.data.message);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}