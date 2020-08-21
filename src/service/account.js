import api from "../api";

export const UpdateInforAccount = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("edit_info_ctv", data)
      .then((result) => {
        console.log("update ", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const GetListCTV = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_ctv", data)
      .then((result) => {
        console.log("list ctv ", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const GetInformation = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_infomation", data)
      .then((result) => {
        console.log("get_infomation ", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const GetLevelCTV = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_discount", data)
      .then((result) => {
        console.log("discount ", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
