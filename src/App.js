import { get } from "./web/ajax";
import React from "react";
import "./App.css";

const localhostUrl = "https://localhost:44342";
const prodUrl = "https://services.adnart.com:8443/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    get(
      localhostUrl + "/products/",
      (result) => {
        this.setState({
          isLoaded: true,
          products: result.products,
        });
      },
      (error) => {
        this.setState({ isLoaded: false });
        console.error(error);
      }
    );
  }

  render() {
    return <div className="App"></div>;
  }
}

export default App;
