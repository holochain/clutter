import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppContainer from './AppContainer'

const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Route path='/' component={AppContainer} />
      </Router>
    </PersistGate>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
