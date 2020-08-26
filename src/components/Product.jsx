import React from "react";

export class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
    };
  }

  render() {
    const product = this.state.product;
    return (
      <div>
        <img src={product.image.src} alt={product.image.alt}></img>
        <h3 className="product-title">{product.title}</h3>
      </div>
    );
  }
}
