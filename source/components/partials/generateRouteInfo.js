import {
	div,
	table, tbody, tr, td
} from '@cycle/dom'

export default function (product) {
	return table(`.route-info.route-info--${product.agency}`, [
		tbody([
			tr([
				td('.route-info__departure', product.departureTime),
				td(div('.route-info__head')),
				td('.route-info__from', product.from)
			]),
			tr('.small-muted', [
				td('.route-info__duration', product.duration),
				td('.route-info__body', div('.route-info__body__line')),
				td('.route-info__train', `${product.category} ${product.number}`)
			]),
			tr([
				td('.route-info__arrival', product.arrivalTime),
				td(div('.route-info__tail')),
				td('.route-info__to', product.to)
			])
		])
	])
}
