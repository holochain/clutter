import { connect } from 'react-redux'
import FollowingFeed from './FollowingFeed'
import { getPostsBy, getFollow } from './actions'

const mapStateToProps = state => {
  const listOfFollowingPlusSelf = Object.keys(state.follows).concat([state.handle])
  // is the post by someone active user is following (or themselves)?
  const byFollowing = (pId) => listOfFollowingPlusSelf.indexOf(state.posts[pId].author) > -1
  return {
    postList: Object.keys(state.posts).filter(byFollowing).sort().reverse().map(pId => {
      return Object.assign({}, state.posts[pId], {
        userHandle: state.handles[state.posts[pId].author] || state.posts[pId].author
      })
    }),
    handle: state.handle,
    follows: Object.keys(state.follows)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostsBy: (handles, then) => {
      dispatch(getPostsBy(handles, then))
    },
    getFollow: (handle, type, then) => {
      dispatch(getFollow(handle, type, then))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    getMyFeed: (postsBy) => {
      // my feed is a list of posts that are either by me or people I follow
      // console.log('feed ' + JSON.stringify(users))
      dispatchProps.getPostsBy(postsBy)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(FollowingFeed)
