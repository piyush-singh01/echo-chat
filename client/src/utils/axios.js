// note this is the only created file

import axios from "axios";
import { BASE_URL } from "../config.js";

const axiosInstance = axios.create({ baseURL: BASE_URL });

// a response intercepter
// takes in two callbacks, one for succesful response, and other for unsuccesful
axios.interceptors.response.use(
  (response) => response,   //called if successful
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;