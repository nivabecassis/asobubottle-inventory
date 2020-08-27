import React, { Component } from "react";

class NoProducts extends Component {
  render() {
    return (
      <div class="alert alert-danger">
        <h4 className="alert-heading">Error</h4>
        <p>Something went wrong :(</p>
      </div>
    );
  }
}

export default NoProducts;
