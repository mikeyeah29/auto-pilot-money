<template>
	<div>
		<div class="container">

			<div class="d-flex justify-content-between h1_box">
				<h1>Cash Flow</h1>
			</div>

			<div class="mb-2 tabs">
				<div class="d-flex">
					<span class="mr-3 tab" :class="{ 'is-active': isActive('In') }" @click="currentTable = 'In'">In's</span>
					<span class="tab" :class="{ 'is-active': isActive('Out') }" @click="currentTable = 'Out'">Out's</span>
				</div>
				<div class="tabs__rule"></div>
			</div>

			<Totals :ins="totalIn" :outs="totalOut" :extra="extra" />

			<BudgetTable :lineItems="ins"
					table="In"
					v-show="currentTable === 'In' ? true : false"
					@removeItem="removeLineItem($event, 'In')"
					@updateItem="updateLineItem($event)" />

			<BudgetTable :lineItems="outs"
					table="Out"
					v-show="currentTable === 'Out' ? true : false"
					@removeItem="removeLineItem($event, 'Out')"
					@updateItem="updateLineItem($event)" />

		</div>

		<div class="floating-action-button action-add" 
		@click="addModalIsOpen = true">+</div>

		<FormModal :is_open="addModalIsOpen" @close="addModalIsOpen = false">

			<h2>Add {{ currentTable }}</h2>

			<div class="form-group">
				<label>Name</label>
				<input type="text" v-model="addLineItemForm.name" />
			</div>

			<div class="d-flex">

				<div class="form-group flex-1 mr-2">
					<label>Day of the month</label>
					<input type="number" min="1" max="31" v-model="addLineItemForm.date" />
				</div>

				<div class="form-group flex-1 ml-2">
					<label>Amount</label>
					<input type="number" v-model="addLineItemForm.amount" />
				</div>

			</div>

			<button class="button" @click="addLineItem()">ADD LINE ITEM</button>

		</FormModal>
	</div>
</template>

<script>

	import FormModal from '../components/FormModal.vue';
	import BudgetTable from '../components/BudgetTable.vue';
	import Totals from '../components/Totals';
	
	export default {
		name: 'CashFlow',
		components: {
			BudgetTable,
			Totals,
			FormModal
		},
		data() {
			return {
				currentTable: 'In',
				lineItems: [],
				ins: [],
				outs: [],
				addModalIsOpen: false,
				addLineItemForm: {
					name: '',
					date: 1,
					amount: 0
				}
			};
		},
		methods: {
			isActive(name) {
				if(this.currentTable === name) {
					return true;
				}
				return false;
			},
			refresh() {
				this.ins = this.$db['In'].findAll();
				this.outs = this.$db['Out'].findAll();
				this.lineItems = this.outs;
			},
			resetForm() {
				this.addLineItemForm.name = '';
				this.addLineItemForm.date = '';
				this.addLineItemForm.amount = '';
			},
			addLineItem() {
				this.$db[this.currentTable].save({
					name: this.addLineItemForm.name,
					dayOfMonth: this.addLineItemForm.date,
					amount: this.addLineItemForm.amount
				});
				this.refresh();
				this.addModalIsOpen = false;
				this.resetForm();
			},
			removeLineItem(id, table) {
				this.$db[table].remove(id);
				this.refresh();
			},
			updateLineItem(e) {
				this.$db[this.currentTable].update(e.id, e.data);
				this.refresh();
			},
			changeTable(table) {
				this.currentTable = table;
			}
		},
		computed: {
			totalIn() {
				var amount = 0;
				for(var i=0;i<this.ins.length;i++) {
					amount += Number(this.ins[i].amount);
				}
				return amount;
			},
			totalOut() {
				var amount = 0;
				for(var i=0;i<this.outs.length;i++) {
					amount += Number(this.outs[i].amount);
				}
				return amount;
			},
			extra() {
				return this.totalIn - this.totalOut;
			}
		},
		mounted() {
			this.refresh();
			console.log( this.outs );
		}
	}

</script>

<style>
	
	.tab {
		width: 50%;
		text-align: center;
		padding: 5px 0px;
	}

	.tab.is-active {
		color: azure;
		border-bottom: solid 2px #fff;
		font-weight: bold;
	}

	.tabs__rule {
		width: 100%;
		height: 2px;
		background: #000;
		margin-top: -2px;
	}

</style>