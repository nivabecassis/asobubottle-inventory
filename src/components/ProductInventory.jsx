import React, { Component } from "react";
import {
  flattenInventoryData,
  calculateUpcomingShipments,
  prepareDataForInventoryTable,
} from "../utils/inventory";

class ProductInventory extends Component {
  /**
   * Comparing the selected locale code (eg. NA or EU) to the
   * specified locale code.
   *
   * @param {String} locale The locale code eg. NA or EU
   */
  isSelectedLocale = (locale) => {
    return this.props.selectedLocale === locale;
  };

  getLocales = () => {
    const { locales, onLocaleChange, type } = this.props;

    return locales.map((locale) => {
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
            onClick={onLocaleChange}
            onChange={(e) => null} // Swallowing the event because there is a bug with onChange
            value={locale.Code}
          />
          {locale.Region}
        </label>
      );
    });
  };

  getInventoryTableData = () => {
    const inventory = [...this.props.inventory];

    // Adjust current stock with upcoming shipments
    let shipmentsList = calculateUpcomingShipments(inventory);

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
