import axios from "axios";

const callApi = (token, contentType) => {
  const instance = axios.create({
    // baseURL: 'https://incompass-back.addictaco.website/api',
    baseURL: "https://app-marinoz.addictaco.website/api/v1",
    withCredentials: true,
    headers: {
      "Content-Type": contentType ?? "application/json",
      Authorization: token ? ` Bearer ${token} ` : undefined,
      "api-key":
        "0TWpNy02pUvLx6NL27FP8S2uUvvt4Lx23rWfH2f3pxlgfKUnHoPic9U8NDqRgV2n",
    },
  });

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      return {
        status: response.status,
        data: response.data,
      };
    },
    (error) => Promise.reject(error),
  );

  return instance;
};

export default callApi;
