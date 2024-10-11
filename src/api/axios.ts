import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8000/api', // URL base da API
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default apiClient;
