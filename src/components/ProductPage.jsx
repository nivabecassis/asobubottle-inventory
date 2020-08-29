import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get } from "../web/ajax";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      sku: null,
      inventory: [],
      isLoaded: false,
      isError: false,
    };
  }

  componentDidMount = () => {
    this.getProductData();
  };

  getProductData = async () => {
    const baseUrl = "https://localhost:44342";
    const id = this.props.match.params.id;

    // Get the product details
    let product = await get(`${baseUrl}/products/${id}`);
    if (!product) {
      this.setState({ isError: true });
      return;
    }
    product = product.products[0];
    const sku = this.findSku(product);

    // Get the inventory for the defined sku
    const inventory = await get(`${baseUrl}/inventory/${sku}`);
    if (!inventory) {
      this.setState({ isError: true });
    }

    // Save all the info
    this.setState({ product, sku, inventory, isLoaded: true });
  };

  findSku = (product) => {
    if (product && product.variants) {
      const definedSku = product.variants[0].sku;
      if (definedSku) {
        const indexOfSpace = definedSku.indexOf(" ");
        if (!indexOfSpace) {
          return definedSku;
        }
        return definedSku.substring(0, indexOfSpace);
      }
    }
  };

  render() {
    const { product, inventory, sku, isError, isLoaded } = this.state;
    if (isError) {
      return <div className="error">Error</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container-xl">
          <Link to="/">
            <button
              type="button"
              className="close float-left"
              aria-label="close"
            >
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
}

export default ProductPage;
