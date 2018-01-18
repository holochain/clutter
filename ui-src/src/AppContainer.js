import { connect } from 'react-redux'
import App from './App'
import {
  appProperty,
  getHandle,
  getHandles,
  getFollow,
  getPostsBy
} from './actions'

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyAppKeyHash: () => {
      dispatch(appProperty('App_Key_Hash'))
    },
    getHandle: (userHash, isMe, then) => {
      dispatch(getHandle(userHash, isMe, then))
    },
    getHandles: (then) => {
      dispatch(getHandles(then))
    },
    getFollow: (userHash, type, then) => {
      dispatch(getFollow(userHash, type, then))
    },
    getPostsBy: (userHashes, then) => {
      dispatch(getPostsBy(userHashes, then))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
