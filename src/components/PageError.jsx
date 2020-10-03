import React, { Component } from "react";

class PageError extends Component {
  render() {
    const heading = this.props.title || "Error";
    const content =
      this.props.content ||
      "Something went wrong :( \n Please report this issue";
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">{heading}</h4>
        <p>{content}</p>
      </div>
    );
  }
}

export default PageError;
