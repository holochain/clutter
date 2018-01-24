import React, { Component } from 'react'
import Meow from './components/Meow'

class FollowingFeed extends Component {
  componentDidMount () {
    if (this.props.me) {
      this.props.getMyFeed()
      if (this.interval) clearInterval(this.interval)
      this.interval = setInterval(this.props.getMyFeed, 2000)
    }
  }
  componentDidUpdate (prevProps) {
    if (!prevProps.me && this.props.me) {
      this.props.getMyFeed()
      if (this.interval) clearInterval(this.interval)
      this.interval = setInterval(this.props.getMyFeed, 2000)
    }
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
