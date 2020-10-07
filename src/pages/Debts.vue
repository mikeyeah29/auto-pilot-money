<template>
	<div class="container">

		<div class="d-flex justify-content-between h1_box">
			<h1>Debt Total: £{{ totalDebt }}</h1>
		</div>

		<table v-if="this.debts.length > 0">
			<thead>
				<tr>
					<th>Name</th>
					<th>Amount</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="debt in debts" :key="debt.id">
					<td class="truncate">{{ debt.name }}</td>
					<td>£{{ debt.amount }}</td>
					<td class="text-right">
						<span class="ml-2 icon_btn">
							<font-awesome-icon icon="money-bill-wave" @click="openPay(debt)" />
						</span>
						<span class="ml-2 icon_btn">
							<font-awesome-icon icon="edit" @click="openEdit(debt)" />
						</span>
						<span class="ml-2 icon_btn bg-red">
							<font-awesome-icon icon="trash-alt" @click="openRemove(debt.id)" />
						</span>
					</td>
				</tr>
			</tbody>
		</table>

		<div v-else>
			<p>WooHoo! Debt Free!</p>
		</div>

		<ConfirmModal :is_open="remove_open"
					@confirmed="removeDebt()"
					@close="remove_open = false;" />

		<FormModal :is_open="add_open" @close="add_open = false">
			<h2>Add Debt</h2>
			<div class="form-group">
				<label>Name</label>
				<input type="text" v-model="debt_form.name" />
			</div>
			<div class="form-group">
				<label>Amount</label>
				<input type="text" v-model="debt_form.amount" />
			</div>
			<button class="button" @click="addDebt()">Save</button>
		</FormModal>

		<FormModal :is_open="edit_open" @close="edit_open = false">
			<h2>Edit Debt</h2>
			<div class="form-group">
				<label>Name</label>
				<input type="text" v-model="edit_form.name" />
			</div>
			<div class="form-group">
				<label>Amount</label>
				<input type="text" v-model="edit_form.amount" />
			</div>
			<button class="button" @click="updateDebt()">Save</button>
		</FormModal>

		<FormModal :is_open="pay_open" @close="pay_open = false">
			<h2>Pay Debt</h2>
			<div class="form-group">
				<label>Amount</label>
				<input type="text" v-model="pay_form.amount" />
			</div>
			<button class="button" @click="pay()">Pay</button>
		</FormModal>

		<div class="floating-action-button action-add" 
		@click="add_open = true">+</div>

	</div>
</template>

<script>
	
	import ConfirmModal from '../components/ConfirmModal.vue';
	import FormModal from '../components/FormModal.vue';

	export default {
		name: 'Debts',
		components: {
			ConfirmModal,
			FormModal
		},
		data() {
			return {
				add_open: false,
				edit_open: false,
				pay_open: false,
				remove_open: false,
				debts: [],
				current_debt: null,
				debt_form: {
					name: '',
					amount: ''
				},
				edit_form: {
					id: null,
					name: '',
					amount: ''
				},
				remove_form: { 
					id: null 
				},
				pay_form: {
					amount: ''
				}
			}
		},
		computed: {
			totalDebt() {
				var total = 0;
				for(var i=0;i<this.debts.length;i++) {
					total += Number(this.debts[i].amount);
				}
				return total;
			}
		},
		methods: {
			refresh() {
				this.debts = this.$db.Debt.findAll();
			},
			openEdit(debt) {
				this.edit_form = debt;
				this.edit_open = true;
			},
			openRemove(id) {
				this.remove_form.id = id;
				this.remove_open = true;
			},
			openPay(debt) {
				this.current_debt = debt;
				this.pay_open = true;
			},
			addDebt() {
				this.$db.Debt.save({
					name: this.debt_form.name,
					amount: this.debt_form.amount
				});
				this.refresh();
				this.add_open = false;
				this.debt_form.name = '';
				this.debt_form.amount = '';
			},
			updateDebt() {
				this.$db.Debt.update(this.edit_form.id, {
					name: this.edit_form.name,
					amount: this.edit_form.amount
				});
				this.refresh();
				this.edit_open = false;
			},
			pay() {
				this.$db.Debt.update(this.current_debt.id, {
					name: this.current_debt.name,
					amount: Number(this.current_debt.amount) - Number(this.pay_form.amount)
				});
				this.refresh();
				this.pay_open = false;
			},
			removeDebt() {
				this.$db.Debt.remove(this.remove_form.id);
				this.refresh();
				this.remove_open = false;
			}
		},
		mounted() {
			this.refresh();
		}
	}

</script>

<style scoped>

	table {
		background: #fff;
		width: 100%;
		border-radius: 5px;
		margin-top: 10px;
	}

	th {
		background: #fbba3f;
		color: #7d5300;
	}

	th:first-child {
		border-radius: 5px 0px 0px 0px;
	}

	th:last-child {
		border-radius: 0px 5px 0px 0px;
	}

	th, td {
		padding: 5px 10px;
	}

	tr:nth-child(even) {
		background: #e8e8e8;
	}

	.truncate {
		width: 120px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
</style>