import axios from "axios";
import store from "../store";
import { logout } from "../store/features/auth/authSlice";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default instance;
