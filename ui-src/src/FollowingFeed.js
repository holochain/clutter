import React, { Component } from 'react'
import Meow from './components/Meow'

class FollowingFeed extends Component {
  componentDidMount () {
    if (this.props.handle && this.props.follows.length) {
      this.setupFeedFetch()
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.follows.length !== prevProps.follows.length || (!prevProps.handle && this.props.handle)) {
      this.setupFeedFetch()
    }
  }
  setupFeedFetch() {
    const postsBy = this.props.follows.concat([this.props.handle])
    this.props.getMyFeed(postsBy)
    this.props.getFollow(this.props.handle, "following")
    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.props.getMyFeed(postsBy)
    }, 2000)
  }
  componentWillUnmount () {
    if (this.interval) clearInterval(this.interval)
  }
  render () {
    return (
      <div id='meows'>
        {this.props.postList.map(post => <Meow post={post} key={post.stamp} />)}
      </div>
    )
  }
}

export default FollowingFeed
