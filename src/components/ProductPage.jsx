import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get } from "../web/ajax";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null, sku: null };
  }

  componentDidMount = () => {
    this.getProductData();
  };

  getProductData = async () => {
    const product = await this.getProduct();
    console.log(product);
    const sku = this.findSku(product);
    const inventory = await this.getInventory(sku);
  };

  getProduct = async () => {
    const url = `https://localhost:44342/products/${this.props.match.params.id}`;
    return await get(url);
  };

  findSku = (product) => {
    if (product && product.variants) {
      const definedSku = product.variants[0].sku;
      if (definedSku) {
        return definedSku.substring(0, definedSku.indexOf(" "));
      }
    }
  };

  getInventory = async (sku) => {
    // TODO
  };

  render() {
    console.log(this.props.match.params.id);
    const { product } = this.props;
    return (
      <div className="container-xl">
        <Link to="/">
          <button type="button" className="close float-left" aria-label="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </Link>
        {/* <ProductImageCarousel product={product} /> */}
        <div>
          <h4>{product.title}</h4>
          <p>{product.body_html}</p>
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
