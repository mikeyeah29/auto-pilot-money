<template>
	
	<div class="form-modal" :style="{ display: (is_open ? 'block' : 'none') }">

		<div class="inner">
			<slot></slot>
		</div>

		<div class="floating-action-button action-close"
			@click="$emit('close')">+</div>

	</div>

</template>

<script>
	
	export default {
		name: 'FormModal',
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

	.form-modal {
		z-index: 10;
	}

	.form-modal .action-close {
		transform: rotate(45deg);
		top: 30px;
		right: 30px;
	}

</style>