import isolate from '@cycle/isolate'
import {Observable as $$} from 'rx'
import $ from 'jquery'
import view from './view'

function Product({DOM, props$}) {
	/**
	 * Observable che calcola e restituisce il prezzo
	 * di default del prodotto.
	 * Il prezzo di default dovrebbe essere il più vantaggioso:
	 * a parità di prezzo più basso, si sceglie la classe migliore.
	 * @type {Observable}
	 */
	const defaultPrice$ = props$
		.flatMap(x => $$.from(x.classes)
			.flatMap(x => x.fares, (a, b, ai, bi) =>
				Object.assign(b, {
					classId: ai,
					fareId: bi
				})
			)
			.filter(x => x.price)
			.min((a, b) =>
				Math.min(a.price.amount, b.price.amount)
			)
			.map(x => ({
				classId: x.classId,
				fareId: x.fareId,
				amount: x.price.amount,
			}))
		)
		// .subscribe(
		// 	x => console.log('[default price]', x),
		// 	err => console.log('[default price]', err.message)
		// )

	/**
	 * Observable che traccia la scelta della combinazione
	 * (classe/tariffa) da parte dell'utente.
	 * @type {Observable}
	 */
	const choice$ = DOM
		.select('.fares-table__choice:not(.fares-table__choice--empty):not(.fares-table__choice--active)')
		.events('click')
		.map(e => $(e.target)
			.closest('.fares-table__choice')
			.data()
		)

	/**
	 * Observable che combina la scelta del prezzo con
	 * il prodotto per sfornare l'oggetto prezzo corrispondente.
	 */
	const nextPrice$ = props$.combineLatest(
		choice$,
		(props, choice) => {
			const _class = props.classes[choice.classId]
			const fare = _class.fares[choice.fareId]

			return {
				classId: choice.classId,
				fareId: choice.fareId,
				amount: fare.price.amount
			}
		}
	)
	// .subscribe(x => console.log('[price selected]', x))

	/**
	 * Observable che rappresenta tutti gli oggetti price,
	 * a partire del defaultPrice$.
	 * @type {Observable}
	 */
	const price$ = defaultPrice$
		.concat(nextPrice$)
		// .subscribe(x => console.log('[price]', x))

	const cta$ = DOM
		.select('.product__cta')
		.events('click')

	/**
	 * Observable che rappresenta lo stato del prodotto.
	 * @type {Observable}
	 */
	const state$ = props$.combineLatest(
		price$,
		(product, price) => ({product, price})
	)

	const vtree$ = view(state$)

	const value$ = props$.combineLatest(
		price$,
		cta$,
		(current, price, cta) => ({current, price})
	)

	return {
		DOM: vtree$,
		value$
	}
}

export default sources => isolate(Product)(sources)
