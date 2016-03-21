import React, {Component, PropTypes} from 'react'
import Product from './Product'

class ProductList extends Component {
	static propTypes: {
		data: PropTypes.array.isRequired,
		onAddToCart: PropTypes.func.isRequired
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
		this.props.onAddToCart(current, price)
	}

	// handleUpdatePrice(price) {
	// 	this.props.onUpdatePrice
	// }

	render() {
		return (
			<div className="products">
				{this.props.data.map((product, i) =>
					<div key={i} className="products__item">
						<Product
							{...product}
							current={this.state.current}
							onAddToCart={this.handleAddToCart.bind(this)}
						/>
					</div>
				)}
			</div>
		)
	}
}

export default ProductList
