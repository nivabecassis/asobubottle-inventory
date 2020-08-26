import React, { Component } from "react";

class Header extends Component {
  render() {
    const logoUri = process.env.PUBLIC_URL + "/asobu-logo.png";

    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href=".">
          <img
            className="img-fluid"
            src={logoUri}
            alt="Adnart company logo"
          ></img>
        </a>
      </nav>
    );
  }
}

export default Header;
