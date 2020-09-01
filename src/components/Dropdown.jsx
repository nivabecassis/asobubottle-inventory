import React, { Component } from "react";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: props.options[0],
    };
  }

  handleColorChange = (e) => {
    this.setState({ selectedColor: e.target.innerText });
  };

  render() {
    return (
      <div className="dropdown mb-2">
        <button
          className="btn btn-outline-primary dropdown-toggle"
          type="button"
          id={this.props.buttonId}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.state.selectedColor}
        </button>
        <div className="dropdown-menu" aria-labelledby={this.props.buttonId}>
          {this.props.options.map((c) => {
            return (
              <button
                key={c}
                onClick={this.handleColorChange}
                className="dropdown-item"
                type="button"
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dropdown;
