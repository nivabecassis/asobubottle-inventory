import React from "react";
import { Carousel } from "react-bootstrap";
import "../styles/ProductImageCarousel.css";

class ProductImageCarousel extends React.Component {
  render() {
    const {
      product,
      activeIndex,
      selectedVariantImageId,
      onSelect,
    } = this.props;

    // Use the given id if specified directly by user (arrows)
    // Or if the color was selected in the dropdown find the
    // matching image id and use that index in the carousel
    const desiredIndex =
      activeIndex !== -1
        ? activeIndex
        : product.images.findIndex((img) => img.id === selectedVariantImageId);

    // Create the carousel item list
    const carouselItemsList = product.images.map((img, idx) => {
      return (
        <Carousel.Item key={img.id}>
          <svg
            className="carousel-item-image"
            width="100%"
            viewBox={`0 0 ${img.width} ${img.height}`}
          >
            <image href={img.src} height={img.height} width={img.width} />
          </svg>
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
