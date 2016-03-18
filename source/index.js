import {makeDOMDriver} from '@cycle/dom'
import {Observable as $$} from 'rx'
import moment from 'moment'
import 'moment/locale/it'
import 'moment-duration-format'
import {run} from '@cycle/core'
import {data} from './storage'
import Product from './components/Product'
import view from './view'

const drivers = {
	DOM: makeDOMDriver('#content')
}

run(main, drivers)

function main({DOM}) {
	const products = data.products
		.map(product => Object.assign(product, {
			departureTime: moment(product.departureTime).format('HH:mm'),
			arrivalTime: moment(product.arrivalTime).format('HH:mm'),
			duration: moment
				.duration(parseInt(product.duration), 'minutes')
				.format('h[h] m[m]')
		}))
		.map(product => Product({DOM, props$: $$.just(product)}))

	/**
	 * [from description]
	 * @param  {[type]} products [description]
	 * @return {[type]}          [description]
	 */
	const choice$ = $$.from(products)
		.pluck('value$')
		.mergeAll()
		.startWith(false)
		// .subscribe(x => console.log(x))

	const state$ = $$.just(products)
		// .map(x => ({products: x, current: false}))
		.combineLatest(
			choice$,
			(products, value) => {
				// console.log('[state]', products, value)
				return {products, value}
			}
		)

	const vtree$ = view(state$)

	return {
		DOM: vtree$
	}
}
