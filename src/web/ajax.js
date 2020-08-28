/**
 * Makes an AJAX request with the specified configuration
 * @param {string} url Url to call
 */
export async function get(url) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
