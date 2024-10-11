<template>
	<q-page class="q-pa-md">
		<q-card flat bordered class="my-card">
			<q-card-section>
				<div class="text-h6">Signup</div>
			</q-card-section>

			<q-card-section>
				<q-form @submit="handleSignup">

					<q-input
						v-model="name"
						label="Name"
						type="text"
						:error="nameError"
						:error-message="nameErrorMessage"
						required
					/>
					<q-input
						v-model="email"
						label="Email"
						type="email"
						:error="emailError"
						:error-message="emailErrorMessage"
						required
					/>
					<q-input
						v-model="password"
						label="Senha"
						type="password"
						minLength="8"
						:error="passwordError"
						:error-message="passwordErrorMessage"
						required
					/>

					<q-btn
						type="submit"
						label="Signup"
						color="primary"
						class="q-mt-md"
					/>
				</q-form>
				<q-banner v-if="errorMessage" class="q-mt-md" type="warning">
					{{ errorMessage }}
				</q-banner>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn
					flat
					label="Go to Login"
					@click="goToLogin"
					color="secondary"
				/>
			</q-card-actions>
		</q-card>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiClient from '../api/axios';
import { useRouter } from 'vue-router';

interface SignupResponse {
	data: {
		token: string;
	};
}

export default defineComponent({
	name: 'LoginPage',
	setup() {
		const email = ref('');
		const password = ref('');
		const loading = ref(false);
		const errorMessage = ref('');
		const emailError = ref(false);
		const passwordError = ref(false);
		const emailErrorMessage = ref('');
		const passwordErrorMessage = ref('');
		const name = ref('');
		const nameError = ref(false);
		const nameErrorMessage = ref('');

		const router = useRouter();

		const validateInputs = () => {
			let valid = true;

			// Valida o nome
			if (!name.value) {
				nameError.value = true;
				nameErrorMessage.value = 'Nome é obrigatório';
				valid = false;
			} else {
				nameError.value = false;
				nameErrorMessage.value = '';
			}

			// Valida o email
			if (!email.value) {
				emailError.value = true;
				emailErrorMessage.value = 'Email é obrigatório';
				valid = false;
			} else {
				emailError.value = false;
				emailErrorMessage.value = '';
			}

			// Valida a senha
			if (!password.value) {
				passwordError.value = true;
				passwordErrorMessage.value = 'Senha é obrigatória';
				valid = false;
			} else {
				if(password.value.length < 8) {
					passwordError.value = true;
					passwordErrorMessage.value = 'Senha deve ter no mínimo 8 caracteres';
					valid = false;
				} else {
					passwordError.value = false;
					passwordErrorMessage.value = '';
				}
			}

			return valid;
		};

		const handleSignup = async () => {
			if (!validateInputs()) return;

			loading.value = true;
			try {
				const response = await apiClient
					.post<SignupResponse>('/user/register', {
						name: name.value,
						email: email.value,
						password: password.value,
					})
					.then((response) => {
						return response.data;
					});
				
				const responseData = response.data;
				// Armazena o token no localStorage
				localStorage.setItem('token', responseData.token);

				// Redireciona para a página Home após login bem-sucedido
				router.push({ name: 'Home' });
			} catch (error) {
				loading.value = false;
				errorMessage.value = 'Erro ao criar conta';
			} finally {
				loading.value = false;
			}
		};

		const goToLogin = () => {
			router.push({ name: 'login' });
		};

		return {
			name,
			nameErrorMessage,
			nameError,
			email,
			password,
			loading,
			errorMessage,
			emailError,
			passwordError,
			emailErrorMessage,
			passwordErrorMessage,
			handleSignup,
			goToLogin,
		};
	},
});
</script>
<style scoped>
.my-card {
	max-width: 500px;
	margin: auto;
}
</style>
