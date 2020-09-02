/**
 * Creates a single dimension array for the inventory data.
 *
 * If a color or quantity field is repeated, the other (after first) objects
 * leave the field null. This is weird behavior but needed to format the data
 * into a 1D table.
 *
 * @param {Array} inventory Inventory array for a particular locale
 */
export const prepareInventoryDataForSingleDimensionTable = (inventory) => {
  const results = [];
  inventory.forEach((inv) => {
    // No shipments on this inventory item
    if (!inv.Shipments || inv.Shipments.length === 0) {
      results.push({
        Color: inv.Color,
        Quantity: inv.Quantity,
        Ship_Eta: null,
        Ship_Qty: null,
      });
    } else {
      // Create the record for the shipment details
      inv.Shipments.forEach((ship) => {
        const record = {
          Color: null,
          Quantity: null,
          Ship_Eta: new Date(ship.Eta),
          Ship_Qty: ship.Quantity,
        };

        // Only the first result of this color should have the color and
        // quantity fields set
        if (!results.find((result) => result.Color === inv.Color)) {
          record.Color = inv.Color;
          record.Quantity = inv.Quantity;
        }
        results.push(record);
      });
    }
  });

  return results;
};
