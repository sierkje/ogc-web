import React from 'react'
import ReactDom from 'react-dom'

import App from './components/App'

const wrapper = document.createElement('div')
wrapper.id = 'page-wrapper'

document.body.append(wrapper)

ReactDom.render(<App />, wrapper)
