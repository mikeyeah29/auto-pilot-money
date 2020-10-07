import Model from '../model.js';

class Out extends Model {

	total() {
		var amount = 0;
		var outs = this.findAll();
		for(var i=0;i<outs.length;i++) {
			amount += Number(outs[i].amount);
		}
		return amount;
	}

	paid() {
		
		var today = new Date();
		var dd = today.getDate();

		var outs = this.findAll();

		var paidOuts = outs.filter(o => Number(o.dayOfMonth) < dd);

		var paid = 0;

		for(var i=0;i<paidOuts.length;i++) {
			paid += Number(paidOuts[i].amount);
		}

		return paid;
	}

	constructor() {
		super('outs', {
			name: '',
			dayOfMonth: 1,
			amount: 1
		});
	}

}

export default new Out();