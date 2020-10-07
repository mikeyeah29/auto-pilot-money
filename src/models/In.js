import Model from '../model.js';

class In extends Model {

	total() {
		var amount = 0;
		var ins = this.findAll();
		for(var i=0;i<ins.length;i++) {
			amount += Number(ins[i].amount);
		}
		return amount;
	}

	constructor() {
		super('ins', {
			name: '',
			dayOfMonth: 1,
			amount: 1
		});
	}

}

export default new In();