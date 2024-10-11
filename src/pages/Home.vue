<template>
	<q-page padding>
		<q-btn
			color="red"
			icon="exit_to_app"
			@click="logout"
		/>

		<div class="row justify-between items-center">
			<h1>Despesas</h1>
			<q-btn
				color="primary"
				label="Adicionar Nova Despesa"
				icon="add"
				@click="openDialogCreateExpense"
			/>
		</div>

		<q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
			<q-card class="dialog-container">
				<q-card-section class="row items-center q-pb-none text-h6 dialog-card-section">
					Despesa
					<q-btn flat label="" color="dark" icon="close" v-close-popup />

				</q-card-section>

				<q-card-section class="dialog-inputs">
					<q-input
						v-model="description"
						label="Descrição"
						type="textarea"
						placeholder="Compra de materiais"
						maxlength="191"
						required
						:error-message="descriptionErrorMessage"
						:error="descriptionError"
						>
					</q-input>
					<q-input
						v-model="amount"
						label="Valor"
						placeholder="100.5"
						type="number"
						required
						:error-message="amountErrorMessage"
						:error="amountError"
						>
					</q-input>
					<q-input
						v-model="date"
						label="Data"
						type="date"
						required
						:error-message="dateErrorMessage"
						:error="dateError"
						>
					</q-input>
					
					<q-banner v-if="errorMessage" class="q-mt-md" type="warning">
						{{ errorMessage }}
					</q-banner>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="Salvar" color="primary" icon="add" @click="handleDialogSave" />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<!-- Tabela de despesas -->
		<q-table
			:rows="expenses"
			:columns="columns"
			row-key="id"
			v-model:pagination="pagination"
			:rows-per-page-options="[5, 10, 20]"
		>
			<!-- Coluna de ações -->
			<template v-slot:body-cell-actions="props">
				<q-td align="center">
					<q-btn
						icon="edit"
						color="primary"
						@click="openDialogEditExpense(props.row)"
					/>
					<q-btn
						icon="delete"
						color="negative"
						@click="deleteExpense(props.row.id)"
					/>
				</q-td>
			</template>
		</q-table>

		<!-- Paginação -->
		<q-pagination
			v-model="pagination.page"
			:max="totalPages"
			color="primary"
			@update:model-value="fetchExpenses"
		/>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import moment from 'moment';
import { QBtn, QTable, QTd, QPagination, QTableProps } from 'quasar';
import apiClient from '../api/axios';
import { useRouter } from 'vue-router';

interface Expense {
	id: number; // Mudei para number se o ID for um número
	description: string;
	amount: string; // Mantenha como string, mas pode ser ajustado conforme necessário
	date: string;
}

interface ApiResponse {
	data: Expense[];
	meta: {
		total: number;
		per_page: number;
	};
}

