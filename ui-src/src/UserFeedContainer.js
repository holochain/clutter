import { connect } from 'react-redux'
import UserFeed from './UserFeed'
import { getPostsBy } from './actions'

const mapStateToProps = (state, ownProps) => {
  const byUser = (pId) => state.posts[pId].author === ownProps.match.params.handle
  return {
    postList: Object.keys(state.posts).filter(byUser).sort().reverse().map(pId => {
      return Object.assign({}, state.posts[pId], {
        userHandle: state.handles[state.posts[pId].author] || state.posts[pId].author
      })
    }),
    handle: ownProps.match.params.handle
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: (handle) => {
      dispatch(getPostsBy([handle]))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFeed)
