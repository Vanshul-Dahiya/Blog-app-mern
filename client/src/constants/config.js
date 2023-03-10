// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Please wait, your data is being loaded",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occurred while fetching data response from data. Please try again",
  },
  requestFailure: {
    title: "Error",
    message: "An error occurred while parsing request data",
  },
  networkError: {
    title: "Error",
    message:
      "Unable to connect with server.Check internet connectivity and try again",
  },
};

// api service call
// sample request 
// need service call: {url:'/',method:'post/get/put/delete',params:true/false,query:true/false}
export const SERVICE_URLS = {
  userSignup: { url: "/signup", method: "POST" },
};
