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
      products: [],
      selectedProduct: null,
    };
  }
  localhostUrl = "";

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = async () => {
    const url = "https://localhost:44342/products/";
    const result = await get(url);
    if (result) {
      this.setState({ products: result.products });
    }
  };

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Header />
          <div className="container-xl py-4">
            <Switch>
              <Route path="/:id" exact component={ProductPage} />
              <Route
                exact
                path="/"
                children={<Products products={this.state.products} />}
              />
            </Switch>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
