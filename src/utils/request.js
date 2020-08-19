import _ from "lodash";

import { searchFromQuery } from "./parser";

/**
 * Parses the JSON returned by a network request
 *
 * @param {object} response A response from a network request
 *
 * @return {object} The parsed JSON from the request
 */
function parseJSON(response) {
  if (/application\/json/i.test(response.headers.get("Content-Type"))) {
    return response.json();
  }
  return {
    meta: {
      statusCode: response.status,
    },
    data: {},
  };
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param {object} response A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let errorMessage = response.statusText;
  try {
    const json = await response.json();
    if (json.error && json.error.message) {
      errorMessage = json.error.message;
    }
  } catch (jsonErr) {
    // NO-OP
  }

  const error = new Error(errorMessage);
  error.response = response;
  error.status = response.status;
  error.statusCode = response.status;
  error.statusText = response.statusText;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param {string} url The URL we want to request
 * @param {object} [options] The options we want to pass to "fetch"
 *
 * @return {object} The response data
 */
export default function request(origUrl, options) {
  let url = origUrl;

  // Build Headers
  options.headers = options.headers || {};

  // Build URL query string (optional)
  if (!_.isEmpty(options.query)) {
    url = `${url}${searchFromQuery(options.query)}`;
  }

  // Headers and Body (json or form)
  if (["POST", "PUT", "PATCH"].includes(options.method)) {
    if (options.form) {
      const formData = new FormData();
      _.forEach(options.form, (val, key) => {
        formData.append(key, val);
      });
      options.body = formData;
    } else if (options.json) {
      Object.assign(options.headers, {
        "Content-Type": "application/json",
      });
      options.body = JSON.stringify(options.body);
    }
  }

  // debug(`${options.method} ${url}`, options);

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      error.status = error.status || 500;
      error.statusCode = error.statusCode || 500;
      throw error;
    });
}
