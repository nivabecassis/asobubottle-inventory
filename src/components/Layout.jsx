import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { get } from "../web/ajax";

import Products from "./Products";
import Header from "./Header";
import ProductPage from "./ProductPage";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProduct: null,
      isLoaded: false,
    };
  }

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = async () => {
    this.setState({isLoaded: false});
    const url = process.env.REACT_APP_ADNART_API_ENDPOINT + "/products/";
    const result = await get(url);
    const jsonResult = await result.json();
    if (jsonResult) {
      this.setState({ products: jsonResult.products, isLoaded: true });
    }
  };

  render() {
    const { products, isLoaded } = this.state;
    return (
      <React.Fragment>
        <Header products={products} />
        <div className="container-xl py-4">
          <Switch>
            <Route path="/:id" component={ProductPage} />
            <Route path="/" children={<Products products={products} isLoaded={isLoaded} />} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
