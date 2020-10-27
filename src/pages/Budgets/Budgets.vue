<template>
	
	<div class="container" :class="{ loading: $store.state.loading }">
		
		<div class="d-flex justify-content-between h1_box">
			<h1>Budgets (monthly)</h1>
			<font-awesome-icon icon="info-circle" @click="infoModalOpen = true" />
		</div>

		<div class="panel">
			<span>Remaining money: £{{ remainingForBudgeting }}</span>
			<span class="d-block">( this is any money thats left after all outs including bills and budgets )</span>
		</div>

		<FormModal :is_open="infoModalOpen" @close="infoModalOpen = false">
			<div class="info">
				<h3>Budgets</h3>
				<p>Based on the extra money left over after monthly rent &amp; bill's</p>
				<p>
					Asign an amount from the extra money to this months "Budget". Examples might be food shoppng, petrol or days out
				</p>
				<p>
					As money is spent it can be added here to update the remaining amount. 
					At the end of the month you can reset the budget to the default amount.
				</p>
			</div>
		</FormModal>

		<FormModal :is_open="addBudgetModalOpen" @close="addBudgetModalOpen = false">
			
			<h2>Add Budget Item</h2>

			<div class="form-group">
				<label>Name</label>
				<input type="text" v-model="addBudgetItemForm.name" />
			</div>

			<div class="form-group">
				<label>Allowance</label>
				<input type="number" v-model="addBudgetItemForm.allowance" />
			</div>		

			<button class="button" @click="addBudgetItem()">Add Budget Item</button>

		</FormModal>

		<BudgetItem v-for="budget in this.$store.state.budgets.budgets" 
					:budget="budget" 
					:key="budget.id"
					@updated="refresh()" />

		<div class="floating-action-button action-add" 
		@click="addBudgetModalOpen = true">+</div>

	</div>

</template>

<script>

	import In from '../../models/In.js';
	import Out from '../../models/Out.js';

	import FormModal from '../../components/FormModal.vue';
	import BudgetItem from './BudgetItem.vue';
	
	export default {
		name: 'Budgets',
		components: {
			FormModal,
			BudgetItem
		},
		data() {
			return {
				addBudgetModalOpen: false,
				addBudgetItemForm: {
					name: '',
					allowance: ''
				},
				infoModalOpen: false,
				budgets: [],
				totalRemaining: 0,
				totalIn: In.total(),
				totalOut: Out.total()
			}
		},
		computed: {
			remainingForBudgeting() {
				return this.$store.getters.extra - this.$store.getters.budgeted;
			}
		},
		methods: {
			addBudgetItem() {
				var budget = this.addBudgetItemForm;
				this.$store.dispatch('addBudgetItem', budget);
				this.addBudgetModalOpen = false;
			}
		},
		created() {
			this.$store.dispatch('getBudgets');
		}
	}

</script>

<style>

	table {
		width: 100%;
	}
	
	.info {
		background: #fff;
		border-radius: 5px;
		padding: 20px;
	}

</style>