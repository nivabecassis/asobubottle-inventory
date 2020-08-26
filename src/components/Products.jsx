import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  render() {
    const products = this.props.products;
    const productList = products.map((item) => {
      return <Product key={item.id} product={item} />;
    });
    return <div className="card-deck">{productList}</div>;
  }
}

export default Products;
