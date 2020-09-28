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

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = async () => {
    const url = process.env.REACT_APP_ADNART_API_ENDPOINT + "/products/";
    const result = await get(url);
    if (result) {
      this.setState({ products: result.products });
    }
  };

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Header products={products} />
        <div className="container-xl py-4">
          <Switch>
            <Route path="/:id" component={ProductPage} />
            <Route path="/" children={<Products products={products} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
