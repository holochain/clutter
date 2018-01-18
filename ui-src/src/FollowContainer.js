import { connect } from 'react-redux'
import Follow from './components/Follow'
import {
  follow,
  unfollow
} from './actions'

const mapStateToProps = state => {
  return {
    following: Object.keys(state.follows).map(userHash => {
      return {
        userHash,
        handle: state.handles[userHash]
      }
    }),
    notFollowing: Object.keys(state.handles)
      .filter(userHash => !state.follows[userHash] && userHash !== state.me)
      .map(userHash => {
        return {
          userHash,
          handle: state.handles[userHash]
       }
      })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userHash, then) => {
      dispatch(follow(userHash, then))
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
