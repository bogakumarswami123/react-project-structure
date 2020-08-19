import api from "../utils/api";

const UsersService = {
  request: api.promise,

  signIn(user) {
    return this.request({
      path: "users/login",
      method: "POST",
      body: user,
    });
  },
  async logout() {
    return this.request({
      path: "/logout",
      method: "DELETE",
    });
  },
};

export default UsersService;
