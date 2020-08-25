import Axios from "axios";

/**
 * Makes a get request with the specified configuration
 * @param {string} url Url to call
 * @param {Function} success Success callback
 * @param {Function} failure Failure callback
 * @param {Object} config Any configs to pass to axios
 */
export async function get(url, success, failure, config) {
  Axios.get(url, config).then(
    (result) => success(result),
    (error) => failure(error)
  );
}
