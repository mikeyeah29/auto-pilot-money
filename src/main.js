import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
	faEdit, 
	faTrashAlt, 
	faReceipt,
	faInfoCircle,
	faRedoAlt,
	faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Model from './model.js'

// pages
import Dashboard from './pages/Dashboard'
import CashFlow from './pages/CashFlow'
import Budgets from './pages/Budgets/Budgets'
import Debts from './pages/Debts'

library.add(faEdit);
library.add(faTrashAlt);
library.add(faReceipt);
library.add(faInfoCircle);
library.add(faRedoAlt);
library.add(faMoneyBillWave);

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
			component: Dashboard
		},
		{
			path: '/cashflow',
			component: CashFlow
		},
		{
			path: '/budgets',
			component: Budgets
		},
		{
			path: '/debts',
			component: Debts
		}
	]
});

new Vue({
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




