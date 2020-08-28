import React from "react";
import ProductColors from "./ProductColors";
import { Link } from "react-router-dom";

export class Product extends React.Component {
  getColorsLayout = () => {
    const product = this.props.product;
    if (product.options) {
      // Find the option that holds the colors
      const colorsOption = product.options.find(
        (option) => option.name.toUpperCase() === "COLOR"
      );

      // Select the colors array
      if (colorsOption && colorsOption.values) {
        const colors = [...colorsOption.values];
        return (
          <div className="card-footer bg-transparent">
            <ProductColors colors={colors} />
          </div>
        );
      }
    }

    return null;
  };

  render() {
    const { product } = this.props;
    return (
      <div className="col mb-4">
        <div className="card mb-4 shadow-sm h-100">
          <Link to={"/" + product.id}>
            <img
              className="card-img-top img-fluid"
              src={product.image.src}
              alt={product.image.alt}
            ></img>
            <div className="card-body">
              <h4 className="card-title">{product.title}</h4>
            </div>
          </Link>
          {this.getColorsLayout()}
        </div>
      </div>
    );
  }
}

export default Product;
