import React, { Component } from "react";
import ProductImageCarousel from "./ProductImageCarousel";

class ProductPage extends Component {
  render() {
    return (
      <div className="container-xl">
        <ProductImageCarousel product={this.props.product} />
      </div>
    );
  }
}

export default ProductPage;
