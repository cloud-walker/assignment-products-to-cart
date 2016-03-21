import React, {Component, PropTypes} from 'react'
import {Observable as $$} from 'rx'
import moment from 'moment'
import 'moment/locale/it'
import 'moment-duration-format'
import RouteInfo from './RouteInfo'

class Product extends Component {
	static propTypes = {
		agency: PropTypes.string.isRequired,
		number: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		from: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
		duration: PropTypes.string.isRequired,
		arrivalTime: PropTypes.string.isRequired,
		departureTime: PropTypes.string.isRequired,
		current: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.state = {
			expanded: false,
			price: this.calculateBestPrice(this.props.classes)
		}
	}

	calculateBestPrice(data) {
		let res = 0

		$$.from(data)
			.flatMap(x => x.fares, (a, b) => {
				return {
					class: a.name,
					fare: b.name,
					price: b.price
				}
			})
			.filter(x => x.price)
			.minBy(x => parseInt(x.price.amount))
			.flatMap(x => x)
			.last()
			.subscribe(x => res = x)

		return res
	}

	handleExpand() {
		this.setState({
			expanded: !this.state.expanded
		})
	}

	handleAddToCart() {
		const current = {
			agency: this.props.agency,
			duration: this.props.duration,
			arrivalTime: this.props.arrivalTime,
			departureTime: this.props.departureTime,
			from: this.props.from,
			to: this.props.to,
			number: this.props.number,
			category: this.props.category
		}

		this.setState({expanded: current.number != this.props.number})
		this.props.onAddToCart(current, this.state.price)
	}

	handleUpdatePrice(_class, fare, price) {
		this.setState({
			price: {
				class: _class,
				fare,
				price
			}
		})
	}

	generatePriceRow(source, fare) {
		let res = [].concat.apply([], source.map(x => {
			return x.fares.map(y => ({
				class: x.name,
				fare: y.name,
				price: y.price
			}))
		}))
			.filter(x => x.fare == fare)
			.map(x => {
				let className = 'fares-table__choice'
				let content = '_'

				if (!x.price) {
					className += ' fares-table__choice--empty'
				} else {

					if (this.state.price.price === x.price) {
						className += ' fares-table__choice--active'
					}

					content =
						<div
							className="fares-table__price"
							onClick={this.handleUpdatePrice.bind(this, x.class, x.fare, x.price)}
						>
							<div className="fares-table__price__amount">
								€
								<span className="fares-table__price__int">{x.price.amount}</span>
								<span className="fares-table__price__dec">.00</span>
							</div>
						</div>
				}

				return {className, content}
			})

		return res
	}

	generateExpandButton() {
		const current = this.props.current
		const number = this.props.number
		let className = 'product__expand'
		let value = 'Seleziona'

		if (this.state.expanded) {
			className += ' product__expand--checked'
		}
		if (current && current.number == number) {
			className += ' product__expand--selected'
			value = 'Selezionato'
		}

		return <input
			className={className}
			onClick={this.handleExpand.bind(this)}
			type="button"
			value={value}
		/>
	}

	render() {
		console.log(this.props.current)
		const current = this.props.current
		const classes = this.props.classes
		const price = this.state.price ? this.state.price.price.amount : 0
		const details = !this.state.expanded || (current && current.number == this.props.number) ? false : (
			<div className="product__details">
				<div className="product__details__fares">
					<table className="fares-table">
						<thead>
							<tr>
								<th></th>
								{classes.map((_class, i) =>
									<th key={i} className="fares-table__class">{_class.name}</th>
								)}
							</tr>
						</thead>

						<tbody>
							{classes[0].fares.map((fare, i) =>
								<tr key={i}>
									<th className="fares-table__fare">{fare.name}</th>
									{this.generatePriceRow(classes, fare.name).map((item, i) =>
										<td className={item.className} key={i}>
											{item.content}
										</td>
									)}
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<input
					className="product__cta"
					type="button"
					value="Continua"
					onClick={this.handleAddToCart.bind(this)}
				/>
			</div>
		)

		return (
			<div className="product">
				<div className="product__main">
					<div className="product__logo product-logo">
						<img src={`logo_${this.props.agency}.png`} alt={this.agency} />
					</div>

					<div className="product__info">
						<RouteInfo
							agency={this.props.agency}
							departureTime={this.props.departureTime}
							arrivalTime={this.props.arrivalTime}
							from={this.props.from}
							to={this.props.to}
							duration={this.props.duration}
							number={this.props.number}
							category={this.props.category}
						/>
					</div>

					<div className="product__price">
						<div className="product__price__amount">
							€
							<span className="product__price__int">{price}</span>
							<span className="product__price__dec">.00</span>
						</div>
					</div>

					{this.generateExpandButton()}
				</div>

				{details}
			</div>
		)
	}
}

export default Product
