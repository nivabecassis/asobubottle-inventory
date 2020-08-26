import React from "react";

export class Product extends React.Component {
  render() {
    const product = this.props.product;
    console.log(product);
    return (
      <div className="card">
        <img
          className="card-img-top img-fluid"
          src={product.image.src}
          alt={product.image.alt}
        ></img>
        <div className="card-body">
          <h4 className="card-title">{product.title}</h4>
        </div>
      </div>
    );
  }
}

export default Product;
