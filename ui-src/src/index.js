import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import CreateStore from './store'

let stored = CreateStore()

ReactDOM.render(
  <Root store={stored.store} persistor={stored.persistor} />,
  document.getElementById('root'))
registerServiceWorker()
