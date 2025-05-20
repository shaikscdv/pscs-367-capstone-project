import axios from "axios";

axios.interceptors.request.use(
  (req) => {
    const User = localStorage.getItem("UserInfo");
    const token = User && JSON.parse(User).token;
    console.log("token => ", token);

    if (token) {
      req.headers["access_token"] = token;
      console.log(req.headers["access_token"]);
    }

    return req;
  },

  (error) => {
    return Promise.reject(error);
  },
);
