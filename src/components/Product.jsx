import React from "react";

export class Product extends React.Component {
  render() {
    const product = this.props.product;
    console.log(product);
    return (
      <div>
        <img src={product.image.src} alt={product.image.alt}></img>
        <h3>{product.title}</h3>
      </div>
    );
  }
}

export default Product;
