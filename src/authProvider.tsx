import { AuthProvider } from "react-admin";

const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("username", username);
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  },

  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  },
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    return Promise.resolve();
  },
};

export default authProvider;
