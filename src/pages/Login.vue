<template>
	<q-page class="q-pa-md">
		<q-card flat bordered class="my-card">
			<q-card-section>
				<div class="text-h6">Login</div>
			</q-card-section>

			<q-card-section>
				<q-form @submit="handleLogin">
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
						:error="passwordError"
						:error-message="passwordErrorMessage"
						required
					/>

					<q-btn
						type="submit"
						label="Login"
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
					label="Go to Signup"
					@click="goToSignup"
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

interface LoginResponse {
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

		const router = useRouter();

		const validateInputs = () => {
			let valid = true;

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
				passwordError.value = false;
				passwordErrorMessage.value = '';
			}

			return valid;
		};

		const handleLogin = async () => {
			if (!validateInputs()) return;

			loading.value = true;
			try {
				const response = await apiClient
					.post<LoginResponse>('/user/login', {
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
				console.error(error);
				errorMessage.value =
					'Erro ao fazer login. Verifique suas credenciais.';
			} finally {
				loading.value = false;
			}
		};

		const goToSignup = () => {
			router.push({ name: 'Signup' });
		};

		return {
			email,
			password,
			loading,
			errorMessage,
			emailError,
			passwordError,
			emailErrorMessage,
			passwordErrorMessage,
			handleLogin,
			goToSignup,
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
