import React, {Component, PropTypes} from 'react'

class RouteInfo extends Component {
	static propTypes = {
		number: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		from: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
		duration: PropTypes.string.isRequired,
		arrivalTime: PropTypes.string.isRequired,
		departureTime: PropTypes.string.isRequired,
		agency: PropTypes.string.isRequired,
		current: PropTypes.object,
	}

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<table className={`route-info route-info--${this.props.agency}`}>
				<tbody>
					<tr>
						<td className="route-info__departure">{this.props.departureTime}</td>
						<td><div className="route-info__head"></div></td>
						<td className="route-info__from">{this.props.from}</td>
					</tr>
					<tr className="small-muted">
						<td className="route-info__duration">{this.props.duration}</td>
						<td className="route-info__body">
							<div className="route-info__body__line"></div>
						</td>
						<td className="route-info__train">{this.props.category} {this.props.number}</td>
					</tr>
					<tr>
						<td className="route-info__arrival">{this.props.arrivalTime}</td>
						<td><div className="route-info__tail"></div></td>
						<td className="route-info__to">{this.props.to}</td>
					</tr>
				</tbody>
			</table>
		)
	}
}

export default RouteInfo
