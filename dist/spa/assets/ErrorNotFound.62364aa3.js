import { d as o } from './QBtn.13f39e1c.js';
import { I as r, J as s, T as l, S as t, M as n } from './index.0c01e9e2.js';
import './render.1060ffe3.js';
const a = {
		class: 'fullscreen bg-blue text-white text-center q-pa-md flex flex-center',
	},
	u = r({
		name: 'ErrorNotFound',
		__name: 'ErrorNotFound',
		setup(i) {
			return (d, e) => (
				s(),
				l('div', a, [
					t('div', null, [
						e[0] ||
							(e[0] = t(
								'div',
								{ style: { 'font-size': '30vh' } },
								' 404 ',
								-1
							)),
						e[1] ||
							(e[1] = t(
								'div',
								{ class: 'text-h2', style: { opacity: '.4' } },
								' Oops. Nothing here... ',
								-1
							)),
						n(o, {
							class: 'q-mt-xl',
							color: 'white',
							'text-color': 'blue',
							unelevated: '',
							to: '/',
							label: 'Go Home',
							'no-caps': '',
						}),
					]),
				])
			);
		},
	});
export { u as default };
