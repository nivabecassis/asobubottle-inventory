/**
 * Makes an AJAX request with the specified configuration
 * @param {string} url Url to call
 */
export async function get(url) {
  return await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // return await response.json();
}

/**
 * Reads a GET request response and returns network info along with data (if success)
 * @param {Object} response Response from a GET request
 */
export async function readResult(response) {
  let result = {};

  if (response) {
    result.success = response.ok;
    result.status = response.status;

    const json = await response.json();

    console.log(response, json);
    if (!response.ok) {
      result.message = json.Message || "unknown error";
    } else {
      result = { ...result, ...json };
    }
  }

  return result;
}
