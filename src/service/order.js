import api from "../api";
import qs from "qs";
export const getListOrder = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_order_history", data)
      .then((result) => {
        console.log("list order", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
export const getListOrderStore = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_order_history_store_babu", data)
      .then((result) => {
        console.log("list order store", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
export const getDetailOrdered = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_order_history_detail_babu", data)
      .then((result) => {
        console.log("detail order", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const orderProduct = (data) => {
  return new Promise((resolve, reject) => {
    console.log("data", data);
    return api
      .post("order_product3", data, {
        // paramsSerializer: (params) => {
        //   return qs.stringify(params, { arrayFormat: "repeat" });
        // },
      })
      .then((result) => {
        console.log(" order", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const updateOrder = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("edit_order_product2", data)
      .then((result) => {
        console.log("update order", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const updateOrderShop = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("update_bill_order_shop", data)
      .then((result) => {
        console.log("update order shop", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const listStores = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_order_history_detail_pd", data)
      .then((result) => {
        console.log("list store", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const GetListStore = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_store", data)
      .then((result) => {
        console.log("list store", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
