import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Meow extends Component {
  componentDidMount () {
    if (!this.props.post) {
      this.props.getPost()
    }
  }
  render () {
    if (!this.props.post) {
      return null
    }
    const { stamp, message, author, hash, userHandle } = this.props.post
    return (
      <div className='meow' id={stamp}>
        <a className='meow-edit' onClick={() => "openEditPost('+id+')"}>edit</a>
        <Link to={`/meow/${hash}`} className='stamp'>{new Date(stamp).toString()}</Link> |&nbsp;
        <Link to={`/u/${author}`} className='user'>{userHandle}</Link>
        <div className='message'>{message}</div>
      </div>
    )
  }
}

export default Meow
