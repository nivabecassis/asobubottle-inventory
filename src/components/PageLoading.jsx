import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

class PageLoading extends Component {
  render() {
    const { role } = this.props;

    return (
      <Spinner animation="border" role={role}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
}

export default PageLoading;
