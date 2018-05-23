import { connect } from 'react-redux'
import HashtagFeed from './HashtagFeed'
import { getPostsWithHashtag } from './actions'

const mapStateToProps = (state, ownProps) => {
  const containsTag = (pId) => state.posts[pId].message.includes('#'+ownProps.match.params.hashtag)
  return {
    postList: Object.keys(state.posts).filter(containsTag).sort().reverse().map(pId => {
      return Object.assign({}, state.posts[pId], {
        userHandle: state.handles[state.posts[pId].author] || state.posts[pId].author
      })
    }),
    hashtag: ownProps.match.params.hashtag
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: (hashtag) => {
      dispatch(getPostsWithHashtag([hashtag]))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HashtagFeed)
