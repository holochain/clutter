import { connect } from 'react-redux'
import UserFeed from './UserFeed'
import { getHandle, getPostsBy } from './actions'

const mapStateToProps = (state, ownProps) => {
  const byUser = (pId) => state.posts[pId].author === ownProps.match.params.userHash
  return {
    postList: Object.keys(state.posts).filter(byUser).sort().reverse().map(pId => {
      return Object.assign({}, state.posts[pId], {
        userHandle: state.handles[state.posts[pId].author] || state.posts[pId].author
      })
    }),
    userHandle: state.handles[ownProps.match.params.userHash],
    userHash: ownProps.match.params.userHash
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: () => {
      dispatch(getPostsBy([ownProps.match.params.userHash]))
    },
    getHandle: () => {
      dispatch(getHandle(ownProps.match.params.userHash))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFeed)
