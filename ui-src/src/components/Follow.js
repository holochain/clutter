import React, { Component } from 'react'

class Follow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newFollowText: ''
    }
  }
  updateFollowText = (e) => {
    this.setState({
      newFollowText: e.target.value
    })
  }
  render () {
    // console.log(this.props.following)
    const filteredNotFollowing = this.props.notFollowing.filter(u => {
      return u.handle.toLowerCase().startsWith(this.state.newFollowText.toLowerCase())
    })
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <div className='row'>
            <h3>Following</h3>
            <ul id='following'>
              {this.props.following.length === 0 && <li>
                You currently aren't following anyone.
              </li>}
              {this.props.following.map(user => {
                return (
                  <li className='following-handle' key={user.handle}>
                    <div className='col-xs-9'>
                      <span className='handle'>{user.handle}</span>
                    </div>
                    <div className='col-xs-3'>
                      <button type='button' className='btn btn-default' onClick={() => this.props.unfollow(user.handle)}>
                       Unfollow
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='row'>
            <h3 id='myModalLabel'>Follow someone</h3>
              <div className='col-xs-12'>
                <div className='form-group input-icon'>
                  <i>@</i>
                  <input value={this.state.newFollowText} onChange={this.updateFollowText} type='text' className='form-control' id='followHandle' placeholder='handle' />
                </div>
              </div>
              <ul id='not-following'>
              {filteredNotFollowing.length === 0 && <li>
                There are no users that you aren't already following.
              </li>}
              {filteredNotFollowing.map(user => {
                return (
                  <li className='following-handle' key={user.handle}>
                    <div className='col-xs-9'>
                      <span className='handle'>{user.handle}</span>
                    </div>
                    <div className='col-xs-3'>
                      <button type='button' className='btn btn-default' onClick={() => this.props.follow(user.handle)}>
                       Follow
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Follow
