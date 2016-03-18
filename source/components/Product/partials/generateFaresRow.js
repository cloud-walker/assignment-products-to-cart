import {div, span, td} from '@cycle/dom'

export default function (classes, fareId, price) {
	return classes.map((_class, i) => {
		const fare = _class.fares[fareId]
		let target = '.fares-table__choice'
		let content = '...'

		if (!fare.price) {
			target += '.fares-table__choice--empty'
			content = '_'
		} else {

			if (price.classId == i && price.fareId == fareId) {
				target += '.fares-table__choice--active'
			}

			content = div('.fares-table__price',
				div('.fares-table__price__amount', [
					'€',
					span('.fares-table__price__int', fare.price.amount),
					span('.fares-table__price__dec', '.00')
				])
			)
		}

		return td(target, {
			attributes: {
				'data-class-id': i,
				'data-fare-id': fareId
			}
		}, content)
	})
}
