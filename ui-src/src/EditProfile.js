import React, { Component } from "react";
import { Link } from "react-router-dom";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNameText: ""
    };
  }
  componentDidMount() {
    console.log("componenet did mount");
  }
  updateNameText = e => {
    this.setState({
      newNameText: e.target.value
    });
  };
  onHandleSubmit = e => {
    const { newNameText } = this.state;
    const { setFirstName } = this.props;
    e.preventDefault();
    console.log("clicked " + newNameText);
    if (!newNameText) return;
    setFirstName(newNameText);
  };

  render() {
    const { handle } = this.props;
    const { newNameText } = this.state;
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
                <p>@{handle}</p>
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
              <div className="form-group">
                <div className="form-group col-xs-10">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
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
    );
  }
}

export default EditProfile;
