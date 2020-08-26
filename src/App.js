import React from "react";
import "./App.css";
import { get } from "./web/ajax";
import Products from "./components/Products";
import Header from "./components/Header";

class App extends React.Component {
  state = {
    isLoaded: false,
    products: [],
  };

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
      },
      (error) => {
        this.setState({ isLoaded: false });
        console.error(error);
      }
    );
  };

  showProductList = () => {
    if (!this.state.products) return null;
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <Products products={this.state.products} />
        </div>
      </React.Fragment>
    );
  };

  render() {
    return <div className="App">{this.showProductList()}</div>;
  }
}

export default App;
