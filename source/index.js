import React from 'react'
import {render} from 'react-dom'
import moment from 'moment'
import 'moment/locale/it'
import 'moment-duration-format'
import {products} from './storage'
import Main from './components/Main'

const root = document.getElementById('content')
const vdom = <Main products={products.map(x => Object.assign(x, {
	arrivalTime: moment(x.arrivalTime).format('HH:mm'),
	departureTime: moment(x.departureTime).format('HH:mm'),
	duration: moment.duration(parseInt(x.duration), 'minutes').format('h[h] m[m]')
}))} />

render(vdom, root)
