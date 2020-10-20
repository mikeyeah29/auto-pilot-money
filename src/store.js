import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

var baseUrl = 'http://autopilot.rwdstaging.co.uk';

export default new Vuex.Store({
	state: {
		errors: [],
		loading: false,
		token: localStorage.getItem('token') || '',
		startDay: 25,
		ins: [],
		outs: [],
		budgets: [],
		debts: []
	},
	mutations: {
		auth(state, token) {
			state.token = token;
		},
		logout(state) {
			localStorage.clear('token');
			state.token = '';
		},
		setBudgets(state, budgets) {
			state.budgets = budgets;
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
		setError(state, eData) {

			var errs = [];

			if(eData.errors) {
				for (const [key, value] of Object.entries(eData.errors)) {
					console.log(key);
					errs.push(value[0]);
				}
			}

			if(errs.length > 0) {
				state.errors = errs;				
			}else{
				if(eData.message) {
					state.errors = [eData.message];
				}
			}

		}
	},
	actions: {
		login({commit}, loginData) {

			commit('setLoading', true);
			commit('setError', []);

			return new Promise((resolve) => {

				axios.post(baseUrl + '/api/auth/login', loginData)
					.then((res) => {
						var token = res.data.access_token;
						localStorage.setItem('token', token);
						axios.defaults.headers.common['Authorization'] = token;
						commit('auth', token);
						commit('setLoading', false);
						resolve();
					})
					.catch((e) => {
						console.log(e);
						var eData = e.response.data;
						commit('setError', eData);
						commit('setLoading', false);
					});

			});

		}
	},
	getters: {
		isLoggedIn(state) {
			return !!state.token;
		}
		// isAuthenticated() {
		// 	return !!localStorage.getItem('token');
		// }
	}
});

