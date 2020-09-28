import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { get } from "../web/ajax";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductInventory from "./ProductInventory";
import ProductColorSelector from "./ProductColorSelector";
import PageLoading from "./PageLoading";
import "../styles/ProductPage.css";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoaded: false,
      isError: false,
      selectedImageIndex: 0,
      selectedLocale: null,
      localeInventory: [],
      selectedVariant: null,
    };
  }

  componentDidMount = () => {
    this.getProductData();
  };

  componentDidUpdate = (prevProps) => {
    const productId = this.props.match.params.id;
    const prevProductId = prevProps.match.params.id;
    if (prevProductId !== productId) {
      this.setState({ isLoaded: false });
      this.getProductData();
    }
  };

  getProductData = async () => {
    const baseUrl = process.env.REACT_APP_ADNART_API_ENDPOINT;
    const id = this.props.match.params.id;
    const url = `${baseUrl}/products/${id}`;

    try {
      // Get the product details
      const result = await get(url);
      const product = result.products[0];

      // Get the first inventory in the list as the default selected locale
      const selectedLocale = product.inventory[0].Locale.Code;
      const localeInventory = [...product.inventory[0].Variations];

      const selectedVariant = { ...product.variants[0] };

      this.setState({
        isLoaded: true,
        product,
        selectedLocale,
        localeInventory,
        selectedVariant,
      });
    } catch (err) {
      this.setState({ isError: true });
    }
  };

  handleCarouselSelection = (selectedIndex, e) => {
    this.setState({ selectedImageIndex: selectedIndex });
  };

  handleColorSelection = (variantId) => {
    // Find the matching variant and cache its data
    const matchingVariant = this.state.product.variants.find(
      (variant) => variant.id === variantId
    );
    // Setting the image index to -1 indicates manual user color selection
    this.setState({
      selectedVariant: matchingVariant,
      selectedImageIndex: -1,
    });
  };

  renderProductWeight = () => {
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

  handleLocaleChange = (e) => {
    const { product, selectedLocale } = this.state;
    const newLocaleCode = e.currentTarget.value;

    if (newLocaleCode !== selectedLocale) {
      // Find the matching inventory data that corresponds with the new locale
      const matchingInventory = [
        ...product.inventory.find((inv) => inv.Locale.Code === newLocaleCode)
          .Variations,
      ];
      this.setState({
        selectedLocale: newLocaleCode,
        localeInventory: matchingInventory,
      });
    }
  };

  getAvailableLocales = () => {
    const { product } = this.state;
    let locales = [];

    if (!!product) {
      // Get each available locale for the current product
      product.inventory.forEach((inv) => {
        locales.push({ ...inv.Locale });
      });
    }

    return locales;
  };

  render() {
    const {
      product,
      isError,
      isLoaded,
      selectedImageIndex,
      selectedLocale,
      localeInventory,
      selectedVariant,
    } = this.state;

    let content;
    if (isError) {
      content = <div className="error">Error</div>;
    } else if (!isLoaded) {
      content = (
        <div className="product-loading">
          <PageLoading role="item-load-status" />
        </div>
      );
    } else {
      // Product data is finished loaded
      content = (
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
                selectedVariant={selectedVariant}
                onSelect={this.handleCarouselSelection}
              />
            </div>
            <div className="col-md-6 order-md-2 mb-2">
              <h3 className="mb-3">{product.title}</h3>
              <ProductColorSelector
                product={product}
                selectedColor={selectedVariant.option1}
                onSelect={this.handleColorSelection}
              />
              <div>
                {ReactHtmlParser(product.body_html)}
                {this.renderProductWeight()}
              </div>
              <hr />
              <ProductInventory
                selectedLocale={selectedLocale}
                inventory={localeInventory}
                locales={this.getAvailableLocales()}
                onLocaleChange={this.handleLocaleChange}
                type="primary"
              />
            </div>
          </div>
        </div>
      );
    }

    return content;
  }
}

export default ProductPage;