export default defineComponent({
	name: 'ExpensesTable',
	components: {
		QBtn,
		QTable,
		QTd,
		QPagination,
	},
	setup() {
		const expenses = ref<QTableProps['rows']>([]);
		const totalPages = ref<number>(1);
		const pagination = ref({ page: 1, rowsPerPage: 5 });
		const dialog = ref(false);
		
		const description = ref('');
		const descriptionError = ref(false);
		const descriptionErrorMessage = ref('');

		const amount = ref('');
		const amountError = ref(false);
		const amountErrorMessage = ref('');

		const date = ref('');
		const dateError = ref(false);
		const dateErrorMessage = ref('');

		const errorMessage = ref('');

		const editExpenseId = ref<number | null>(null);
		const dialogAction = ref('');

		const router = useRouter();

		const columns: QTableProps['columns'] = [
			{
				name: 'id',
				required: true,
				label: 'ID',
				align: 'left',
				field: 'id',
			},
			{
				name: 'description',
				label: 'Descrição',
				align: 'left',
				field: 'description',
			},
			{
				name: 'amount',
				label: 'Valor',
				align: 'right',
				field: 'amount',
				format: (val: string) => `R$ ${parseFloat(val).toFixed(2)}`,
			},
			{
				name: 'date',
				label: 'Data',
				align: 'left',
				field: 'date',
				format: (val: string) => moment(String(val)).format('DD/MM/YYYY'),
			},
			{
				name: 'actions',
				label: 'Ações',
				align: 'center',
				field: 'actions',
			},
		];

		// Função para buscar despesas
		const fetchExpenses = async () => {
			try {
				const response = await apiClient.get<ApiResponse>(
					`/expenses/all?page=${pagination.value.page}&perPage=${pagination.value.rowsPerPage}`
				);
				expenses.value = response.data.data;
				console.log('Despesas:', expenses.value);

				totalPages.value = Math.ceil(
					response.data.meta.total / response.data.meta.per_page
				);
				console.log('Total de páginas:', totalPages.value);
			} catch (error) {
				console.error('Erro ao buscar despesas:', error);
			}
		};

		const resetExpensesValues = () => {
			description.value = '';
			amount.value = '';
			date.value = '';
			descriptionError.value = false;
			amountError.value = false;
			dateError.value = false;
			errorMessage.value = '';
		};

		const handleDialogSave = () => {
			if (dialogAction.value === 'create') {
				createExpense();
			} else if (dialogAction.value === 'edit') {
				editExpense();
			} else {
				console.error('Ação inválida:', dialogAction.value);
				errorMessage.value = 'Erro ao salvar despesa';
			}
		};

		const openDialogCreateExpense = () => {
			resetExpensesValues();

			dialog.value = true;
			dialogAction.value = 'create';
		};

		const validateInputs = () => {
			let valid = true;

			if (!description.value) {
				descriptionError.value = true;
				descriptionErrorMessage.value = 'Descrição é obrigatória';
				valid = false;
			} else {
				descriptionError.value = false;
				descriptionErrorMessage.value = '';
			}

			if (!amount.value) {
				amountError.value = true;
				amountErrorMessage.value = 'Valor é obrigatório';
				valid = false;
			} else {
				amountError.value = false;
				amountErrorMessage.value = '';
			}

			if (!date.value) {
				dateError.value = true;
				dateErrorMessage.value = 'Data é obrigatória';
				valid = false;
			} else {
				dateError.value = false;
				dateErrorMessage.value = '';
			}

			if(new Date(date.value) > new Date()){
				dateError.value = true;
				dateErrorMessage.value = 'Data não pode ser maior que a data atual';
				valid = false;
			}

			return valid;
		};

		// Função para criar nova despesa
		const createExpense = async () => {
			try {
				if (!validateInputs()) return;

				const formattedAmount = parseFloat(amount.value).toFixed(2);
				const formattedDate = new Date(date.value).toISOString().split('T')[0];
				

				const response = await apiClient.post('/expenses', {
					description: description.value,
					amount: formattedAmount,
					date: formattedDate,
				});

				if (response.status === 200) {
					fetchExpenses(); // Atualiza a lista após criar
					dialog.value = false; // Fecha o diálogo
				} else {
					errorMessage.value = 'Erro ao criar despesa';
				}
			} catch (error) {
				console.error('Erro ao criar despesa:', error);
				errorMessage.value = 'Erro ao criar despesa';
			}
		};

		const openDialogEditExpense = (expense: Expense) => {
			resetExpensesValues();

			description.value = expense.description;
			amount.value = expense.amount;
			date.value = moment(expense.date).format('YYYY-MM-DD');
			editExpenseId.value = expense.id;
			dialog.value = true;
			dialogAction.value = 'edit';
		};

		// Função para editar despesa
		const editExpense = async () => {
			try{
				if (!validateInputs()) return;

				const formattedAmount = parseFloat(amount.value).toFixed(2);
				const formattedDate = new Date(date.value).toISOString().split('T')[0];

				const response = await apiClient.put(`/expenses/${editExpenseId.value}`, {
					description: description.value,
					amount: formattedAmount,
					date: formattedDate,
				});

				if (response.status === 200) {
					fetchExpenses(); // Atualiza a lista após editar
					dialog.value = false; // Fecha o diálogo
				} else {
					errorMessage.value = 'Erro ao editar despesa';
				}
			} catch (error) {
				console.error('Erro ao editar despesa:', error);
				errorMessage.value = 'Erro ao editar despesa';
			}
			
		};

		// Função para deletar despesa
		const deleteExpense = async (id: number) => {
			try {
				await apiClient.delete(`/expenses/${id}`);
				fetchExpenses(); // Atualiza a lista após deletar
			} catch (error) {
				console.error('Erro ao deletar despesa:', error);
			}
		};

		const logout = () => {
			localStorage.removeItem('token');
			router.push({ name: 'login' });
		};

		onMounted(() => {
			fetchExpenses();
		});

		return {
			expenses,
			columns,
			logout,
			pagination,
			dialog,
			totalPages,
			fetchExpenses,
			description,
			descriptionError,
			descriptionErrorMessage,
			errorMessage,
			handleDialogSave,
			date,
			dateError,
			dateErrorMessage,
			amount,
			amountError,
			amountErrorMessage,
			createExpense,
			openDialogCreateExpense,
			editExpense,
			openDialogEditExpense,
			deleteExpense,
		};
	},
});
</script>

<style scoped>
.row {
	display: flex;
}
.dialog-card-section{
	justify-content: space-between;
	gap: 1rem;
}
.dialog-container{
	padding: .5rem;
	width: 800px;
	display: flex;
	flex-direction: column;

	gap: .6rem;
}
.dialog-inputs{
	display: flex;
	flex-direction: column;
	gap: .6rem;
}
</style>
