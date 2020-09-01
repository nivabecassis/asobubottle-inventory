import React, { Component } from "react";

class ProductInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Default selected locale is NA
      selectedLocale: props.product.inventory[0].Locale.Code,
      localeInventory: [...props.product.inventory[0].Variations],
    };
  }

  handleLocaleChange = (e) => {
    // There is a bug related to onChange that's why I'm adding this check
    const newValue = e.currentTarget.value;
    if (newValue !== this.state.selectedLocale) {
      // Find the matching inventory data that corresponds with the new locale
      const inventory = this.props.product.inventory.find(
        (i) => i.Locale.Code === newValue
      );

      this.setState({
        selectedLocale: e.currentTarget.value,
        localeInventory: [...inventory.Variations],
      });
    }
  };

  isSelectedLocale = (locale) => {
    return this.state.selectedLocale === locale;
  };

  getLocales = () => {
    const { product, type } = this.props;

    return product.inventory.map((inv, index) => {
      const locale = inv.Locale;
      return (
        // Create a radio option for each inventory region
        <label
          key={locale.Code}
          htmlFor={locale.Code}
          className={`btn btn-outline-${type} btn-sm ${
            this.isSelectedLocale(locale.Code) ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="regions"
            id={locale.Code}
            checked={this.isSelectedLocale(locale.Code)}
            onClick={this.handleLocaleChange}
            onChange={(e) => null} // Swallowing the event because there is a bug with onChange
            value={locale.Code}
          />
          {locale.Region}
        </label>
      );
    });
  };

  getInventoryTableData = () => {
    const { localeInventory } = this.state;
    const rows = localeInventory.map((i) => {
      return (
        <tr key={i.Color}>
          <td>{i.Color}</td>
          <td>{i.Quantity}</td>
          <td>{this.listUpComingShipments(i)}</td>
        </tr>
      );
    });
    return <tbody>{rows}</tbody>;
  };

  listUpComingShipments = (inventory) => {
    // Create a date object for the shipment
    const shipments = inventory.Shipments.map((ship) => {
      return { Eta: new Date(ship.Eta), Quantity: ship.Quantity };
    });

    // Sort the shipments based on ascending dates (earlier first)
    const sortedShipments = shipments.sort((a, b) => a.Eta - b.Eta);

    // Create an unordered list of upcoming shipments
    const shipmentsList = sortedShipments.map((ship, index) => {
      return (
        <li
          key={ship.Quantity + index}
          className="list-group-item"
        >{`${new Date(ship.Eta).toLocaleDateString()}: ${ship.Quantity}`}</li>
      );
    });
    return <ul className="list-group list-group-flush">{shipmentsList}</ul>;
  };

  render() {
    return (
      <React.Fragment>
        <h4 className="mb-4">Product Inventory</h4>
        <div className="btn-group btn-group-toggle mb-4" data-toggle="buttons">
          {this.getLocales()}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Color</th>
              <th scope="col">Quantity</th>
              <th scope="col">Upcoming shipments</th>
            </tr>
          </thead>
          {this.getInventoryTableData()}
        </table>
      </React.Fragment>
    );
  }
}

export default ProductInventory;
