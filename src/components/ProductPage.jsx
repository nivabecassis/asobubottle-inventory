import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { get } from "../web/ajax";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductInventory from "./ProductInventory";
import ProductColorSelector from "./ProductColorSelector";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoaded: false,
      isError: false,
      selectedVariant: null,
      selectedImageIndex: 0,
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

  getProductColors = () => {
    const { product } = this.state;
    if (product) {
      // Get the option that shows the colors
      const colorsOption = product.options.find((o) => o.name === "Color");
      if (colorsOption) {
        return colorsOption.values;
      }
    }
    return null;
  };

  handleCarouselSelection = (selectedIndex, e) => {
    this.setState({ selectedImageIndex: selectedIndex });
  };

  handleColorSelection = (color) => {
    // finds the matching variant based on the color
    const matchingVariant = this.state.product.variants.find(
      (v) => v.title && v.title.includes(color)
    );
    if (matchingVariant) {
      this.setState({ selectedVariant: matchingVariant });
    }

    // Finds the index of the first image with the color in the source file name
    const imgIndex = this.state.product.images.findIndex((img) =>
      img.src.toUpperCase().includes(color.toUpperCase())
    );
    this.setState({
      selectedImageIndex: imgIndex >= 0 ? imgIndex : 0,
    });
  };

  getProductWeight = () => {
    // Only show weight if it is provided
    const { weight, weight_unit } = this.state.selectedVariant;
    if (!weight) return null;

    return (
      <p>
        Weight - {weight}&nbsp;
        {weight_unit}
      </p>
    );
  };

  render() {
    const { product, isError, isLoaded, selectedImageIndex } = this.state;
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
                className="btn btn-primary"
                aria-label="Return"
              >
                All products
              </button>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-6 order-md-1 mb-2">
              <ProductImageCarousel
                product={product}
                activeIndex={selectedImageIndex}
                onSelect={this.handleCarouselSelection}
              />
            </div>
            <div className="col-md-6 order-md-2 mb-2">
              <h3 className="mb-3">{product.title}</h3>
              <ProductColorSelector
                colors={this.getProductColors()}
                onSelect={this.handleColorSelection}
              />
              <div>
                {ReactHtmlParser(product.body_html)}
                {this.getProductWeight()}
              </div>
              <hr />
              <ProductInventory product={product} type="primary" />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ProductPage;
