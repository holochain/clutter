import React, { Component } from 'react'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newHandleText: ''
    }
  }
  updateHandleText = (e) => {
    this.setState({
      newHandleText: e.target.value
    })
  }
  onHandleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      newHandleText: ''
    })
    if (!this.state.newHandleText) return
    this.props.newHandle(this.state.newHandleText)
    this.setState({
      newHandleText: ''
    })
  }
  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h3 id='setHandleModalLabel'>Set your handle</h3>
          <p style={{display: (this.props.handleTaken === true) ? 'inline' : 'none'}}>Handle already taken try another one</p>
          <form id='handleForm' onSubmit={this.onHandleSubmit} className='form-group'>
            <div className='col-xs-8'>
              <div className="form-group input-icon">
                <i>@</i>
                <input value={this.state.newHandleText} onChange={this.updateHandleText} type='text' className='form-control' id='myHandle' placeholder='handle' />
              </div>
            </div>
            <div className='col-xs-2'>
              <button id='setHandleButton' type='submit' className='btn btn-primary'>Set Handle</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Settings
