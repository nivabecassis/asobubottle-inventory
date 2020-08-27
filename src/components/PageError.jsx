import React, { Component } from "react";

class PageError extends Component {
  render() {
    const heading = this.props.header || "Error";
    const content =
      this.props.content ||
      "Something went wrong :( \n Please report this issue";
    return (
      <div class="alert alert-danger">
        <h4 className="alert-heading">{heading}</h4>
        <p>{content}</p>
      </div>
    );
  }
}

export default PageError;
