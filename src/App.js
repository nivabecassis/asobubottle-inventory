import React from "react";
import "./App.css";
import { get } from "./web/ajax";
import Products from "./components/Products";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";

import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
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
          products: result.data.products,
        });
        console.log(this.state.products);
      },
      (error) => {
        this.setState({ isLoaded: false });
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

  showProductList = () => {
    if (!this.state.products) return null;
    // TODO - Add a loading icon while the products come in
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
              <div className="container-xl py-4">
                <h3 className="text-left px-3 pb-4">Products</h3>
                <Products
                  products={this.state.products}
                  onDetailsPage={this.handleDetailsPage}
                />
              </div>
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
