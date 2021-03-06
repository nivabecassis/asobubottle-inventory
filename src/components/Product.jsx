import React from "react";
import { Link } from "react-router-dom";
import "../styles/Product.css";

export class Product extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div className="col mb-2">
        <div className="card mb-4 h-100">
          <Link to={"/" + product.id} className="cleanLink">
            <img
              className="card-img-top img-fluid"
              src={product.image.src}
              alt={product.image.alt}
            ></img>
            <div className="card-body">
              <h4 className="card-title">{product.title}</h4>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Product;
