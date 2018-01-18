import { connect } from 'react-redux'
import Follow from './components/Follow'
import {
  follow,
  unfollow,
  getAgent,
  handleNotFound
} from './actions'

const mapStateToProps = state => {
  return {
    following: Object.keys(state.follows).map(userHash => {
      return {
        userHash,
        handle: state.handles[userHash]
      }
    }),
    handleNotFound: state.handleNotFound
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (handle) => {
      dispatch(getAgent(handle, userHash => {
        if (userHash) {
          dispatch(follow(userHash))
        } else {
          dispatch(handleNotFound(handle))
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
