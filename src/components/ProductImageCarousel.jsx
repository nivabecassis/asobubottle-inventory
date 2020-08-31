import React from "react";

class ProductImageCarousel extends React.Component {
  getCarouselTargets = () => {
    const { images } = this.props.product;

    if (images) {
      const items = images.map((img, index) => {
        return (
          <li
            key={img.src}
            style={{ backgroundColor: "black" }}
            className={this.isActive(index)}
            data-target="#productImagesCarousel"
            data-slide-to={index}
          ></li>
        );
      });

      return <ol className="carousel-indicators">{items}</ol>;
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
        <div key={img.src} className={"carousel-item " + this.isActive(index)}>
          <img src={img.src} className="d-block w-100" alt={img.alt}></img>
        </div>
      );
    });
  };

  getCarouselControls = () => {
    return (
      <React.Fragment>
        <a
          className="carousel-control-prev"
          href="#productImagesCarousel"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#productImagesCarousel"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </React.Fragment>
    );
  };

  isActive = (index) => {
    return index === 0 ? "active" : "";
  };

  render() {
    return (
      <div
        id="productImagesCarousel"
        className="carousel slide"
        data-ride="carousel"
      >
        {this.getCarouselTargets()}
        <div className="carousel-inner">{this.getCarouselItems()}</div>
        {this.getCarouselControls()}
      </div>
    );
  }
}

export default ProductImageCarousel;
