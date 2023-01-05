import axios from "axios";
import { getCookie } from "../cookie";

export const BASE_URL = "https://mandarin.api.weniv.co.kr";

const axiosApi = (url, options) => {
  return axios.create({
    baseURL: url,
    ...options,
  });
};

export const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const axiosJsonApi = (url, options) => {
  return axios.create({
    baseURL: url,
    headers: {
      "Content-type": "application/json",
    },
    ...options,
  });
};

authInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");

    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const defaultInstance = axiosApi(BASE_URL);
export const jsonInstance = axiosJsonApi(BASE_URL);
