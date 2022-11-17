import { serverPath } from "./path";

export const get = async (url, params) => {
  if (params === undefined) {
    params = "";
  }
  const fetchPromise = await fetch(serverPath + url + params);
  return fetchPromise;
};

export const post = async (url, jsonData) => {
  const fetchPromise = await fetch(serverPath + url, {
    method: "POST",
    body: JSON.stringify(jsonData),
    headers: { "Content-type": "application/json" },
    credentials: "same-origin",
  });
  return fetchPromise;
};
