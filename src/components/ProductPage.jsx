import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductPage extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="container-xl">
        <Link to="/">
          <button type="button" className="close" aria-label="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Link>
        {/* <ProductImageCarousel product={product} /> */}
        <div>
          <h4>{product.title}</h4>
          <p>{product.body}</p>
          <p>...</p>
          <img
            height="200px"
            width="200px"
            src={product.image.src}
            alt={product.image.alt}
          ></img>
        </div>
      </div>
    );
  }
}

export default ProductPage;
