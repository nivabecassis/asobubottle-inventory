import React, { Component } from "react";
import Product from "./Product";
import PageLoading from "./PageLoading";
import "../styles/Loading.css";

class Products extends Component {
  render() {
    const { products, isLoaded } = this.props;
    const productList = products.map((item) => {
      return <Product key={item.id} product={item} />;
    });

    let content;

    if (isLoaded) {
      content = <div className="row row-cols-sm-2 row-cols-md-4">{productList}</div>;
    } else {
      content = (<div className="center-loading">
                  <PageLoading role="item-load-status" />
                  </div>);
    }
    return content;
  }
}

export default Products;
