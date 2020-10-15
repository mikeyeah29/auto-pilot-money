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

	spentFromBudgets() {
		var budgets = this.findAll();
		var spent = 0;
		for(var i=0;i<budgets.length;i++) {
			spent += Number(budgets[i].spent);
		}
		return spent;
	}

	totalAllowance() {
		var budgets = this.findAll();
		var budgeted = 0;
		for(var i=0;i<budgets.length;i++) {
			budgeted += Number(budgets[i].allowance);
		}
		return budgeted;
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