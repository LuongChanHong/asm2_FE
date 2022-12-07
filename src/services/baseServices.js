import axios from "axios";
import { serverPath } from "../utils/path";

export class baseService {
  get = (url, params) => {
    if (params) {
      url = url + params;
    }
    return axios.get(`${serverPath}` + `${url}`);
  };

  post = (url, data) => {
    return axios.post(`${serverPath}` + `${url}`, { data });
  };

  // put = (url, model) => {
  //   return Axios({
  //     url: `${DOMAIN}/${url}`,
  //     method: "PUT",
  //     data: model,
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem(TOKEN),
  //       TokenCybersoft:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjQiLCJIZXRIYW5TdHJpbmciOiIyMS8wMS8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDI3MjMyMDAwMDAiLCJuYmYiOjE2MTYxNzMyMDAsImV4cCI6MTY0Mjg3MDgwMH0.2sSWVGy-3Ce9iJ8bIYmYOJ9aE1eu3fz07DtA2ECfiyk",
  //     },
  //   });
  // };
}
