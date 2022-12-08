import axios from "axios";
import { serverPath } from "./path";

export const get = (url, params) => {
  if (params === undefined) {
    params = "";
  }
  return axios.get(serverPath + url + params);
};

export const post = (url, jsonData) => {
  // console.log("jsonData:", jsonData);
  return axios.post(serverPath + url, jsonData);
};
