import React, { Component } from "react";
import Search from "./Search";
import "../styles/Header.css";

class Header extends Component {
  render() {
    const logoUri = process.env.PUBLIC_URL + "/asobu-logo.png";
    const { products } = this.props;

    return (
      <nav className="navbar navbar-light bg-light">
        <div>
          <a className="navbar-brand" href=".">
            <img src={logoUri} alt="Adnart company logo"></img>
          </a>
        </div>
        <div className="searchWrapper">
          <Search products={products} />
        </div>
      </nav>
    );
  }
}

export default Header;
