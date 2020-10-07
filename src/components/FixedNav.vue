<template>
	
	<div>
		<div class="nav d-flex justify-content-between">
			<router-link class="nav-item no_border" to="/">Dash</router-link>
			<router-link class="nav-item no_border" to="/cashflow">Flow</router-link>
			<router-link class="nav-item" to="/budgets">Budgets</router-link>
			<router-link class="nav-item" to="/debts">Debts</router-link>
		</div>
	</div>

</template>

<script>
	
	export default {
		name: 'FixedNav'
	}

</script>

<style>
	
	.nav {
		background: #fff;
		position: fixed;
		top: 0px;
		z-index: 10;
		box-shadow: 0px 0px 6px rgb(0 0 0 / 0.63);
		width: 100%;
		left: 0px;
	}

	.nav-item {
		background: #fff;
		padding: 10px 15px;
		flex: 1;
		text-align: center;
		border-left: solid 4px #eaeaea;
	}

	.router-link-exact-active {
		background: #003267;
		color: #fff;
	}

</style>