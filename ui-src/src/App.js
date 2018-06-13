import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import EditProfileContainer from './EditProfileContainer'
import FollowContainer from './FollowContainer'
import FollowingFeedContainer from './FollowingFeedContainer'
import MeowContainer from './MeowContainer'
import Modal from './components/Modal'
import NewMeowContainer from './NewMeowContainer'
import SettingsContainer from './SettingsContainer'
import UserFeedContainer from './UserFeedContainer'
import HashtagFeedContainer from './HashtagFeedContainer'

class App extends Component {
  componentWillMount() {
    // this fetches the hash which represents the active users userHash
    this.props.getMyHandle()
    this.props.getHandles()
    this.props.getProfilePic()
    this.props.getFirstName()
    this.interval = setInterval(this.props.getHandles, 2000)
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps.handle, this.props.handle)
    if (!prevProps.handle && this.props.handle) {
      this.props.getFollow(this.props.handle, 'following')
    }
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval)
  }

  render() {
    const {
      appProperties,
      firstName,
      handle,
      modalIsOpen,
      profilePic
    } = this.props
    // if an agent handle already exists, there is no need to query for a handle
    return modalIsOpen && !appProperties.Agent_Handle ? (
      <div>
        <Modal show={modalIsOpen}>
          <SettingsContainer />
        </Modal>
      </div>
    ) : (
      <div className="container">
        <div className="spinner transition500" />
        <div className="error transition500" />
        <div className="row first">
          <div className="fixed-area">
            <div className="col-sm-2 contentcontainer">
              <div className="logo">
                <img src={profilePic} alt="user-profile" />
                <div id="displayName">{firstName}</div>
                <Link to="/editProfile" id="handle">
                  @{handle}
                </Link>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="contentcontainer">
                <Link
                  to="/follow"
                  id="followButton"
                  className="btn btn-default"
                >
                  Follow People
                </Link>
                <div id="banner">
                  <Link to="/">Clutter</Link>
                  <div className="subtitle">can haz herd cats?</div>
                </div>
                <div id="content">
                  <Route path="/" exact component={NewMeowContainer} />
                  <Route path="/editProfile" component={EditProfileContainer} />
                  <Route path="/follow" component={FollowContainer} />
                  <Route path="/meow/:meowHash" component={MeowContainer} />
                  <Route
                    path="/tag/:hashtag"
                    component={HashtagFeedContainer}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="alphabox">
                <div id="about">
                  <h2>What is Clutter?</h2>
                  <p>
                    <a
                      href="https://en.wiktionary.org/wiki/clutter"
                      target="blank"
                    >
                      <em>clutter</em>
                    </a>{' '}
                    is a flock of cats.
                  </p>
                  <p>
                    <strong>Clutter</strong> is a fully decentralized
                    alternative to Twitter.
                  </p>
                  <p>Impossible to censor or control.</p>
                  <p>
                    Join the mewvolution on{' '}
                    <a href="http://holochain.org" target="blank">
                      holochain.org
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="contentcontainer" id="feedContent">
              <div>
                <Route path="/" exact component={FollowingFeedContainer} />
                <Route path="/u/:handle" component={UserFeedContainer} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
