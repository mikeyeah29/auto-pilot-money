<template>

	<div class="error-box" v-if="errors.length > 0">

		{{ errors }}

		<p v-for="(e, i) in errors" :key="i">{{ e }}</p>
	</div>

</template>

<script>
	
	export default {
		name: 'ErrorBox',
		props: ['errors']
	}

</script>

<style scoped>
	
	.error-box {
		position: fixed;
		left: 0px;
		bottom: 0px;
		background: #dc5b5b;
		width: 100%;
		text-align: center;
		color: #fff;
		padding: 10px 0px;
	}

	p {
		margin: 0px;
	}

</style>