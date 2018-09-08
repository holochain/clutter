import React, { Component } from 'react'
const MAX_HANDLE_LENGTH = 20

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newHandleText: ''
    }
  }

  updateHandleText = e => {
    this.setState({
      newHandleText: e.target.value
    })
  }
  onHandleSubmit = e => {
    const {
      getFirstName,
      handles,
      newHandle,
      setFirstName,
      toggleModal
    } = this.props
    const { newHandleText } = this.state

    e.preventDefault()

    // empty string given as input
    if (!newHandleText) return

    // max characters exceeded
    if (newHandleText.length > MAX_HANDLE_LENGTH) {
      this.setState({ newHandleText: '' })
      return
    }

    newHandle(newHandleText)

    const handleExists = handles.find(
      handleObj => handleObj.handle === newHandleText
    )
    if (handleExists) {
      newHandle('')
      return
    }

    // check if a name has been set, and if not default to handle
    if (!(getFirstName() && getFirstName().length > 1)) {
      setFirstName(newHandleText)
    }
    toggleModal()
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div style={{ paddingLeft: 30, paddingBottom: 10 }}>
            <p
              className="text-info"
              style={{
                display:
                  this.state.newHandleText.length === 0 &&
                  this.props.handleTaken === false
                    ? 'inline'
                    : 'none'
              }}
            >
              Set your handle to get meowing
            </p>
          </div>
          <div style={{ paddingLeft: 30, paddingBottom: 10 }}>
            <p
              className="text-danger"
              style={{
                display: this.props.handleTaken === true ? 'inline' : 'none'
              }}
            >
              This handle already has a home, try something else!
            </p>
          </div>
          <form
            id="handleForm"
            onSubmit={this.onHandleSubmit}
            className="form-group"
          >
            <div className="col-xs-8">
              <div className="form-group input-icon">
                <i>@</i>
                <input
                  value={this.state.newHandleText}
                  onChange={this.updateHandleText}
                  type="text"
                  className="form-control"
                  id="myHandle"
                  placeholder="handle"
                />
              </div>
            </div>
            <div className="col-xs-2">
              <button
                id="setHandleButton"
                type="submit"
                className="btn btn-primary"
              >
                Set Handle
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Settings
