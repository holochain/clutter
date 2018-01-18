import { connect } from 'react-redux'
import Meow from './components/Meow'
import { getPost } from './actions'

const mapStateToProps = (state, ownProps) => {
  const meowHash = ownProps.match.params.meowHash
  const arrayOfPosts = Object.keys(state.posts).map(postStamp => state.posts[postStamp])
  let post = arrayOfPosts.find(p => p.hash === meowHash)
  if (post) {
    post = Object.assign({}, post, {
      userHandle: state.handles[post.author]
    })
  }
  return {
    post
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: () => {
      dispatch(getPost(ownProps.match.params.meowHash))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meow)
