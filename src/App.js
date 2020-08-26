import React from "react";
import "./App.css";
import { get } from "./web/ajax";
import Products from "./components/Products";

class App extends React.Component {
  state = {
    isLoaded: false,
    products: [],
  };

  localhostUrl = "https://localhost:44342";

  componentDidMount = () => {
    // if (!this.state.products) {
    this.getProducts();
    // }
  };

  getProducts = () => {
    get(
      this.localhostUrl + "/products/",
      (result) => {
        this.setState({
          isLoaded: true,
          products: result.data.products,
        });
      },
      (error) => {
        this.setState({ isLoaded: false });
        console.error(error);
      }
    );
  };

  showProductList = () => {
    if (!this.state.products) return null;
    return <Products products={this.state.products} />;
  };

  render() {
    return <div className="App">{this.showProductList()}</div>;
  }
}

export default App;
