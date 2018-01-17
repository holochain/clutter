import React from 'react'
import ReactDOM from 'react-dom'
import { compact } from 'lodash'
import { applyMiddleware, compose, createStore } from 'redux'
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
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(clutterApp, undefined, composeEnhancers(applyMiddleware(...middleware)))

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
registerServiceWorker()
