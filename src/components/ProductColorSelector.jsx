import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

class ProductColorSelector extends Component {
  state = {
    selectedColor: null,
  };

  handleSelect = (eventKey, event) => {
    this.setState({ selectedColor: event.target.innerText });
    this.props.onSelect(event.target.innerText);
  };

  render() {
    const { colors } = this.props;

    const dropdownItemsList = colors.map((color, idx) => {
      // Create the dropdown item for each color
      return (
        <Dropdown.Item key={color} as="button" onSelect={this.handleSelect}>
          {color}
        </Dropdown.Item>
      );
    });

    return (
      <DropdownButton
        id="productColorSelector"
        title={this.state.selectedColor || "Color"}
        variant="primary"
        className="mb-2"
      >
        {dropdownItemsList}
      </DropdownButton>
    );
  }
}

export default ProductColorSelector;
