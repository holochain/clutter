import React, { Component } from 'react'
import Meow from './Meow'

class UserFeed extends Component {
  componentDidMount() {
    this.setupForNewUser()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userHash !== this.props.userHash) {
      this.setupForNewUser()
    }
  }
  setupForNewUser() {
    if (!this.props.userHandle) this.props.getHandle()
    this.props.getPosts()
    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(this.props.getPosts, 1000)
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval)
  }
  render() {
    return (
      <div id="meows">
        <h2 id="user-header">{this.props.userHandle}</h2>
        {this.props.postList.map(post => <Meow post={post} key={post.stamp} />)}
      </div>
    )
  }
}

export default UserFeed