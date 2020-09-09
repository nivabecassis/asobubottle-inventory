import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Search.css";

/**
 * Search bar for all the products.
 *
 * Allows the user to search by keyword that appears
 * in the title of the product.
 */
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    let suggestions = [];

    if (value.length > 0) {
      // Get the first 5 products that ressemble the inputted value
      suggestions = this.props.products
        .filter((p) => p.title.toUpperCase().includes(value.toUpperCase()))
        .sort((a, b) => a.title - b.title)
        .slice(0, 5);
    }

    this.setState({ suggestions, text: value });

    console.log(e, value, suggestions);
  };

  handleSubmit = (e) => {};

  handleBlur = () => {
    this.setState({ suggestions: [] });
  };

  handleProductClick = (product) => {
    this.setState({ suggestions: [], text: "" });
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) return null;

    return (
      <ul>
        {suggestions.map((product) => {
          return (
            <Link
              to={"/" + product.id}
              onClick={() => this.handleProductClick(product)}
              className="cleanLink"
              key={product.id}
            >
              <li>{product.title}</li>
            </Link>
          );
        })}
      </ul>
    );
  };

  render() {
    return (
      <div className="searchBar">
        <form noValidate>
          <input
            type="text"
            placeholder="Search ..."
            value={this.state.text}
            onChange={this.handleChange}
            onFocus={this.handleChange}
            // onBlur={this.handleBlur}
            autoComplete="off"
          />
          {this.renderSuggestions()}
        </form>
      </div>
    );
  }
}

export default Search;
