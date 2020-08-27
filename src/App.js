import React from "react";
import "./App.css";
import { get } from "./web/ajax";
import Products from "./components/Products";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";
import PageError from "./components/PageError";

import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false,
      products: [],
      selectedProduct: null,
    };
  }
  localhostUrl = "https://localhost:44342";

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    get(
      this.localhostUrl + "/products/",
      (result) => {
        this.setState({
          isLoaded: true,
          isError: false,
          products: result.data.products,
        });
        console.log(this.state.products);
      },
      (error) => {
        this.setState({ isLoaded: true, isError: true });
        console.error(error);
      }
    );
  };

  handleDetailsPage = (productId) => {
    // Find the matching product based on ID
    const selectedProduct = this.state.products.find(
      (product) => product.id === productId
    );
    this.setState({ selectedProduct });
  };

  getPageContent = () => {
    const { isLoaded, isError, products } = this.state;
    if (!isLoaded && !isError) {
      // TODO - Add a loading icon while the products come in
    } else if (isLoaded && isError) {
      // Error - tell the user
      return <PageError content="Couldn't load products from server" />;
    } else {
      // Show the products
      return (
        <div>
          <h3 className="text-left px-3 pb-4">Products</h3>
          <Products
            products={products}
            onDetailsPage={this.handleDetailsPage}
          />
        </div>
      );
    }
  };

  getSelectedProductPage = () => {
    const { isError, selectedProduct, products } = this.state;
    if (isError || !products) {
      return <PageError content="Couldn't load products from server" />;
    } else if (products && !selectedProduct) {
      // Product doesn't exist
      return <PageError content="Product doesn't exist" />;
    } else if (products && selectedProduct) {
      return <ProductPage product={this.state.selectedProduct} />;
    }
  };

  showProductList = () => {
    return (
      <React.Fragment>
        <header>
          <Header />
        </header>
        <div className="container-xl py-4">
          <Switch>
            <Route path="/:id">{this.getSelectedProductPage()}</Route>
            <Route path="/">
              <main role="main">{this.getPageContent()}</main>
            </Route>
          </Switch>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return <div className="App">{this.showProductList()}</div>;
  }
}

export default App;
