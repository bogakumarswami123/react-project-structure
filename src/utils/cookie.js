import _ from "lodash";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const COOKIE_KEY_TOKEN = "demo_token";
export const COOKIE_KEY_REFRESH_TOKEN = "demo_ref_token";
export const COOKIE_KEY_PID = "demo pid";

export default {
  // User

  getUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    return jwtDecode(token);
  },

  isLoggedIn() {
    return _.isString(this.getToken());
  },

  getCookieDomain() {
    if (!window.location) {
      return null;
    }

    // FIXME: does this work?
    if (window.location.hostname === "localhost") {
      return null;
    }

    // FIXME: doesn't work for domains like `.co.uk`
    return `.${window.location.hostname.split(".").slice(-2).join(".")}`;
  },

  getCookieOptions(options = {}) {
    return {
      path: "/", // this is the default
      domain: this.getCookieDomain(),
      expires: 365, // 1 year in days
      ...options,
    };
  },

  // Getter / Setter

  setCookie(key, val, options = {}) {
    if (_.isUndefined(key) || _.isUndefined(val)) {
      return;
    }
    Cookies.set(key, val, {
      ...this.getCookieOptions({ ...options }),
    });

    // this.webViewBridgeCookies();
  },

  getCookies() {
    return Cookies.get();
  },

  getCookie(key) {
    if (!key) {
      return null;
    }
    return Cookies.get(key);
  },

  removeCookie(key, options = {}) {
    if (!key) {
      return;
    }
    Cookies.remove(key, {
      ...this.getCookieOptions({ ...options }),
    });

    // this.webViewBridgeCookies();
  },

  // Authorization Token (JWT)

  setToken(token) {
    this.setCookie(COOKIE_KEY_TOKEN, token);
  },

  getToken() {
    return this.getCookie(COOKIE_KEY_TOKEN);
  },

  hasToken() {
    return !!this.getToken();
  },

  removeToken() {
    this.removeCookie(COOKIE_KEY_TOKEN);
  },

  // PID

  setPid(pid) {
    this.setCookie(COOKIE_KEY_PID, pid);
  },

  getPid() {
    return this.getCookie(COOKIE_KEY_PID);
  },
};
