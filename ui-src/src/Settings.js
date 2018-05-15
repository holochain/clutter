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
    const { newHandle, handles, toggleModal } = this.props;
    const { newHandleText } = this.state;

    e.preventDefault();
    this.setState({
      newHandleText: ""
    });

    // empty string given as input
    if (!newHandleText) return;

    newHandle(newHandleText);

    const handleExists = handles.find(
      handleObj => handleObj.handle === newHandleText
    );
    if (handleExists) {
      console.log(newHandleText + " taken");
      newHandle("");
      return;
    }
    // reset newHandleText input field to empty
    this.setState({
      newHandleText: ""
    });

    toggleModal();
  };
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
                    ? "inline"
                    : "none"
              }}
            >
              Set your handle to get meowing
            </p>
          </div>
          <div style={{ paddingLeft: 30, paddingBottom: 10 }}>
            <p
              className="text-danger"
              style={{
                display: this.props.handleTaken === true ? "inline" : "none"
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
    );
  }
}

export default Settings;
