import React from "react";

class ProductColors extends React.Component {
  render() {
    const colors = this.props.colors;
    const colorButtons = colors.map((c) => {
      return (
        <a
          key={c}
          style={{ height: 20, width: 21, backgroundColor: c.toLowerCase() }}
          className={`mx-1 rounded-circle border`}
          type="button"
          href="." // TODO - Change this href to the product page link
        >
          <span
            data-toggle="tooltip"
            data-placement="bottom"
            title={c.toLowerCase()}
          ></span>
        </a>
      );
    });

    return (
      <div className="list-group-horizontal overflow-hidden">
        {colorButtons}
      </div>
    );
  }
}

export default ProductColors;
