import { connect } from 'react-redux'
import FollowingFeed from './FollowingFeed'
import { getPostsBy, getFollow } from './actions'

const mapStateToProps = state => {
  const listOfFollowingPlusSelf = Object.keys(state.follows).concat([state.me])
  // is the post by someone active user is following (or themselves)?
  const byFollowing = (pId) => listOfFollowingPlusSelf.indexOf(state.posts[pId].author) > -1
  return {
    postList: Object.keys(state.posts).filter(byFollowing).sort().reverse().map(pId => {
      return Object.assign({}, state.posts[pId], {
        userHandle: state.handles[state.posts[pId].author] || state.posts[pId].author
      })
    }),
    me: state.me,
    follows: Object.keys(state.follows)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostsBy: (userHashes, then) => {
      dispatch(getPostsBy(userHashes, then))
    },
    getFollow: (userHash, type, then) => {
      dispatch(getFollow(userHash, type, then))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    getMyFeed: () => {
      // my feed is a list of posts that are either by me or people I follow
      const users = Array.from(stateProps.follows)
      if (!users.includes(stateProps.me)) {
        users.push(stateProps.me)
      }
      dispatchProps.getPostsBy(users)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(FollowingFeed)
