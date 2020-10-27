import axios from 'axios';

var baseUrl = 'https://autopilot.rwdstaging.co.uk';

const state = {
	ins: [],
	outs: []
};

const getters = {
	totalIns(state) {
		var total = 0;
		for(var i=0;i<state.ins.length;i++) {
			total += Number(state.ins[i].amount);
		}
		return total;
	},
	totalOuts(state) {
		var total = 0;
		for(var i=0;i<state.outs.length;i++) {
			total += Number(state.outs[i].amount);	
		}
		return total;
	},
	extra(state, getters) {

		console.log('efefe');

		return Number(getters.totalIns) - Number(getters.totalOuts);
	},
	findTransaction(state) {
		return function(id, direction) {
			if(direction === 'In') {
				return state.ins.find((t) => {
					return t.id === id;
				});
			}else{
				return state.outs.find((t) => {
					return t.id === id;
				});
			}
		}
	}
};

const mutations = {
	setIns(state, ins) {
		state.ins = ins;
	},
	setOuts(state, outs) {
		state.outs = outs;
	}
};

const actions = {
	getIns({commit, rootState}) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.get(baseUrl + '/api/transactions/ins')
			.then((res) => {
				commit('setIns', res.data.ins);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	getOuts({commit, rootState}) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.get(baseUrl + '/api/transactions/outs')
			.then((res) => {
				commit('setOuts', res.data.outs);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	addTransaction({commit, rootState, dispatch}, transaction) {
		commit('setLoading', true);
		commit('setSuccess', '');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(baseUrl + '/api/transactions', transaction)
			.then((res) => {
				if(transaction.direction === 'in') {
					dispatch('getIns');
				}else{
					dispatch('getOuts');
				}
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
	updateTransaction({commit, rootState, dispatch}, data) {
		commit('setLoading', true);
		commit('setSuccess', '');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(baseUrl + '/api/transactions/' + data.id, data)
			.then((res) => {
				if(data.direction === 'in') {
					dispatch('getIns');
				}else{
					dispatch('getOuts');
				}
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
	removeTransaction({commit, rootState, dispatch}, data) {
		commit('setLoading', true);
		commit('setSuccess', '');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.delete(baseUrl + '/api/transactions/' + data.id)
			.then((res) => {
				if(data.direction === 'in') {
					dispatch('getIns');
				}else{
					dispatch('getOuts');
				}
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