import React from "react";
import { Carousel } from "react-bootstrap";

class ProductImageCarousel extends React.Component {
  render() {
    const { product, activeIndex, selectedVariant, onSelect } = this.props;

    // Use the given id if specified directly by user (arrows)
    // Or if the color was selected in the dropdown find the
    // matching image id and use that index in the carousel
    const desiredIndex =
      activeIndex !== -1
        ? activeIndex
        : product.images.findIndex(
            (img) => img.id === selectedVariant.image_id
          );

    // Create the carousel item list
    const carouselItemsList = product.images.map((img, idx) => {
      return (
        <Carousel.Item key={img.id}>
          <img className="d-block w-100" src={img.src} alt={img.alt} />
        </Carousel.Item>
      );
    });

    return (
      <Carousel activeIndex={desiredIndex} onSelect={onSelect}>
        {carouselItemsList}
      </Carousel>
    );
  }
}

export default ProductImageCarousel;
