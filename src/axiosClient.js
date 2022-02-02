import axios from "axios";

const axiosClient = axios.create();

//axiosClient.defaults.baseURL = baseUrl;

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  //Authorization: "Bearer 0x889b66921Cd1551eFF296dfAa5e9E0143f85a6F4",
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

//axiosClient.defaults.withCredentials = true;

export function getRequest(URL) {
  return axiosClient.get(URL).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(URL, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
