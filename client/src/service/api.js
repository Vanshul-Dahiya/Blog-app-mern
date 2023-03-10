import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
const API_URL = "http://localhost:8000";

// making a common api with help of api interceptors

// timeout is for api delay response (in milliseconds)
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// usually when api starts, a loader is shown on screen
// and it is stopped when response comes
axiosInstance.interceptors.response.use(
  function (response) {
    // stop global loader here after getting response and show data
    return processResponse(response);
  },
  function (error) {
    // stop loader and show error
    return Promise.reject(processError(error));
  }
);

// ------------------------------------- //
// if success -> return { isSuccess:true ,data:Object }
// if error -> return { isFailure:true ,status:string,msg:string,code:int }
// ------------------------------------- //

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};
const processError = (error) => {
  // 3 types of error -> req,res, msg
  if (error.response) {
    // request made but server responded with status code other than 200
    // that falls out of the range of 2XX
    console.log("Error in response : ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    // request made but no response was received
    // -> might be because of connectivity or network issue
    console.log("Error in request : ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // something happened in frontend , setting up req that triggers an error
    console.log("Error in network : ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

// loop service_urls which contain multiple requests , execute them using for loop
// 'key' will have 'userSignup' and 'value' will have its values
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => {
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
  };
}
export { API };
