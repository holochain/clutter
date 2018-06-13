import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const MAX_PIC_SIZE = 2000000

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newNameText: '',
      newProfilePic: ''
    }
  }
  componentWillMount() {
    const { firstName, getFirstName, profilePic } = this.props
    getFirstName()
    this.setState({ newNameText: firstName, newProfilePic: profilePic })
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
    const { newNameText, newProfilePic } = this.state
    const {
      history,
      firstName,
      profilePic,
      setFirstName,
      setProfilePic
    } = this.props

    e.preventDefault()

    if (newProfilePic && newProfilePic !== profilePic) {
      setProfilePic(newProfilePic)
    }

    if (!newNameText) return
    if (!(newNameText === firstName)) setFirstName(newNameText)
    else this.setState({ newNameText: firstName })
    // Redirect user to main page
    history.push('/')
  }

  readBlob = file => {
    const input = file.target

    if (input.size > MAX_PIC_SIZE) {
      alert('File is too big!')
      return
    }
    this.upload(input.files[0]).then(dataURL => {
      this.setState({ newProfilePic: dataURL })
    })
  }

  upload = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = e => {
        resolve(e.target.result)
      }

      reader.readAsDataURL(file)
    })

  render() {
    const { handle } = this.props
    const { newNameText } = this.state
    return (
      <div className="panel panel-default">
        <div className="close">
          <Link to="/">x</Link>
        </div>
        <div className="panel-body">
          <p>Profile</p>
          <form
            id="editProfileForm"
            onSubmit={this.onHandleSubmit}
            className="form-group"
          >
            <div className="form-row">
              <div className="form-group col-xs-6">
                <label>Handle</label>
                <p id="handle">@{handle}</p>
              </div>
              <div className="form-group col-xs-6">
                <label>Name</label>
                <input
                  type="text"
                  onChange={this.updateNameText}
                  className="form-control"
                  id="inputName"
                  placeholder="name"
                  value={newNameText}
                />
              </div>

              <div className="form-group">
                <div className="form-group col-xs-10">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={this.readBlob}
                    hidden
                    id="image"
                  />
                </div>
              </div>
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
