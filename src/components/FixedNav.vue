<template>
	
	<div>
		<div class="nav d-flex justify-content-between" v-if="$store.state.token">
			<router-link class="nav-item no_border" to="/">
				<font-awesome-icon icon="tachometer-alt" />
			</router-link>
			<router-link class="nav-item no_border" to="/cashflow">
				<font-awesome-icon icon="money-bill-wave" />
			</router-link>
			<router-link class="nav-item" to="/budgets">
				<font-awesome-icon icon="receipt" />
			</router-link>
			<router-link class="nav-item" to="/debts">
				<font-awesome-icon icon="credit-card" />
			</router-link>
			<div class="nav-item" @click="logout">
				<font-awesome-icon icon="sign-out-alt" />
			</div>
		</div>

		<!-- <div class="nav d-flex justify-content-between" v-else>
			<router-link class="nav-item" to="/login">
				<font-awesome-icon icon="tachometer-alt" />
			</router-link>
		</div> -->

	</div>

</template>

<script>
	
	export default {
		name: 'FixedNav',
		methods: {
			logout() {
				this.$store.commit('logout');
				this.$router.push('/login');
			}
		}
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
		color: #fff !important;
	}

</style>