import api from "../api";

export const GetCity = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_city", data)
      .then((result) => {
        console.log("get city", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const GetDistrict = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_district", data)
      .then((result) => {
        console.log("get district", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const GetDistrictChild = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_ward", data)
      .then((result) => {
        console.log("get district child", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
