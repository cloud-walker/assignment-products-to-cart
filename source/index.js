import React from 'react'
import {render} from 'react-dom'
import {products} from './storage'
import Main from './components/Main'

const root = document.getElementById('content')
const vdom = <Main products={products} />

render(vdom, root)
