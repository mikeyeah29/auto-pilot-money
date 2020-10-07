<template>
	
	<div class="form-modal" :style="{ display: (is_open ? 'block' : 'none') }">

		<div class="inner">
			<p>Are you sure?</p>
			<div class="d-flex">
				<button class="button mr-3" @click="$emit('confirmed')">Yes</button>
				<button class="button" @click="$emit('close')">No</button>
			</div>
		</div>

		<div class="floating-action-button action-close"
			@click="$emit('close')">+</div>

	</div>

</template>

<script>
	
	export default {
		name: 'ConfirmModal',
		props: ['is_open']
	}

</script>

<style>

	label {
		display: block;
	}

	input {
		width: 100%;
	}

	.form-modal .action-close {
		transform: rotate(45deg);
		top: 30px;
		right: 30px;
		width: 36px;
		height: 36px;
	}

</style>