import api from "../api";

export const getCollorator = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_discount", data)
      .then((result) => {
        console.log("list collbara", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getListCTVChild = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_ctv_child", data)
      .then((result) => {
        console.log("list child", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
