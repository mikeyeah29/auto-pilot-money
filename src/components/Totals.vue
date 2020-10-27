<template>
	
	<div class="panel">
		<p>Total In: £{{ $store.getters.totalIns }}</p>
		<p>Total Out: £{{ $store.getters.totalOuts }}</p>
		<p>Extra: £{{ $store.getters.extra }}</p>
		<hr/>
		<p>Budgeted: £{{ budgeted }}</p>
		<p>Remaining after budgeted: £{{ extraAfterBudgeted }}</p>
	</div>

</template>

<script>
	
	export default {
		name: 'Totals',
		props: [],
		computed: {
			budgeted() {
				return this.$store.getters.budgeted;
			},
			extraAfterBudgeted() {
				return Number(this.$store.getters.extra) - Number(this.$store.getters.budgeted);
			}
		}
	}

</script>

<style>
	
	/*.totals {
		background: #092f5d;
		padding: 15px;
		border-radius: 5px;
		color: #8dc4fb;
	}

	.totals p {
		margin: 0px;
	}*/

</style>