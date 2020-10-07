class Model {

	table = '';
	schema = {};

	_validateData() {
		return true;
	}

	// yep
	_getRecords() {
		var records = localStorage.getItem( this.table );
		if(records) {
			return JSON.parse(records);
		}
		return [];
	}

	// yep
	save(data) {
		if(this._validateData()) {
			var records = this._getRecords();
			data.id = Date.now();
			records.push(data);
			localStorage.setItem( this.table, JSON.stringify(records) );
		}
		return null;
	}

	update(id, data) {
		if(this._validateData()) {
			var records = this._getRecords();
			var index = records.findIndex((r) => { return r.id === id; });
			var updatedRecord = data;
			updatedRecord.id = id;
			records[index] = updatedRecord;
			localStorage.setItem( this.table, JSON.stringify(records) );
			return true;
		}
		return false;
	}

	// yep
	findAll() {
		return this._getRecords();
	}

	find(id) {
		var records = this._getRecords();
		var record = records.find((r) => { return r.id === id; });
		return record;
	}

	remove(id) {
		var records = this._getRecords();
		var index = records.findIndex((r) => { return r.id === id; });
		records.splice(index, 1);
		localStorage.setItem( this.table, JSON.stringify(records) );
	}

	constructor(table, schema) {
		this.table = 'autopilot_' + table;
		this.schema = schema;
	}

}

export default Model;