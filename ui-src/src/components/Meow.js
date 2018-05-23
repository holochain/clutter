import React, { Component } from "react";
import { Link } from "react-router-dom";

class Meow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      this.props.getPost();
    }
  }

  timeBetween(datePosted) {
    const now = Date.now();
    console.log(datePosted);
    console.log(now);
    return datePosted.toString();
  }

  getHashtags() {
    let message = this.props.post.message;
    var tags = message.match(/\B#\w*[a-zA-Z]+\w*/g);
    if(tags) {
      var uniqueTags = tags.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      }); //remove duplicates
      return uniqueTags;
    } else {
      return [];
    }
  }

  render() {
    if (!this.props.post) {
      return null;
    }
    const { stamp, message, author, hash, userHandle } = this.props.post;
    return (
      <div className="meow" id={stamp}>
        <a className="meow-edit" onClick={() => "openEditPost('+id+')"}>
          edit
        </a>
        <Link to={`/u/${author}`} className="user">
          @{userHandle}
        </Link>{" "}
        |{" "}
        <Link to={`/meow/${hash}`} className="stamp">
          {new Date(stamp).toString()}
        </Link>
        <div className="message">{message}</div>
      </div>
    );
  }
}

export default Meow;
