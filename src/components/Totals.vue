<template>
	
	<div class="panel">
		<p>Total In: £{{ ins }}</p>
		<p>Total Out: £{{ outs }}</p>
		<hr/>
		<p>Extra: £{{ extra }}</p>
	</div>

</template>

<script>
	
	export default {
		name: 'Totals',
		props: ['ins', 'outs', 'extra']
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