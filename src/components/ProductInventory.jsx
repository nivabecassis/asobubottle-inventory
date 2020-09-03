import React, { Component } from "react";
import {
  flattenInventoryData,
  calculateUpcomingShipments,
  prepareDataForInventoryTable,
} from "../utils/inventory";

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
    const localeInventory = [...this.state.localeInventory];

    // Adjust current stock with upcoming shipments
    let shipmentsList = calculateUpcomingShipments(localeInventory);

    // Make the data single dimension
    shipmentsList = flattenInventoryData(shipmentsList);

    // Remove duplicate colors and onHandQty
    shipmentsList = prepareDataForInventoryTable(shipmentsList);

    const shipmentsRows = shipmentsList.map((ship, index) => {
      return (
        <tr key={ship.Color + index}>
          <td>{ship.Color}</td>
          <td>{ship.Quantity}</td>
          <td>{ship.Ship_Eta ? ship.Ship_Eta.toLocaleDateString() : "-"}</td>
          <td>{ship.Ship_Qty ? ship.Ship_Qty : "-"}</td>
        </tr>
      );
    });

    return <tbody>{shipmentsRows}</tbody>;
  };

  render() {
    return (
      <React.Fragment>
        <h4 className="mb-4">Product Inventory</h4>
        <div className="btn-group btn-group-toggle mb-4" data-toggle="buttons">
          {this.getLocales()}
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Color</th>
              <th scope="col">On-Hand Quantity</th>
              <th scope="col">Upcoming Shipments</th>
              <th scope="col">Shipment Quantities</th>
            </tr>
          </thead>
          {this.getInventoryTableData()}
        </table>
      </React.Fragment>
    );
  }
}

export default ProductInventory;
