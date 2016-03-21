import React, {Component} from 'react'

class Checkout extends Component {
	render() {
		return (
			<div className="checkout">
				<div className="checkout__price">
					<div className="checkout__price__amount">
						€
						<span className="checkout__price__int">{this.props.price.price.amount}</span>
						<span className="checkout__price__dec">.00</span>
					</div>
				</div>

				<input className="checkout__cta" type="button" value="Checkout" />
			</div>
		)
	}
}

export default Checkout
