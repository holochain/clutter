import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import SettingsContainer from './SettingsContainer'
import FollowContainer from './FollowContainer'
import NewMeowContainer from './NewMeowContainer'
import FollowingFeedContainer from './FollowingFeedContainer'
import UserFeedContainer from './UserFeedContainer'
import MeowContainer from './MeowContainer'

class App extends Component {
  componentWillMount () {
    // this fetches the hash which represents the active users userHash
    this.props.getMyHandle()
    this.props.getHandles()
    this.interval = setInterval(this.props.getHandles, 2000)
  }

  componentDidUpdate (prevProps) {
    // console.log(prevProps.handle, this.props.handle)
    if (!prevProps.handle && this.props.handle) {
      this.props.getFollow(this.props.handle, 'following')
    }
  }

  componentWillUnmount () {
    if (this.interval) clearInterval(this.interval)
  }

  render () {
    return (
      <div className='container'>
        <div className='spinner transition500' />
        <div className='error transition500' />
        <div className='row'>
          <div className='col-sm-2'>
            <div className='logo'>
              <img src='/cat-eating-bird-circle.png' alt='cat eating bird' />
            </div>
          </div>
          <div className='col-sm-7'>
            <div className='contentcontainer'>
              <div>
                <Link to='/' id='handle'>{this.props.handle}</Link>
                <Link to='/settings' id='changeHandleButton' className='btn btn-default'>Settings</Link>
              </div>
              <Link to='/follow' id='followButton' className='btn btn-default'>Follow People</Link>
              <div id='banner'>
                Clutter
                <div className='subtitle'>can haz herd cats?</div>
              </div>
              <div id='content'>
                <Route path='/' exact component={NewMeowContainer} />
                <Route path='/' exact component={FollowingFeedContainer} />
                <Route path='/u/:handle' component={UserFeedContainer} />
                <Route path='/settings' component={SettingsContainer} />
                <Route path='/follow' component={FollowContainer} />
                <Route path='/meow/:meowHash' component={MeowContainer} />
              </div>
            </div>
          </div>
          <div className='col-sm-3'>
            <div className='alphabox'>
              <div id='about'>
                <h2>What is Clutter?</h2>
                <p>A <a href='https://en.wiktionary.org/wiki/clutter'><em>clutter</em></a> is a flock of cats.</p>
                <p><strong>Clutter</strong> is a fully decentralized alternative to Twitter.</p>
                <p>Impossible to censor or control.</p>
                <p>Join the mewvolution on <a href='http://holochain.org'>holochain.org</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
