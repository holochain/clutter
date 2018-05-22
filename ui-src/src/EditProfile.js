import React, { Component } from 'react'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newNameText: ''
    }
  }
  componentWillMount() {
    const { firstName, getFirstName } = this.props
    getFirstName()
    this.setState({ newNameText: firstName })
  }
  componentDidUpdate(prevProps) {
    const { firstName } = this.props
    if (!prevProps.firstName && firstName) {
      this.setState({ newNameText: firstName })
    }
  }
  updateNameText = e => {
    this.setState({
      newNameText: e.target.value
    })
  }
  onHandleSubmit = e => {
    const { newNameText } = this.state
    const { history, firstName, setFirstName } = this.props
    e.preventDefault()

    if (!newNameText) return
    if (!(newNameText === firstName)) setFirstName(newNameText)
    else this.setState({ newNameText: firstName })
    // Redirect user to main page
    history.push('/')
  }

  render() {
    const { handle } = this.props
    const { newNameText } = this.state
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <form
            id="editProfileForm"
            onSubmit={this.onHandleSubmit}
            className="form-group"
          >
            <div className="form-row">
              <div className="form-group col-xs-6">
                <label>handle</label>
                <p id="handle">@{handle}</p>
              </div>
              <div className="form-group col-xs-6">
                <label>name</label>
                <input
                  type="text"
                  onChange={this.updateNameText}
                  className="form-control"
                  id="inputName"
                  placeholder="name"
                  value={newNameText}
                />
              </div>

              {/**<div className="form-group">
                <div className="form-group col-xs-10">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
    </div>**/}
            </div>
            <div className="form-group col-xs-6">
              <button
                id="saveChanges"
                type="submit"
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default EditProfile
