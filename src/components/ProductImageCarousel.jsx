import React from "react";
import { Carousel } from "react-bootstrap";

class ProductImageCarousel extends React.Component {
  render() {
    const { product, activeIndex, onSelect } = this.props;

    // Create the carousel item list
    const carouselItemsList = product.images.map((img, idx) => {
      return (
        <Carousel.Item key={img.src}>
          <img className="d-block w-100" src={img.src} alt={img.alt} />
        </Carousel.Item>
      );
    });

    return (
      <Carousel activeIndex={activeIndex} onSelect={onSelect}>
        {carouselItemsList}
      </Carousel>
    );
  }
}

export default ProductImageCarousel;
