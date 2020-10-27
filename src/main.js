import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
	faTachometerAlt,
	faEdit, 
	faTrashAlt, 
	faReceipt,
	faInfoCircle,
	faRedoAlt,
	faMoneyBillWave,
	faSignOutAlt,
	faCreditCard
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Model from './model.js'

// pages
import Dashboard from './pages/Dashboard'
import CashFlow from './pages/CashFlow'
import Budgets from './pages/Budgets/Budgets'
import Debts from './pages/Debts'
import Login from './pages/Login'

library.add(faTachometerAlt);
library.add(faEdit);
library.add(faTrashAlt);
library.add(faReceipt);
library.add(faInfoCircle);
library.add(faRedoAlt);
library.add(faMoneyBillWave);
library.add(faSignOutAlt);
library.add(faCreditCard);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueRouter);
Vue.config.productionTip = false

Vue.prototype.$db = {};

Vue.prototype.$db.Out = new Model('outs', {
	name: '',
	dayOfMonth: 1,
	amount: 1
});

Vue.prototype.$db.In = new Model('ins', {
	name: '',
	dayOfMonth: 1,
	amount: 1
});

Vue.prototype.$db.Debt = new Model('debt', {
	name: '',
	amount: 0
});

Vue.prototype.$db.Settings = new Model('settings', {
	monthStartDate: 25
});

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: Dashboard,
			meta: {
				allowAnonymous: false
			}
		},
		{
			path: '/cashflow',
			component: CashFlow,
			meta: {
				allowAnonymous: false
			}
		},
		{
			path: '/budgets',
			component: Budgets,
			meta: {
				allowAnonymous: false
			}
		},
		{
			path: '/debts',
			component: Debts,
			meta: {
				allowAnonymous: false
			}
		},
		{
			path: '/login',
			component: Login,
			meta: {
				allowAnonymous: true,
				loggedOut: true
			}
		}
	]
});

router.beforeEach((to, from, next) => {

	store.commit('setError', null);
	store.commit('setSuccess', '');

	if(to.meta.loggedOut && store.getters.isLoggedIn) {
		next({
			path: '/',
			query: { redirect: to.fullPath }
		});
	}
	// not allowed for anyone && user isnt logged in
	if (!to.meta.allowAnonymous && !store.getters.isLoggedIn) {
		next({
			path: '/login',
			query: { redirect: to.fullPath }
		});
	}
	else {
		next();
	}  
});

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')

if('serviceWorker' in navigator) {
	// register service worker
	navigator.serviceWorker.register('/sw.js').then((result) => {
		console.log('Service worker registered');
		console.log('Scope: ' + result.scope);
	}, function(error) {
		console.log('Service worker registation failed');
		console.log(error);
	});
}else{
	console.log('Service workers not supported');
}




