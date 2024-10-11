import { RouteRecordRaw } from 'vue-router';
import Login from 'pages/Login.vue';
import Signup from 'pages/Signup.vue';
import Home from 'pages/Home.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '/',
				name: 'Home',
				component: () => Home,
				meta: { requiresAuth: true },
			},
			{ path: '/login', name: 'login', component: () => Login },
			{ path: '/signup', name: 'Signup', component: () => Signup },
			{ path: '/logout', name: 'Logout', component: () => Login },
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;
