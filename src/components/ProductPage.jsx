import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get } from "../web/ajax";
import ProductImageCarousel from "./ProductImageCarousel";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
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

    try {
      // Get the product details
      let product = await get(`${baseUrl}/products/${id}`);
      product = product.products[0];
      this.setState({ isLoaded: true, product });
    } catch (err) {
      this.setState({ isError: true });
    }
  };

  render() {
    const { product, isError, isLoaded } = this.state;
    if (isError) {
      return <div className="error">Error</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="text-left">
          <div className="mb-3">
            <Link to="/">
              <button
                type="button"
                className="btn btn-outline-primary"
                aria-label="Return"
              >
                All products
              </button>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-6 order-md-1 mb-2">
              <ProductImageCarousel product={product} />
            </div>
            <div className="col-md-6 order-md-2 mb-2">
              <h3 className="mb-3">{product.title}</h3>
              <p>{product.body_html}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ProductPage;
