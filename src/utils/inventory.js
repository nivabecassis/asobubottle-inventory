/**
 * Creates a single dimension array for the inventory data.
 *
 * @param {Array} inventory Inventory array for a particular locale
 */
export const flattenInventoryData = (inventory) => {
  const results = [];
  inventory.forEach((inv) => {
    // Create a default record data with at least the color and onHandQty
    const record = {
      Color: inv.Color,
      Quantity: inv.Quantity,
      Ship_Eta: null,
      Ship_Qty: null,
    };

    if (inv.Shipments && inv.Shipments.length !== 0) {
      inv.Shipments.forEach((ship) => {
        // Add the shipment details
        results.push({
          ...record,
          Ship_Eta: ship.Eta,
          Ship_Qty: ship.Quantity,
        });
      });
    } else {
      results.push(record);
    }
  });

  return results;
};

/**
 * Calculates the on hand quantity of the inventory item taking
 * into consideration upcoming shipments and current stock.
 *
 * If there is reserved stock (ie. invItem.Quantity < 0),
 * the item will subtract the stock from the upcoming shipments and
 * remove those shipments from the list.
 *
 * @param {Object} invItem Inventory item for a single color
 */
export const calculateUpcomingShipments = (inventory) => {
  const results = [];

  inventory.forEach((inv) => {
    let onHandQty = inv.Quantity;

    // Ensure shipments are ordered earliest first
    let shipments = [...inv.Shipments]
      .map((ship) => {
        return { ...ship, Eta: new Date(ship.Eta) };
      })
      .sort((a, b) => a.Eta - b.Eta);

    let i = 0;
    while (onHandQty < 0 && i < shipments.length) {
      // Note: onHandQty is negative here
      if (shipments[i].Quantity + onHandQty > 0) {
        // Adjust on hand qty to 0 and subtract reserved stock from first shipment
        shipments[i].Quantity += onHandQty;
        onHandQty = 0;
        i++;
      } else {
        // Adjust on hand qty with shipment amount and remove shipment
        onHandQty += shipments[i].Quantity;
        shipments.shift();
      }
    }

    if (onHandQty < 0 && shipments.length === 0) {
      onHandQty = 0;
    }

    results.push({ ...inv, Quantity: onHandQty, Shipments: shipments });
  });

  return results;
};

/**
 * Remove the color and onHandQty of every subsequent inventory
 * item. Those fields should only appear once.
 *
 * @param {Array} inventory Inventory item data array
 */
export const prepareDataForInventoryTable = (inventory) => {
  const results = [];

  inventory.forEach((inv) => {
    if (results.find((r) => r.Color === inv.Color)) {
      // If there is already this color, only add the shipments details
      results.push({
        ...inv,
        Color: null,
        Quantity: null,
      });
    } else {
      results.push({ ...inv });
    }
  });

  return results;
};
