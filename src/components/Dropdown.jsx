import React, { Component } from "react";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  handleOptionChange = (e) => {
    this.props.onClick(e.target.innerText);
    this.setState({ selectedOption: e.target.innerText });
  };

  getDropdownStyle = () => {
    const { outline, type } = this.props;

    let btnClass = "btn dropdown-toggle btn";
    if (outline) btnClass += "-outline";
    btnClass += "-" + type;

    return btnClass;
  };

  render() {
    const { buttonId, options, label } = this.props;
    return (
      <div className="dropdown mb-2 " id={buttonId}>
        <button
          className={this.getDropdownStyle()}
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.state.selectedOption || label}
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
