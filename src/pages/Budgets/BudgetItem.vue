<template>
	
	<div class="budget_item">

		<p class="budget_item__title">{{ budget.name }} Budget</p>
		
		<div>
			<table>
				<thead>
					<tr>
						<th>Allowance</th>
						<th>Spent</th>
						<th :class="overBudget ? 'red': 'green'">Remaining</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>£{{ budget.allowance }}</td>
						<td>£{{ budget.spent }}</td>
						<td :class="overBudget ? 'red': 'green'">£{{ remaining }}</td>
						<td class="text-right">
							<span class="ml-2 icon_btn">
								<font-awesome-icon icon="redo-alt" @click="reset_open = true;" />
							</span>
							<span class="ml-2 icon_btn">
								<font-awesome-icon icon="receipt" @click="spend_open = true;" />
							</span>
							<span class="ml-2 icon_btn">
								<font-awesome-icon icon="edit" @click="edit_open = true;" />
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="budget_item__remove icon_btn bg-red" @click="ays_open = true;">
			<font-awesome-icon icon="trash-alt" />
		</div>

		<ConfirmModal :is_open="ays_open"
					@confirmed="removeBudgetItem()"
					@close="ays_open = false;" />

		<FormModal :is_open="edit_open" @close="edit_open = false">
			
			<h2>Edit Budget Item</h2>

			<div class="form-group">
				<label>Name</label>
				<input type="text" v-model="edit_form.name" />
			</div>

			<div class="form-group">
				<label>Allowance</label>
				<input type="number" v-model="edit_form.allowance" />
			</div>

			<div class="form-group">
				<label>Spent</label>
				<input type="number" v-model="edit_form.spent" />
			</div>			

			<button class="button" @click="updateBudgetItem()">Save</button>

		</FormModal>

		<ConfirmModal :is_open="reset_open"
					@confirmed="resetBudgetItem()"
					@close="reset_open = false;" />

		<FormModal :is_open="spend_open" @close="spend_open = false">
			<h2>Spend</h2>
			<div class="form-group">
				<label>Amount</label>
				<input type="text" v-model="spend_form.amount" />
			</div>
			<button class="button" @click="spend()">Save</button>
		</FormModal>

	</div>

</template>

<script>

	import Budget from '../../models/Budget.js';

	import ConfirmModal from '../../components/ConfirmModal';
	import FormModal from '../../components/FormModal';
	
	export default {
		name: '',
		props: ['budget'],
		components: {
			ConfirmModal,
			FormModal
		},
		data() {
			return {
				ays_open: false,
				spend_open: false,
				edit_open: false,
				reset_open: false,
				edit_form: {
					name: this.budget.name,
					allowance: this.budget.allowance,
					spent: this.budget.spent
				},
				spend_form: {
					amount: ''
				}
			}
		},
		methods: {
			removeBudgetItem() {
				Budget.remove(this.budget.id);
				this.$emit('updated');
				this.ays_open = false;
			},
			updateBudgetItem() {
				Budget.update(this.budget.id, {
					name: this.edit_form.name,
					allowance: this.edit_form.allowance,
					spent: this.edit_form.spent
				});
				this.$emit('updated');
				this.edit_open = false;
			},
			resetBudgetItem() {
				Budget.update(this.budget.id, {
					name: this.budget.name,
					allowance: this.budget.allowance,
					spent: 0
				});
				this.$emit('updated');
				this.reset_open = false;
			},
			spend() {
				Budget.update(this.budget.id, {
					name: this.budget.name,
					allowance: this.budget.allowance,
					spent: Number(this.budget.spent) + Number(this.spend_form.amount) 
				});
				this.$emit('updated');
				this.spend_open = false;
			}
		},
		computed: {
			remaining() {
				return this.budget.allowance - this.budget.spent;
			},
			overBudget() {
				if( Number(this.budget.spent) > Number(this.budget.allowance) ) {
					return true;
				}
				return false;
			}
		}
	}

</script>

<style>
	
	.red { color: #e25454; }
	.green { color: #3aaf3a; }

	.budget_item {
		background: #fff;
		margin-top: 20px;
		border-radius: 5px;
		padding: 10px;
		position: relative;
	}

	.budget_item__title {
		border-bottom: solid 2px;
		padding-bottom: 5px;
		font-size: 20px;
		margin-bottom: 12px;
	}

	.budget_item__remove {
		position: absolute;
		top: 7px;
		right: 7px;
	}

</style>