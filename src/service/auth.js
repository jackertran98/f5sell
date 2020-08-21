import api from "../api";

export const Login = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("login1", data)
      .then((result) => {
        console.log("Login", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const updateDevice = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("check_device", data)
      .then((result) => {
        console.log("Login token", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getProfile = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_info_ctv_detail", data)
      .then((result) => {
        console.log("Login token", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const regUser = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("reg_user", data)
      .then((result) => {
        console.log("Reg", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
