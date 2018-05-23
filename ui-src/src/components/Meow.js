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


  render() {
    if (!this.props.post) {
      return null;
    }
    const { stamp, message, author, hash, userHandle } = this.props.post;

    // replace hashtag matches in the message body with links
    message.replace(/\B#\w*[a-zA-Z]+\w*/g, "<Link to={`/tag/${hash}`} className='hashtag'>$1</Link>");
    
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
