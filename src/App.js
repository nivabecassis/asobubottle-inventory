import React from "react";
import "./App.css";
import { get } from "./web/ajax";
import Products from "./components/Products";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";
import NoProducts from "./components/NoProducts";

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
      // No error, still loading
      // TODO - Add a loading icon while the products come in
    } else if (isLoaded && isError) {
      // Error - tell the user
      return <NoProducts />;
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

  showProductList = () => {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/:id">
            <ProductPage product={this.state.selectedProduct} />
          </Route>
          <Route path="/">
            <header>
              <Header />
            </header>
            <main role="main">
              <div className="container-xl py-4">{this.getPageContent()}</div>
            </main>
          </Route>
        </Switch>
      </React.Fragment>
    );
  };

  render() {
    return <div className="App">{this.showProductList()}</div>;
  }
}

export default App;
