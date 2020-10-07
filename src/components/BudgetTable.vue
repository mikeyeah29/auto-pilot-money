<template>
	
	<div>

		<table>

			<thead>

				<tr>
					<th>Item</th>
					<th>Date</th>
					<th>Amount</th>
					<th></th>
				</tr>

			</thead>

			<tbody>

				<tr v-for="item in lineItems" :key="item.id">
					<td><div class="truncate">{{ item.name }}</div></td>
					<td>{{ item.dayOfMonth }}</td>
					<td>£{{ item.amount }}</td>
					<td class="text-right">
						<span class="ml-2 icon_btn">
							<font-awesome-icon icon="edit" @click="openEditItemModal(item.id)" />
						</span>
						<span class="ml-2 icon_btn bg-red">
							<font-awesome-icon icon="trash-alt" @click="openRemoveItemModal(item.id)" />
						</span>
					</td>
				</tr>

			</tbody>

		</table>

		<ConfirmModal :is_open="ays_open"
					@confirmed="removeLineItem()"
					@close="ays_open = false;" />

		<FormModal :is_open="edit_item_open" @close="edit_item_open = false">
			<h2>Edit Line Item</h2>

			<div class="form-group">
				<label>Name</label>
				<input type="text" v-model="edit_item_form.name" />
			</div>

			<div class="d-flex">

				<div class="form-group flex-1 mr-2">
					<label>Day of the month</label>
					<input type="number" min="1" max="31" v-model="edit_item_form.dayOfMonth" />
				</div>

				<div class="form-group flex-1 ml-2">
					<label>Amount</label>
					<input type="number" v-model="edit_item_form.amount" />
				</div>

			</div>

			<button class="button" @click="updateLineItem()">UPDATE LINE ITEM</button>
		</FormModal>

	</div>

</template>

<script>

	import ConfirmModal from './ConfirmModal.vue';
	import FormModal from './FormModal.vue';
	
	export default {
		name: 'BudgetTable',
		props: ['lineItems', 'table'],
		components: {
			ConfirmModal,
			FormModal
		},
		data() {
			return {
				ays_open: false,
				edit_item_open: false,
				targeted_item_id: null,
				targeted_item: {},
				edit_item_form: {
					name: '',
					dayOfMonth: 1,
					amount: ''
				}
			}
		},
		methods: {
			openRemoveItemModal(id) {
				this.targeted_item_id = id;
				this.ays_open = true;
			},
			removeLineItem() {
				this.$emit('removeItem', this.targeted_item_id);
				this.ays_open = false;
			},
			openEditItemModal(id) {
				this.targeted_item_id = id;
				this.targeted_item = this.$db[this.table].find(id);
				this.edit_item_form = {
					name: this.targeted_item.name,
					dayOfMonth: this.targeted_item.dayOfMonth,
					amount: this.targeted_item.amount
				};
				this.edit_item_open = true;		
			},
			updateLineItem() {
				this.$emit('updateItem', {
					id: this.targeted_item_id,
					data: {
						name: this.edit_item_form.name,
						dayOfMonth: this.edit_item_form.dayOfMonth,
						amount: this.edit_item_form.amount
					}
				});
				this.edit_item_open = false;
			}
		}
	}

</script>

<style scoped>
	
	table {
		background: #fff;
		width: 100%;
		border-radius: 5px;
		margin-top: 10px;
	}

	th {
		background: #fbba3f;
		color: #7d5300;
	}

	th:first-child {
		border-radius: 5px 0px 0px 0px;
	}

	th:last-child {
		border-radius: 0px 5px 0px 0px;
	}

	th, td {
		padding: 5px 10px;
	}

	tr:nth-child(even) {
		background: #e8e8e8;
	}

	.truncate {
		width: 120px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

</style>