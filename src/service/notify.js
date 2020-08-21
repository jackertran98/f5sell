import api from "../api";

export const getListNotify = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_notify", data)
      .then((result) => {
        console.log("list notify", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const updateNotify = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("update_notify", data)
      .then((result) => {
        console.log("update notify", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
