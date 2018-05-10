import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newHandleText: ""
    };
  }
  updateHandleText = e => {
    this.setState({
      newHandleText: e.target.value
    });
  };
  onHandleSubmit = e => {
    console.log(this.props);
    e.preventDefault();
    this.setState({
      newHandleText: ""
    });

    // empty string given as input
    if (!this.state.newHandleText) return;

    this.props.newHandle(this.state.newHandleText);

    const handleExists = this.props.handles.find(
      handleObj => handleObj.handle === this.state.newHandleText
    );
    if (handleExists) {
      console.log(this.state.newHandleText + " taken");
      this.props.newHandle("");
      return;
    }
    // reset newHandleText input field to empty
    this.setState({
      newHandleText: ""
    });

    this.props.toggleModal();
  };
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h3 id="setHandleModalLabel">Set your handle</h3>
          <div>
            <p
              className="bg-danger"
              style={{
                display: this.props.handleTaken === true ? "inline" : "none"
              }}
            >
              Handle already taken - try another one
            </p>
          </div>
          <div>
            <p
              className="bg-warning"
              style={{
                display:
                  this.state.newHandleText.length === 0 &&
                  this.props.handleTaken === false
                    ? "inline"
                    : "none"
              }}
            >
              Must provide a handle to continue
            </p>
          </div>
          <br />
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
    );
  }
}

export default Settings;
