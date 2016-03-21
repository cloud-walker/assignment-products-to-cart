import React, {Component, PropTypes} from 'react'
import ProductList from './ProductList'
import Cart from './Cart'
import Checkout from './Checkout'

class Main extends Component {
	static propTypes = {
		products: PropTypes.array.isRequired
	}

	constructor() {
		super()

		this.state = {
			current: null,
			price: null
		}
	}

	handleAddToCart(current, price) {
		this.setState({current, price})
	}

	render() {
		const cart = !this.state.current ? false : <Cart {...this.state.current} price={this.state.price} />
		const checkout = !this.state.price ? false : <Checkout price={this.state.price} />

		return (
			<div className="container">
				<ProductList
					onAddToCart={this.handleAddToCart.bind(this)}
					data={this.props.products}
				/>

				<div className="sidebar">
					{cart}
					{checkout}
				</div>
			</div>
		)
	}
}

export default Main
