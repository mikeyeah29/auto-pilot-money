import Model from '../model.js';

class Budget extends Model {

	getTotalRemaing() {
		var budgets = this.findAll();
		var remaining = 0;
		for(var i=0;i<budgets.length;i++) {
			remaining += (budgets[i].allowance - budgets[i].spent);
		}
		return remaining;
	}

	constructor() {
		super('budget', {
			name: '',
			allowance: 0,
			spent: 0
		});
	}

}

export default new Budget();