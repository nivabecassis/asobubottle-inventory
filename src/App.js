import React from "react";
import "./App.css";
import { get } from "./web/ajax";
import Products from "./components/Products";

const localhostUrl = "https://localhost:44342";

class App extends React.Component {
  state = {
    isLoaded: false,
    products: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    get(
      localhostUrl + "/products/",
      (result) => {
        this.setState({
          isLoaded: true,
          products: result.data.products,
        });
        console.log(result);
      },
      (error) => {
        this.setState({ isLoaded: false });
        console.error(error);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Products />
      </div>
    );
  }
}

export default App;
