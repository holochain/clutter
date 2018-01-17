import { connect } from 'react-redux'
import Follow from './Follow'
import {
  follow,
  unfollow,
  getAgent
} from './actions'

const mapStateToProps = state => {
  return {
    following: Object.keys(state.follows).map(userHash => {
      return {
        userHash,
        handle: state.handles[userHash]
      }
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (handle) => {
      dispatch(getAgent(handle, userHash => {
        if (userHash) {
          dispatch(follow(userHash))
        } else {
          console.log('no user found with handle ' + handle)
        }
      }))
    },
    unfollow: (userHash, then) => {
      dispatch(unfollow(userHash, then))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Follow)
