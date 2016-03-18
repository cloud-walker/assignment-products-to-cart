import {
	div, span,
	img,
	table, tbody, thead, tr, th,
	input
} from '@cycle/dom'
import generateRouteInfo from '../partials/generateRouteInfo'
import generateFaresRow from './partials/generateFaresRow'

function view(state$) {
	return state$.map(({product, price}) => {
		console.log('[product render]', product, price)

		return div('.product', [
			div('.product__main', [
				div('.product__logo.product-logo', img({
					src: `/logo_${product.agency}.png`,
					alt: product.agency
				})),

				generateRouteInfo(product),

				div('.product__price', [
					span('.product__price__amount', [
						'€',
						span('.product__price__int', price.amount),
						span('.product__price__dec', '.00')
					]),
					div('.small-muted', 'per adulto')
				]),

				input('.product__expand', {
					type: 'button',
					value: 'Seleziona'
				})
			]),

			div('.product__details', [
				div('.product__details__fares', [
					table('.fares-table', [
						thead(
							tr([
								th(),
								product.classes.map(_class =>
									th('.fares-table__class', _class.name)
								)
							])
						),
						tbody([
							tr([
								th('.fares-table__fare', product.classes[0].fares[0].name),
								generateFaresRow(product.classes, 0, price)
							]),
							tr([
								th('.fares-table__fare', product.classes[0].fares[1].name),
								generateFaresRow(product.classes, 1, price)
							]),
							tr([
								th('.fares-table__fare', product.classes[0].fares[2].name),
								generateFaresRow(product.classes, 2, price)
							])
						])
					])
				]),

				input('.product__cta', {
					type: 'button',
					value: 'Continua'
				})
			])
		])
	})
}

export default view
