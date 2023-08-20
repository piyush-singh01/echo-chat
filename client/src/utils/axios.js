// note this is the only created file

import axios from "axios";
import { BASE_URL } from "../config.js";

const axiosInstance = axios.create({ baseURL: BASE_URL });

// a response interceptor
// takes in two callbacks, one for successful response, and other for unsuccessful
axios.interceptors.response.use(
  (response) => response,   //called if successful
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;