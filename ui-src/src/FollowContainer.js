import { connect } from 'react-redux'
import Follow from './components/Follow'
import {
  follow,
  unfollow
} from './actions'

const mapStateToProps = state => {
  // console.log('state.handles ' + JSON.stringify(state.handles))
  return {
    following: Object.keys(state.follows).map(handle => {
      return {
        handle
      }
    }),
    notFollowing: Object.keys(state.handles)
      .filter(handleHash => !state.follows[state.handles[handleHash].handle] && state.handles[handleHash].handle !== state.handle)
      .map(handleHash => {
        return {
          handleHash,
          handle: state.handles[handleHash].handle
       }
      })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (handle, then) => {
      dispatch(follow(handle, then))
    },
    unfollow: (handle, then) => {
      dispatch(unfollow(handle, then))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Follow)
