import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

class ProductColorSelector extends Component {
  render() {
    const { product, selectedColor, onSelect } = this.props;

    const dropdownItemsList = product.variants.map((variant, idx) => {
      // Create the dropdown item for each color
      return (
        <Dropdown.Item
          key={variant.id}
          as="button"
          onSelect={() => onSelect(variant.id)}
        >
          {variant.option1}
        </Dropdown.Item>
      );
    });

    return (
      <DropdownButton
        id="productColorSelector"
        title={selectedColor || "Color"}
        variant="asobu"
        className="mb-2"
      >
        {dropdownItemsList}
      </DropdownButton>
    );
  }
}

export default ProductColorSelector;
