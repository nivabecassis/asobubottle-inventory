import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get } from "../web/ajax";
import ProductImageCarousel from "./ProductImageCarousel";
import Dropdown from "./Dropdown";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoaded: false,
      isError: false,
      selectedVariant: null,
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
      this.setState({
        isLoaded: true,
        product,
        selectedVariant: product.variants[0],
      });
    } catch (err) {
      this.setState({ isError: true });
    }
  };

  getProductColorsComponent = () => {
    const { product } = this.state;
    if (product) {
      // Get the option that shows the colors
      const colorOptions = product.options.find((o) => o.name === "Color");
      if (colorOptions && colorOptions.values) {
        return (
          // Create the dropdown component with the specified colors
          <Dropdown
            options={colorOptions.values}
            buttonId="dropdownMenuProductColors"
            onClick={this.handleItemColorChange}
          />
        );
      }
    }
    return null;
  };

  handleItemColorChange = (color) => {
    const matchingVariant = this.state.product.variants.find(
      (v) => v.title && v.title.includes(color)
    );
    if (matchingVariant) {
      this.setState({ selectedVariant: matchingVariant });
    }
  };

  render() {
    const { product, isError, isLoaded, selectedVariant } = this.state;
    if (isError) {
      return <div className="error">Error</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      // Product data is finished loaded
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
              {this.getProductColorsComponent()}
              <p>{product.body_html}</p>
              <hr />
              <h4 className="mb-3">Product Details</h4>
              <p>
                Weight - {selectedVariant.weight}&nbsp;
                {selectedVariant.weight_unit}
              </p>
              <hr />
              {/* <ProductInventory/> */}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ProductPage;
