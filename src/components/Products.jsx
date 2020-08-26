import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  render() {
    const products = this.props.products;
    return products.map((item) => {
      return <Product key={item.id} product={item} />;
    });
  }
}

export default Products;
