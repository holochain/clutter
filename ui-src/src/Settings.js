import React, { Component } from 'react'

class Settings extends Component {
  constructor(props) {
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
    if (!this.state.newHandleText) return
    this.props.newHandle(this.state.newHandleText)
    this.setState({
      newHandleText: ''
    })
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h3 id="setHandleModalLabel">Update Handle</h3>
          <form onSubmit={this.onHandleSubmit} className="form-group">
              <div className="col-xs-8">
                <input value={this.state.newHandleText} onChange={this.updateHandleText} type="text" className="form-control" id="myHandle" placeholder="@handle" />
              </div>
              <div className="col-xs-2">
                <button id="setHandleButton" type="submit" className="btn btn-primary">Set Handle</button>
              </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Settings