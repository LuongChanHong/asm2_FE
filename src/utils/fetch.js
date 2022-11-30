import axios from "axios";
import { serverPath } from "./path";

export const get = (url, params) => {
  if (params === undefined) {
    params = "";
  }
  return axios.get(serverPath + url + params);
};

export const post = (url, jsonData) => axios.post(serverPath + url, jsonData);
