import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  render() {
    const { products, onDetailsPage } = this.props;
    const productList = products.map((item) => {
      return (
        <Product key={item.id} product={item} onDetailsPage={onDetailsPage} />
      );
    });
    return <div className="row row-cols-sm-2 row-cols-md-4">{productList}</div>;
  }
}

export default Products;
