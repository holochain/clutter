import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { compact } from 'lodash'
import { applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import { requestSendingMiddleware, hcMiddleware } from 'hc-redux-middleware'
import clutterApp from './reducers'
import Root from './Root'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const middleware = compact([
  hcMiddleware,
  requestSendingMiddleware,
  promiseMiddleware
])
let store = createStore(clutterApp, undefined, compose(applyMiddleware(...middleware)))

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
registerServiceWorker()
