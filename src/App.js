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
        console.log(this.state.products);
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
        <header>
          <Header />
        </header>
        <main role="main">
          <div className="container-xl py-4">
            <h3 className="text-left px-3 pb-4">Products</h3>
            <Products products={this.state.products} />
          </div>
        </main>
      </React.Fragment>
    );
  };

  render() {
    return <div className="App">{this.showProductList()}</div>;
  }
}

export default App;
