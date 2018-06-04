import React, { Component } from 'react'
import Meow from './components/Meow'

class HashtagFeed extends Component {

  componentDidMount () {
    this.setupForNewUser()
  }
  componentDidUpdate (prevProps) {
    if (prevProps.hashtag !== this.props.hashtag) {
      this.setupForNewUser()
    }
  }
  setupForNewUser () {
    this.props.getPosts(this.props.hashtag)
    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.props.getPosts(this.props.hashtag)
    }, 1000)
  }
  componentWillUnmount () {
    if (this.interval) clearInterval(this.interval)
  }

  render () {
    return (
      <div id='meows'>
        <h2 id='user-header'>{'#'+this.props.hashtag}</h2>
          {this.props.postList.map(post => <Meow post={post} key={post.stamp} />)}
      </div>
    )
  }
}

export default HashtagFeed
