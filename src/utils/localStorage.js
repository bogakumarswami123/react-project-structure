export const USER_STORAGE_KEY = 'kip_user';

const storageAPI = {
  /**
   * @mixed
   * @param key
   */
  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return localStorage.getItem(key);
    }
  },

  /**
   * @void
   * @param key
   * @param value
   */
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * @void
   * @param key
   */
  removeItem(key){
    localStorage.removeItem(key);
  },
};

export default storageAPI;
