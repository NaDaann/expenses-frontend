import { route } from 'quasar/wrappers';
import {
	createMemoryHistory,
	createRouter,
	createWebHashHistory,
	createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
	const createHistory = process.env.SERVER
		? createMemoryHistory
		: process.env.VUE_ROUTER_MODE === 'history'
		? createWebHistory
		: createWebHashHistory;

	const Router = createRouter({
		scrollBehavior: () => ({ left: 0, top: 0 }),
		routes,

		// Leave this as is and make changes in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		history: createHistory(process.env.VUE_ROUTER_BASE),
	});

	Router.beforeEach((to, from, next) => {
		const token = localStorage.getItem('token');

		if (to.matched.some((record) => record.meta.requiresAuth)) {
			// Se a rota requer autenticação
			if (!token) {
				// Se não houver token, redireciona para a página de login
				next({ name: 'login' });
			} else {
				// Se houver token, permite o acesso à rota
				next(); // Aqui não deve passar nenhum argumento para next
			}
		} else {
			if (token && (to.name === 'login' || to.name === 'Signup')) {
				// Se houver token e a rota for login ou signup, redireciona para a página inicial
				next({ name: 'Home' });
			} else if (to.name === 'Logout') {
				// Se a rota for logout, remove o token e redireciona para a página de login (implementação de fake logout)
				localStorage.removeItem('token');
				next({ name: 'login' });
			} else {
				// Se a rota não requer autenticação, permite o acesso
				next(); // Aqui não deve passar nenhum argumento para next
			}
		}
	});

	return Router;
});
