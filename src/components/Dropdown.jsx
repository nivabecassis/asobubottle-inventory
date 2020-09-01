import React, { Component } from "react";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: props.options[0],
    };
  }

  handleOptionChange = (e) => {
    this.props.onClick(e.target.innerText);
    this.setState({ selectedColor: e.target.innerText });
  };

  render() {
    const { buttonId, options } = this.props;
    return (
      <div className="dropdown mb-2">
        <button
          className="btn btn-outline-primary dropdown-toggle"
          type="button"
          id={buttonId}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.state.selectedColor}
        </button>
        <div className="dropdown-menu" aria-labelledby={buttonId}>
          {options.map((c) => {
            return (
              <button
                key={c}
                onClick={this.handleOptionChange}
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
