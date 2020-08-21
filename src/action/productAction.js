import { getListTrend } from "../service/products";
import { BEST_PRODUCT, POPULAR_PRODUCT, NEW_PRODUCT } from "./types";

export const GetTrendProduct = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getListTrend(data)
      .then((result) => {
        console.log("Result", data);
        if (result.data.ERROR == "0000") {
          //Promise.all([_storeData(TOKEN, result.data.TOKEN)]);
          if (data.STT_TREND === 1) {
            dispatch({ type: POPULAR_PRODUCT, payload: result.data.INFO });
          } else if (data.STT_TREND === 2) {
            dispatch({ type: BEST_PRODUCT, payload: result.data.INFO });
          } else if (data.STT_TREND === 3) {
            dispatch({ type: NEW_PRODUCT, payload: result.data.INFO });
          }
        } else {
        }
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
