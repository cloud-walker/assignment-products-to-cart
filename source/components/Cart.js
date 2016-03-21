import React, {Component} from 'react'

class Cart extends Component {
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
