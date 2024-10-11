import {
	a as o,
	c as V,
	h as v,
	g as F,
	X as de,
	q as fe,
	G as N,
	u as ve,
	A as ge,
	y as ae,
	z as me,
	r as U,
	b as be,
	B as he,
	s as P,
	x as ye,
	Y as ke,
	l as pe,
} from './index.0c01e9e2.js';
import { h as xe, c as z } from './render.1060ffe3.js';
const Q = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 },
	re = { size: String };
function ue(e, t = Q) {
	return o(() =>
		e.size !== void 0
			? { fontSize: e.size in t ? `${t[e.size]}px` : e.size }
			: null
	);
}
const H = '0 0 24 24',
	W = (e) => e,
	D = (e) => `ionicons ${e}`,
	ie = {
		'mdi-': (e) => `mdi ${e}`,
		'icon-': W,
		'bt-': (e) => `bt ${e}`,
		'eva-': (e) => `eva ${e}`,
		'ion-md': D,
		'ion-ios': D,
		'ion-logo': D,
		'iconfont ': W,
		'ti-': (e) => `themify-icon ${e}`,
		'bi-': (e) => `bootstrap-icons ${e}`,
	},
	le = { o_: '-outlined', r_: '-round', s_: '-sharp' },
	se = { sym_o_: '-outlined', sym_r_: '-rounded', sym_s_: '-sharp' },
	qe = new RegExp('^(' + Object.keys(ie).join('|') + ')'),
	$e = new RegExp('^(' + Object.keys(le).join('|') + ')'),
	X = new RegExp('^(' + Object.keys(se).join('|') + ')'),
	Ee = /^[Mm]\s?[-+]?\.?\d/,
	Se = /^img:/,
	we = /^svguse:/,
	Re = /^ion-/,
	Be =
		/^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var Y = V({
	name: 'QIcon',
	props: {
		...re,
		tag: { type: String, default: 'i' },
		name: String,
		color: String,
		left: Boolean,
		right: Boolean,
	},
	setup(e, { slots: t }) {
		const {
				proxy: { $q: a },
			} = F(),
			n = ue(e),
			l = o(
				() =>
					'q-icon' +
					(e.left === !0 ? ' on-left' : '') +
					(e.right === !0 ? ' on-right' : '') +
					(e.color !== void 0 ? ` text-${e.color}` : '')
			),
			f = o(() => {
				let c,
					u = e.name;
				if (u === 'none' || !u) return { none: !0 };
				if (a.iconMapFn !== null) {
					const s = a.iconMapFn(u);
					if (s !== void 0)
						if (s.icon !== void 0) {
							if (((u = s.icon), u === 'none' || !u))
								return { none: !0 };
						} else
							return {
								cls: s.cls,
								content: s.content !== void 0 ? s.content : ' ',
							};
				}
				if (Ee.test(u) === !0) {
					const [s, y = H] = u.split('|');
					return {
						svg: !0,
						viewBox: y,
						nodes: s.split('&&').map((i) => {
							const [k, b, p] = i.split('@@');
							return v('path', { style: b, d: k, transform: p });
						}),
					};
				}
				if (Se.test(u) === !0) return { img: !0, src: u.substring(4) };
				if (we.test(u) === !0) {
					const [s, y = H] = u.split('|');
					return { svguse: !0, src: s.substring(7), viewBox: y };
				}
				let q = ' ';
				const h = u.match(qe);
				if (h !== null) c = ie[h[1]](u);
				else if (Be.test(u) === !0) c = u;
				else if (Re.test(u) === !0)
					c = `ionicons ion-${
						a.platform.is.ios === !0 ? 'ios' : 'md'
					}${u.substring(3)}`;
				else if (X.test(u) === !0) {
					c = 'notranslate material-symbols';
					const s = u.match(X);
					s !== null && ((u = u.substring(6)), (c += se[s[1]])),
						(q = u);
				} else {
					c = 'notranslate material-icons';
					const s = u.match($e);
					s !== null && ((u = u.substring(2)), (c += le[s[1]])),
						(q = u);
				}
				return { cls: c, content: q };
			});
		return () => {
			const c = {
				class: l.value,
				style: n.value,
				'aria-hidden': 'true',
				role: 'presentation',
			};
			return f.value.none === !0
				? v(e.tag, c, xe(t.default))
				: f.value.img === !0
				? v(e.tag, c, z(t.default, [v('img', { src: f.value.src })]))
				: f.value.svg === !0
				? v(
						e.tag,
						c,
						z(t.default, [
							v(
								'svg',
								{ viewBox: f.value.viewBox || '0 0 24 24' },
								f.value.nodes
							),
						])
				  )
				: f.value.svguse === !0
				? v(
						e.tag,
						c,
						z(t.default, [
							v('svg', { viewBox: f.value.viewBox }, [
								v('use', { 'xlink:href': f.value.src }),
							]),
						])
				  )
				: (f.value.cls !== void 0 && (c.class += ' ' + f.value.cls),
				  v(e.tag, c, z(t.default, [f.value.content])));
		};
	},
});
const Le = { size: { type: [String, Number], default: '1em' }, color: String };
function Ce(e) {
	return {
		cSize: o(() => (e.size in Q ? `${Q[e.size]}px` : e.size)),
		classes: o(() => 'q-spinner' + (e.color ? ` text-${e.color}` : '')),
	};
}
var _e = V({
	name: 'QSpinner',
	props: { ...Le, thickness: { type: Number, default: 5 } },
	setup(e) {
		const { cSize: t, classes: a } = Ce(e);
		return () =>
			v(
				'svg',
				{
					class: a.value + ' q-spinner-mat',
					width: t.value,
					height: t.value,
					viewBox: '25 25 50 50',
				},
				[
					v('circle', {
						class: 'path',
						cx: '50',
						cy: '50',
						r: '20',
						fill: 'none',
						stroke: 'currentColor',
						'stroke-width': e.thickness,
						'stroke-miterlimit': '10',
					}),
				]
			);
	},
});
function Pe(e, t) {
	const a = e.style;
	for (const n in t) a[n] = t[n];
}
function Ze(e) {
	if (e == null) return;
	if (typeof e == 'string')
		try {
			return document.querySelector(e) || void 0;
		} catch {
			return;
		}
	const t = de(e);
	if (t) return t.$el || t;
}
function Te(e, t = 250) {
	let a = !1,
		n;
	return function () {
		return (
			a === !1 &&
				((a = !0),
				setTimeout(() => {
					a = !1;
				}, t),
				(n = e.apply(this, arguments))),
			n
		);
	};
}
function G(e, t, a, n) {
	a.modifiers.stop === !0 && ae(e);
	const l = a.modifiers.color;
	let f = a.modifiers.center;
	f = f === !0 || n === !0;
	const c = document.createElement('span'),
		u = document.createElement('span'),
		q = me(e),
		{ left: h, top: s, width: y, height: i } = t.getBoundingClientRect(),
		k = Math.sqrt(y * y + i * i),
		b = k / 2,
		p = `${(y - k) / 2}px`,
		d = f ? p : `${q.left - h - b}px`,
		x = `${(i - k) / 2}px`,
		_ = f ? x : `${q.top - s - b}px`;
	(u.className = 'q-ripple__inner'),
		Pe(u, {
			height: `${k}px`,
			width: `${k}px`,
			transform: `translate3d(${d},${_},0) scale3d(.2,.2,1)`,
			opacity: 0,
		}),
		(c.className = `q-ripple${l ? ' text-' + l : ''}`),
		c.setAttribute('dir', 'ltr'),
		c.appendChild(u),
		t.appendChild(c);
	const L = () => {
		c.remove(), clearTimeout(C);
	};
	a.abort.push(L);
	let C = setTimeout(() => {
		u.classList.add('q-ripple__inner--enter'),
			(u.style.transform = `translate3d(${p},${x},0) scale3d(1,1,1)`),
			(u.style.opacity = 0.2),
			(C = setTimeout(() => {
				u.classList.remove('q-ripple__inner--enter'),
					u.classList.add('q-ripple__inner--leave'),
					(u.style.opacity = 0),
					(C = setTimeout(() => {
						c.remove(), a.abort.splice(a.abort.indexOf(L), 1);
					}, 275));
			}, 250));
	}, 50);
}
function J(e, { modifiers: t, value: a, arg: n }) {
	const l = Object.assign({}, e.cfg.ripple, t, a);
	e.modifiers = {
		early: l.early === !0,
		stop: l.stop === !0,
		center: l.center === !0,
		color: l.color || n,
		keyCodes: [].concat(l.keyCodes || 13),
	};
}
var Ae = fe({
	name: 'ripple',
	beforeMount(e, t) {
		const a =
			t.instance.$.appContext.config.globalProperties.$q.config || {};
		if (a.ripple === !1) return;
		const n = {
			cfg: a,
			enabled: t.value !== !1,
			modifiers: {},
			abort: [],
			start(l) {
				n.enabled === !0 &&
					l.qSkipRipple !== !0 &&
					l.type ===
						(n.modifiers.early === !0 ? 'pointerdown' : 'click') &&
					G(l, e, n, l.qKeyEvent === !0);
			},
			keystart: Te((l) => {
				n.enabled === !0 &&
					l.qSkipRipple !== !0 &&
					N(l, n.modifiers.keyCodes) === !0 &&
					l.type ===
						`key${n.modifiers.early === !0 ? 'down' : 'up'}` &&
					G(l, e, n, !0);
			}, 300),
		};
		J(n, t),
			(e.__qripple = n),
			ve(n, 'main', [
				[e, 'pointerdown', 'start', 'passive'],
				[e, 'click', 'start', 'passive'],
				[e, 'keydown', 'keystart', 'passive'],
				[e, 'keyup', 'keystart', 'passive'],
			]);
	},
	updated(e, t) {
		if (t.oldValue !== t.value) {
			const a = e.__qripple;
			a !== void 0 &&
				((a.enabled = t.value !== !1),
				a.enabled === !0 && Object(t.value) === t.value && J(a, t));
		}
	},
	beforeUnmount(e) {
		const t = e.__qripple;
		t !== void 0 &&
			(t.abort.forEach((a) => {
				a();
			}),
			ge(t, 'main'),
			delete e._qripple);
	},
});
const oe = {
		left: 'start',
		center: 'center',
		right: 'end',
		between: 'between',
		around: 'around',
		evenly: 'evenly',
		stretch: 'stretch',
	},
	Oe = Object.keys(oe),
	Me = { align: { type: String, validator: (e) => Oe.includes(e) } };
