import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import CreateStore from './store'

let store = CreateStore()

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
registerServiceWorker()
