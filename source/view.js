import {
	div, span,
	strong,
	img,
	input
} from '@cycle/dom'

import generateRouteInfo from './components/partials/generateRouteInfo'

function view(state$) {
	return state$.map(({products, value}) => {
		console.log('[render]', products, value)
		return div('.container', [
			div('.products', products.map(product =>
				div('.products__item', product.DOM)
			)),
			div('.sidebar', !value ? div('scegli un prodotto stronzo') : [
				div('.cart', [
					div('.cart__header', 'CARRELLO'),
					div('.cart__content', [
						div('.cart__content__header', [
							div('.cart__logo.product-logo', img({
								src: `/logo_${value.current.agency}.png`,
								alt: value.current.agency
							})),

							div('.cart__price', div('.cart__price__amount', [
								'€',
								span('.cart__price__int', value.price.amount),
								span('.cart__price__dec', '.00')
							])),
						]),

						generateRouteInfo(value.current),

						div('.cart__content__footer', [
							div('.cart__class', [
								'CLASSE',
								strong('.cart__class__value', value.price.class)
							]),
							div('.cart__fare', [
								'TARIFFA',
								strong('.cart__fare__value', value.price.fare)
							])
						])
					])
				]),
				div('.checkout', [
					div('.checkout__price', [
						div('.checkout__price__amount', [
							'€',
							span('.checkout__price__int', value.price.amount),
							span('.checkout__price__dec', '.00')
						])
					]),

					input('.checkout__cta', {type: 'button', value: 'Acquista'})
				])
			])
		])
	})
}

export default view
