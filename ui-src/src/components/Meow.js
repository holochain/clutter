import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FavesContainer from '../FavesContainer'

class Meow extends Component {
  componentDidMount() {
    console.log(this.props)
    if (!this.props.post) {
      this.props.getPost()
    }
  }

  // replace 'https' URLs with links
  urlify = text => {
    const urlRegexSplit = text.split(/(https?:\/\/[^\s]+)/g)
    return urlRegexSplit.map((str, i) => {
      if (str.startsWith('https')) {
        return (
          <a key={i} target="_blank" href={str}>
            {str}
          </a>
        )
      } else if (str.includes('#')) {
        return this.hashify(str)
      }
      return str
    })
  }

  //identify all hashtags and replace with links
  hashify = text => {
    const message = text
    const splitMessage = message.split(/(\B#\w*[a-zA-Z]+\w*)/g)
    return splitMessage.map((str, i) => {
      if (str.startsWith('#')) {
        return (
          <Link key={i} to={`/tag/${str.replace('#', '')}`} className="hashtag">
            {str}
          </Link>
        )
      } else {
        return str
      }
    })
  }

  render() {
    if (!this.props.post) {
      return null
    }
    const { stamp, message, author, hash, userHandle } = this.props.post
    return (
      <div className="meow" id={stamp}>
        <a className="meow-edit" onClick={() => "openEditPost('+id+')"}>
          edit
        </a>
        <Link to={`/u/${author}`} className="user">
          @{userHandle}
        </Link>{' '}
        |{' '}
        <Link to={`/meow/${hash}`} className="stamp">
          {new Date(stamp).toString()}
        </Link>
        <div className="message">{this.urlify(message)}</div>
        <FavesContainer hash={hash} />
      </div>
    )
  }
}

export default Meow
