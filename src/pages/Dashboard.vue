<template>
	<div class="container" :class="{ loading: $store.state.loading }">

		<div class="d-flex justify-content-between h1_box">
			<h1>Monthly Balance</h1>
		</div>

		<!-- totals -->
		<Totals />

		<div class="d-flex mt-3 justify-content-between h1_box">
			<h1>Running Expenses</h1>
		</div>

		<!-- bills paid (should have been paid anyway) -->
		<!-- <div class="panel mt-2 mb-2">
			<p>Bills paid: £{{ billsPaid }}</p>
		</div> -->

		<!-- spent from budgets -->
		<!-- <div class="panel mb-2">
			<p>Spent from Budgets: £{{ spentFromBudgets }}</p>
		</div> -->

		<!-- remaining from budgets -->
		<!-- <div class="panel mb-2">
			<p>Unspent from Budgets: £{{ remainingFromBudgets }}</p>
		</div> -->

		<!-- Bank accounts should equal: £ (totalIn - totalOutPastTodaysDate) - totalBugetSpent } -->
		<!-- <div class="panel mb-2">
			<p>Bank accounts should have: £{{ moneyInBank }}</p>
		</div> -->

	</div>
</template>

<script>
	
	import In from '../models/In.js';
	import Out from '../models/Out.js';
	import Budget from '../models/Budget.js';

	import Totals from '../components/Totals';

	export default {
		name: 'Dashboard',
		components: {
			Totals
		},
		data() {
			return {
				ins: In.findAll(),
				outs: Out.findAll(),
				totalIn: In.total(),
				totalOut: Out.total(),
				billsPaid: Out.paid(),
				remainingFromBudgets: Budget.getTotalRemaing()
			}
		},
		computed: {
			extra() {
				return this.totalIn - this.totalOut;
			},
			spentFromBudgets() {
				return Budget.spentFromBudgets();
			},	
			moneyInBank() {
				return (this.totalIn - this.billsPaid) - this.spentFromBudgets;
			}
		},
		mounted() {
			this.$store.commit('setError', []);
		},
		created() {
			this.$store.dispatch('getIns');
			this.$store.dispatch('getOuts');
		}
	}

</script>

<style>


</style>