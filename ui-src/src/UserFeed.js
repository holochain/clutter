import React, { Component } from 'react'
import Meow from './components/Meow'

class UserFeed extends Component {
  componentDidMount () {
    this.setupForNewUser()
  }
  componentDidUpdate (prevProps) {
    if (prevProps.handle !== this.props.handle) {
      this.setupForNewUser()
    }
  }
  setupForNewUser () {
    this.props.getPosts(this.props.handle)
    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.props.getPosts(this.props.handle)
    }, 1000)
  }
  componentWillUnmount () {
    if (this.interval) clearInterval(this.interval)
  }
  render () {
    return (
      <div id='meows'>
        <h2 id='user-header'>{this.props.handle}</h2>
        {this.props.postList.map(post => <Meow post={post} key={post.stamp} />)}
      </div>
    )
  }
}

export default UserFeed
