import { ACCOUNT_NOTIFY } from "./types";

export const countNotify = (text) => (dispatch) => {
  return dispatch({ type: ACCOUNT_NOTIFY, payload: text });
};
