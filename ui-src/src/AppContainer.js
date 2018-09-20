import { connect } from 'react-redux'
import App from './App'
import {
  appProperty,
  resetState,
  getFirstName,
  getHandle,
  getHandles,
  getFollow,
  getPostsBy,
  getProfilePic
} from './actions'

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => {
      dispatch(resetState())
    },
    getFirstName: () => {
      dispatch(getFirstName())
    },
    getMyHandle: () => {
      dispatch(appProperty('Agent_Handle'))
    },
    getHandle: (userHash, isMe, then) => {
      dispatch(getHandle(userHash, isMe, then))
    },
    getHandles: then => {
      dispatch(getHandles(then))
    },
    getFollow: (handle, type, then) => {
      dispatch(getFollow(handle, type, then))
    },
    getPostsBy: (handles, then) => {
      dispatch(getPostsBy(handles, then))
    },
    getProfilePic: () => {
      dispatch(getProfilePic())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
