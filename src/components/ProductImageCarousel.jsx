import React from "react";

class ProductImageCarousel extends React.Component {
  getCarouselTargets = () => {
    const product = this.props.product;
    const images = product.images;

    if (images) {
      const items = images.map((img, index) => {
        return (
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={index}
          ></li>
        );
      });

      if (items[0]) {
        items[0].className = "active";
      }

      return <ol class="carousel-indicators">{items}</ol>;
    }
  };

  getCarouselItems = () => {
    const product = this.props.product;
    const images = product.images;
    if (!images) {
      return null;
    }

    return images.map((img, index) => {
      return (
        <div className="carousel-item">
          <img src={img.src} alt={img.alt}></img>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="carousel slide" data-ride="carousel">
        {this.getCarouselTargets()}
        <div className="carousel inner">{this.getCarouselItems()}</div>
      </div>
    );
  }
}

export default ProductImageCarousel;