function je(e) {
	return o(() => {
		const t =
			e.align === void 0
				? e.vertical === !0
					? 'stretch'
					: 'left'
				: e.align;
		return `${e.vertical === !0 ? 'items' : 'justify'}-${oe[t]}`;
	});
}
function ze(e) {
	return e.appContext.config.globalProperties.$router !== void 0;
}
function et(e) {
	return e.isUnmounted === !0 || e.isDeactivated === !0;
}
function Z(e) {
	return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
function ee(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ke(e, t) {
	for (const a in t) {
		const n = t[a],
			l = e[a];
		if (typeof n == 'string') {
			if (n !== l) return !1;
		} else if (
			Array.isArray(l) === !1 ||
			l.length !== n.length ||
			n.some((f, c) => f !== l[c])
		)
			return !1;
	}
	return !0;
}
function te(e, t) {
	return Array.isArray(t) === !0
		? e.length === t.length && e.every((a, n) => a === t[n])
		: e.length === 1 && e[0] === t;
}
function Ie(e, t) {
	return Array.isArray(e) === !0
		? te(e, t)
		: Array.isArray(t) === !0
		? te(t, e)
		: e === t;
}
function De(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (const a in e) if (Ie(e[a], t[a]) === !1) return !1;
	return !0;
}
const ce = {
		to: [String, Object],
		replace: Boolean,
		href: String,
		target: String,
		disable: Boolean,
	},
	tt = {
		...ce,
		exact: Boolean,
		activeClass: { type: String, default: 'q-router-link--active' },
		exactActiveClass: {
			type: String,
			default: 'q-router-link--exact-active',
		},
	};
function Ne({ fallbackTag: e, useDisableForRouterLinkProps: t = !0 } = {}) {
	const a = F(),
		{ props: n, proxy: l, emit: f } = a,
		c = ze(a),
		u = o(() => n.disable !== !0 && n.href !== void 0),
		q =
			t === !0
				? o(
						() =>
							c === !0 &&
							n.disable !== !0 &&
							u.value !== !0 &&
							n.to !== void 0 &&
							n.to !== null &&
							n.to !== ''
				  )
				: o(
						() =>
							c === !0 &&
							u.value !== !0 &&
							n.to !== void 0 &&
							n.to !== null &&
							n.to !== ''
				  ),
		h = o(() => (q.value === !0 ? _(n.to) : null)),
		s = o(() => h.value !== null),
		y = o(() => u.value === !0 || s.value === !0),
		i = o(() =>
			n.type === 'a' || y.value === !0 ? 'a' : n.tag || e || 'div'
		),
		k = o(() =>
			u.value === !0
				? { href: n.href, target: n.target }
				: s.value === !0
				? { href: h.value.href, target: n.target }
				: {}
		),
		b = o(() => {
			if (s.value === !1) return -1;
			const { matched: g } = h.value,
				{ length: $ } = g,
				S = g[$ - 1];
			if (S === void 0) return -1;
			const R = l.$route.matched;
			if (R.length === 0) return -1;
			const B = R.findIndex(ee.bind(null, S));
			if (B !== -1) return B;
			const K = Z(g[$ - 2]);
			return $ > 1 && Z(S) === K && R[R.length - 1].path !== K
				? R.findIndex(ee.bind(null, g[$ - 2]))
				: B;
		}),
		p = o(
			() =>
				s.value === !0 &&
				b.value !== -1 &&
				Ke(l.$route.params, h.value.params)
		),
		d = o(
			() =>
				p.value === !0 &&
				b.value === l.$route.matched.length - 1 &&
				De(l.$route.params, h.value.params)
		),
		x = o(() =>
			s.value === !0
				? d.value === !0
					? ` ${n.exactActiveClass} ${n.activeClass}`
					: n.exact === !0
					? ''
					: p.value === !0
					? ` ${n.activeClass}`
					: ''
				: ''
		);
	function _(g) {
		try {
			return l.$router.resolve(g);
		} catch {}
		return null;
	}
	function L(
		g,
		{ returnRouterError: $, to: S = n.to, replace: R = n.replace } = {}
	) {
		if (n.disable === !0) return g.preventDefault(), Promise.resolve(!1);
		if (
			g.metaKey ||
			g.altKey ||
			g.ctrlKey ||
			g.shiftKey ||
			(g.button !== void 0 && g.button !== 0) ||
			n.target === '_blank'
		)
			return Promise.resolve(!1);
		g.preventDefault();
		const B = l.$router[R === !0 ? 'replace' : 'push'](S);
		return $ === !0 ? B : B.then(() => {}).catch(() => {});
	}
	function C(g) {
		if (s.value === !0) {
			const $ = (S) => L(g, S);
			f('click', g, $), g.defaultPrevented !== !0 && $();
		} else f('click', g);
	}
	return {
		hasRouterLink: s,
		hasHrefLink: u,
		hasLink: y,
		linkTag: i,
		resolvedLink: h,
		linkIsActive: p,
		linkIsExactActive: d,
		linkClass: x,
		linkAttrs: k,
		getLink: _,
		navigateToRouterLink: L,
		navigateOnClick: C,
	};
}
const ne = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
	Qe = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 },
	Ve = ['button', 'submit', 'reset'],
	Fe = /[^\s]\/[^\s]/,
	Ue = ['flat', 'outline', 'push', 'unelevated'];
function He(e, t) {
	return e.flat === !0
		? 'flat'
		: e.outline === !0
		? 'outline'
		: e.push === !0
		? 'push'
		: e.unelevated === !0
		? 'unelevated'
		: t;
}
const We = {
		...re,
		...ce,
		type: { type: String, default: 'button' },
		label: [Number, String],
		icon: String,
		iconRight: String,
		...Ue.reduce((e, t) => (e[t] = Boolean) && e, {}),
		square: Boolean,
		rounded: Boolean,
		glossy: Boolean,
		size: String,
		fab: Boolean,
		fabMini: Boolean,
		padding: String,
		color: String,
		textColor: String,
		noCaps: Boolean,
		noWrap: Boolean,
		dense: Boolean,
		tabindex: [Number, String],
		ripple: { type: [Boolean, Object], default: !0 },
		align: { ...Me.align, default: 'center' },
		stack: Boolean,
		stretch: Boolean,
		loading: { type: Boolean, default: null },
		disable: Boolean,
	},
	Xe = { ...We, round: Boolean };
function Ye(e) {
	const t = ue(e, Qe),
		a = je(e),
		{
			hasRouterLink: n,
			hasLink: l,
			linkTag: f,
			linkAttrs: c,
			navigateOnClick: u,
		} = Ne({ fallbackTag: 'button' }),
		q = o(() => {
			const d = e.fab === !1 && e.fabMini === !1 ? t.value : {};
			return e.padding !== void 0
				? Object.assign({}, d, {
						padding: e.padding
							.split(/\s+/)
							.map((x) => (x in ne ? ne[x] + 'px' : x))
							.join(' '),
						minWidth: '0',
						minHeight: '0',
				  })
				: d;
		}),
		h = o(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0),
		s = o(() => e.disable !== !0 && e.loading !== !0),
		y = o(() => (s.value === !0 ? e.tabindex || 0 : -1)),
		i = o(() => He(e, 'standard')),
		k = o(() => {
			const d = { tabindex: y.value };
			return (
				l.value === !0
					? Object.assign(d, c.value)
					: Ve.includes(e.type) === !0 && (d.type = e.type),
				f.value === 'a'
					? (e.disable === !0
							? (d['aria-disabled'] = 'true')
							: d.href === void 0 && (d.role = 'button'),
					  n.value !== !0 &&
							Fe.test(e.type) === !0 &&
							(d.type = e.type))
					: e.disable === !0 &&
					  ((d.disabled = ''), (d['aria-disabled'] = 'true')),
				e.loading === !0 &&
					e.percentage !== void 0 &&
					Object.assign(d, {
						role: 'progressbar',
						'aria-valuemin': 0,
						'aria-valuemax': 100,
						'aria-valuenow': e.percentage,
					}),
				d
			);
		}),
		b = o(() => {
			let d;
			e.color !== void 0
				? e.flat === !0 || e.outline === !0
					? (d = `text-${e.textColor || e.color}`)
					: (d = `bg-${e.color} text-${e.textColor || 'white'}`)
				: e.textColor && (d = `text-${e.textColor}`);
			const x =
				e.round === !0
					? 'round'
					: `rectangle${
							h.value === !0
								? ' q-btn--rounded'
								: e.square === !0
								? ' q-btn--square'
								: ''
					  }`;
			return (
				`q-btn--${i.value} q-btn--${x}` +
				(d !== void 0 ? ' ' + d : '') +
				(s.value === !0
					? ' q-btn--actionable q-focusable q-hoverable'
					: e.disable === !0
					? ' disabled'
					: '') +
				(e.fab === !0
					? ' q-btn--fab'
					: e.fabMini === !0
					? ' q-btn--fab-mini'
					: '') +
				(e.noCaps === !0 ? ' q-btn--no-uppercase' : '') +
				(e.dense === !0 ? ' q-btn--dense' : '') +
				(e.stretch === !0 ? ' no-border-radius self-stretch' : '') +
				(e.glossy === !0 ? ' glossy' : '') +
				(e.square ? ' q-btn--square' : '')
			);
		}),
		p = o(
			() =>
				a.value +
				(e.stack === !0 ? ' column' : ' row') +
				(e.noWrap === !0 ? ' no-wrap text-no-wrap' : '') +
				(e.loading === !0 ? ' q-btn__content--hidden' : '')
		);
	return {
		classes: b,
		style: q,
		innerClasses: p,
		attributes: k,
		hasLink: l,
		linkTag: f,
		navigateOnClick: u,
		isActionable: s,
	};
}
const { passiveCapture: E } = pe;
let T = null,
	A = null,
	O = null;
var nt = V({
	name: 'QBtn',
	props: {
		...Xe,
		percentage: Number,
		darkPercentage: Boolean,
		onTouchstart: [Function, Array],
	},
	emits: ['click', 'keydown', 'mousedown', 'keyup'],
	setup(e, { slots: t, emit: a }) {
		const { proxy: n } = F(),
			{
				classes: l,
				style: f,
				innerClasses: c,
				attributes: u,
				hasLink: q,
				linkTag: h,
				navigateOnClick: s,
				isActionable: y,
			} = Ye(e),
			i = U(null),
			k = U(null);
		let b = null,
			p,
			d = null;
		const x = o(
				() => e.label !== void 0 && e.label !== null && e.label !== ''
			),
			_ = o(() =>
				e.disable === !0 || e.ripple === !1
					? !1
					: {
							keyCodes: q.value === !0 ? [13, 32] : [13],
							...(e.ripple === !0 ? {} : e.ripple),
					  }
			),
			L = o(() => ({ center: e.round })),
			C = o(() => {
				const r = Math.max(0, Math.min(100, e.percentage));
				return r > 0
					? {
							transition: 'transform 0.6s',
							transform: `translateX(${r - 100}%)`,
					  }
					: {};
			}),
			g = o(() => {
				if (e.loading === !0)
					return {
						onMousedown: j,
						onTouchstart: j,
						onClick: j,
						onKeydown: j,
						onKeyup: j,
					};
				if (y.value === !0) {
					const r = { onClick: S, onKeydown: R, onMousedown: K };
					if (n.$q.platform.has.touch === !0) {
						const m = e.onTouchstart !== void 0 ? '' : 'Passive';
						r[`onTouchstart${m}`] = B;
					}
					return r;
				}
				return { onClick: P };
			}),
			$ = o(() => ({
				ref: i,
				class: 'q-btn q-btn-item non-selectable no-outline ' + l.value,
				style: f.value,
				...u.value,
				...g.value,
			}));
		function S(r) {
			if (i.value !== null) {
				if (r !== void 0) {
					if (r.defaultPrevented === !0) return;
					const m = document.activeElement;
					if (
						e.type === 'submit' &&
						m !== document.body &&
						i.value.contains(m) === !1 &&
						m.contains(i.value) === !1
					) {
						i.value.focus();
						const I = () => {
							document.removeEventListener('keydown', P, !0),
								document.removeEventListener('keyup', I, E),
								i.value !== null &&
									i.value.removeEventListener('blur', I, E);
						};
						document.addEventListener('keydown', P, !0),
							document.addEventListener('keyup', I, E),
							i.value.addEventListener('blur', I, E);
					}
				}
				s(r);
			}
		}
		function R(r) {
			i.value !== null &&
				(a('keydown', r),
				N(r, [13, 32]) === !0 &&
					A !== i.value &&
					(A !== null && M(),
					r.defaultPrevented !== !0 &&
						(i.value.focus(),
						(A = i.value),
						i.value.classList.add('q-btn--active'),
						document.addEventListener('keyup', w, !0),
						i.value.addEventListener('blur', w, E)),
					P(r)));
		}
		function B(r) {
			i.value !== null &&
				(a('touchstart', r),
				r.defaultPrevented !== !0 &&
					(T !== i.value &&
						(T !== null && M(),
						(T = i.value),
						(b = r.target),
						b.addEventListener('touchcancel', w, E),
						b.addEventListener('touchend', w, E)),
					(p = !0),
					d !== null && clearTimeout(d),
					(d = setTimeout(() => {
						(d = null), (p = !1);
					}, 200))));
		}
		function K(r) {
			i.value !== null &&
				((r.qSkipRipple = p === !0),
				a('mousedown', r),
				r.defaultPrevented !== !0 &&
					O !== i.value &&
					(O !== null && M(),
					(O = i.value),
					i.value.classList.add('q-btn--active'),
					document.addEventListener('mouseup', w, E)));
		}
		function w(r) {
			if (
				i.value !== null &&
				!(
					r !== void 0 &&
					r.type === 'blur' &&
					document.activeElement === i.value
				)
			) {
				if (r !== void 0 && r.type === 'keyup') {
					if (A === i.value && N(r, [13, 32]) === !0) {
						const m = new MouseEvent('click', r);
						(m.qKeyEvent = !0),
							r.defaultPrevented === !0 && ye(m),
							r.cancelBubble === !0 && ae(m),
							i.value.dispatchEvent(m),
							P(r),
							(r.qKeyEvent = !0);
					}
					a('keyup', r);
				}
				M();
			}
		}
		function M(r) {
			const m = k.value;
			r !== !0 &&
				(T === i.value || O === i.value) &&
				m !== null &&
				m !== document.activeElement &&
				(m.setAttribute('tabindex', -1), m.focus()),
				T === i.value &&
					(b !== null &&
						(b.removeEventListener('touchcancel', w, E),
						b.removeEventListener('touchend', w, E)),
					(T = b = null)),
				O === i.value &&
					(document.removeEventListener('mouseup', w, E), (O = null)),
				A === i.value &&
					(document.removeEventListener('keyup', w, !0),
					i.value !== null &&
						i.value.removeEventListener('blur', w, E),
					(A = null)),
				i.value !== null && i.value.classList.remove('q-btn--active');
		}
		function j(r) {
			P(r), (r.qSkipRipple = !0);
		}
		return (
			be(() => {
				M(!0);
			}),
			Object.assign(n, {
				click: (r) => {
					y.value === !0 && S(r);
				},
			}),
			() => {
				let r = [];
				e.icon !== void 0 &&
					r.push(
						v(Y, {
							name: e.icon,
							left: e.stack !== !0 && x.value === !0,
							role: 'img',
						})
					),
					x.value === !0 &&
						r.push(v('span', { class: 'block' }, [e.label])),
					(r = z(t.default, r)),
					e.iconRight !== void 0 &&
						e.round === !1 &&
						r.push(
							v(Y, {
								name: e.iconRight,
								right: e.stack !== !0 && x.value === !0,
								role: 'img',
							})
						);
				const m = [v('span', { class: 'q-focus-helper', ref: k })];
				return (
					e.loading === !0 &&
						e.percentage !== void 0 &&
						m.push(
							v(
								'span',
								{
									class:
										'q-btn__progress absolute-full overflow-hidden' +
										(e.darkPercentage === !0
											? ' q-btn__progress--dark'
											: ''),
								},
								[
									v('span', {
										class: 'q-btn__progress-indicator fit block',
										style: C.value,
									}),
								]
							)
						),
					m.push(
						v(
							'span',
							{
								class:
									'q-btn__content text-center col items-center q-anchor--skip ' +
									c.value,
							},
							r
						)
					),
					e.loading !== null &&
						m.push(
							v(ke, { name: 'q-transition--fade' }, () =>
								e.loading === !0
									? [
											v(
												'span',
												{
													key: 'loading',
													class: 'absolute-full flex flex-center',
												},
												t.loading !== void 0
													? t.loading()
													: [v(_e)]
											),
									  ]
									: null
							)
						),
					he(v(h.value, $.value, m), [[Ae, _.value, void 0, L.value]])
				);
			}
		);
	},
});
export {
	Y as Q,
	et as a,
	Ne as b,
	Pe as c,
	nt as d,
	Ze as g,
	tt as u,
	ze as v,
};
