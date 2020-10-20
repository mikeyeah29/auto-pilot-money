<template>
	
	<div class="container">

		<h1>login</h1>

		<div class="form" :class="{ loading: $store.state.loading }">
			
			<div class="">
				<label>Email</label>
				<input type="text" v-model="email" />
			</div>

			<div class="">
				<label>Password</label>
				<input type="password" v-model="password" />
			</div>

			<button class="button mt-4 full" @click="login">login</button>

		</div>

		<ErrorBox :errors="errors" />

	</div>

</template>

<script>
	
	import ErrorBox from '../components/ErrorBox';

	export default {
		name: 'login',
		components: {
			ErrorBox
		},
		data() {
			return {
				email: '',
				password: '',
				errors: []
			}
		},
		methods: {
			async login() {

				this.errors = [];

				if(!this.email) {
					this.errors.push('email required');
					return;
				}

				if(!this.password) {
					this.errors.push('password required');
					return;
				}

				var self = this;

				this.$store.dispatch('login', { email: this.email, password: this.password })
					.then(() => {
						self.$router.push('/');
					});

				

			}
		}
	}

</script>

<style>
	
	.full {
		width: 100%;
		padding: 10px 0px;
	}

</style>