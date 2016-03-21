import React, {Component, PropTypes} from 'react'
import RouteInfo from './RouteInfo'

class Cart extends Component {
	static propTypes = {
		agency: PropTypes.string.isRequired,
		departureTime: PropTypes.string.isRequired,
		arrivalTime: PropTypes.string.isRequired,
		from: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
		duration: PropTypes.string.isRequired,
		number: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="cart">
				<div className="cart__header">
					CARRELLO
				</div>

				<div className="cart__content">
					<div className="cart__content__header">
						<div className="product-logo">
							<img
								src={`/logo_${this.props.agency}.png`}
								alt={this.props.agency}
							/>
						</div>

						<div className="cart__price">
							<div className="cart__price__amount">
								€
								<span className="cart__price__int">{this.props.price.price.amount}</span>
								<span className="cart__price__dec">.00</span>
							</div>
						</div>
					</div>

					<RouteInfo
						departureTime={this.props.departureTime}
						arrivalTime={this.props.arrivalTime}
						from={this.props.from}
						to={this.props.to}
						duration={this.props.duration}
						number={this.props.number}
						category={this.props.category}
					/>

					<div className="cart__content__footer">
						<div className="cart__class">
							CLASSE <strong>{this.props.price.class}</strong>
						</div>

						<div className="cart__fare">
							TARIFFA <strong>{this.props.price.fare}</strong>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Cart
