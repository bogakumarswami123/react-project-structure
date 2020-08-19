import _ from "lodash";

// import UsersService from "../services/UserServices";
import request from "./request";
import cookie, { COOKIE_KEY_REFRESH_TOKEN } from "./cookie";

const siteConfig = window.siteConfig || {};
const apiUrl = "https://localhost:8000/";
const apiVersion = siteConfig.REACT_APP_API_VERSION;

// const UNAUTHORIZED = 401;

const api = {
  // Used to construct the request URL when `options.{path|pathname}` is defined
  baseUrl: apiUrl || "",
  apiVersion: `/${apiVersion}` || "/v1",

  // Return an Authorization header if a `token` exists
  getAuthorizationHeaders: () => {
    const headers = {};

    const token = cookie.getToken();
    if (token) {
      Object.assign(headers, {
        Authorization: `Bearer ${token}`,
      });
    }

    return headers;
  },

  getUrlAndOptions: (opts = {}) => {
    const { url: origUrl, path, pathname, ...options } = opts;
    let url = origUrl;

    _.defaults(options, { json: true, authenticate: true });

    options.method = options.method ? options.method.toUpperCase() : "GET";

    const apiPath = path || pathname;
    if (_.isString(apiPath)) {
      url = api.baseUrl + apiPath;
    }
    options.headers = options.headers || {};

    if (options.authenticate) {
      Object.assign(options.headers, api.getAuthorizationHeaders());
    }

    return {
      url,
      options,
    };
  },

  promise: (opts = {}) => {
    const { url, options } = api.getUrlAndOptions(opts);

    return request(url, options).catch((error) => {
      // const refreshToken = cookie.getCookie(COOKIE_KEY_REFRESH_TOKEN);

      // Catch and make error messages more human readable
      if (error.status >= 400 && error.status < 600) {
        // Set a generic error message if one isn't provided
        if (!error.message) {
          switch (error.status) {
            case 400:
              error.message = "Bad Request";
              break;
            case 401:
              error.message = "Unauthorized";
              break;
            case 403:
              error.message = "Forbidden";
              break;
            case 404:
              error.message = "Not Found";
              break;
            case 500:
            default:
              error.message = "Internal Server Error";
              break;
          }
        }
      }

      // if (error.status === UNAUTHORIZED && refreshToken) {
      //   return UsersService.refreshSession(refreshToken)
      //     .then(({ data }) => {
      //       const { accessToken, refreshToken } = data;

      //       cookie.setToken(accessToken);
      //       cookie.setCookie(COOKIE_KEY_REFRESH_TOKEN, refreshToken);
      //       window.location.reload();
      //     })
      //     .catch(() => {
      //       cookie.removeToken();
      //       cookie.setCookie(COOKIE_KEY_REFRESH_TOKEN, "");
      //       window.location.pathname = "/login";

      //       throw error;
      //     });
      // }

      throw error;
    });
  },
};

export default api;
