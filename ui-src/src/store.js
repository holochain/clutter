import { compact } from 'lodash'
import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import promiseMiddleware from 'redux-promise'
import { requestSendingMiddleware, hcMiddleware } from 'hc-redux-middleware'
import clutterApp from './reducers'

const middleware = compact([
  hcMiddleware,
  requestSendingMiddleware,
  promiseMiddleware
])

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, clutterApp)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function CreateStore() {
  let store = createStore(
    persistedReducer,
    undefined,
    composeEnhancers(applyMiddleware(...middleware))
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

export default CreateStore
