import { Login, updateDevice, getProfile } from "../service/auth";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT } from "./types";
import { _storeData } from "../utils/asynStorage";
import { TOKEN, AUTH, USER_NAME } from "../utils/asynStorage/store";

export const LoginPhone = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return Login(data)
      .then((result) => {
        console.log("Result", result.data);
        if (result.data.ERROR == "0000") {
          Promise.all([_storeData(TOKEN, result.data.TOKEN)]);
          Promise.all([_storeData(USER_NAME, result.data.USERNAME)]);
          dispatch({ type: LOGIN_SUCCESS, payload: result.data });
        } else {
          dispatch({ type: LOGIN_FAIL });
        }
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const UpdateDivice = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return updateDevice(data)
      .then((result) => {
        console.log("Result", result.data);
        if (result.data.ERROR == "0000") {
          Promise.all([_storeData(AUTH, result.data)]);
          dispatch({ type: LOGIN_SUCCESS, payload: result.data });
        } else {
          dispatch({ type: LOGIN_FAIL });
        }
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const GetProfile = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return getProfile(data)
      .then((result) => {
        console.log("Result", result.data);
        if (result.data.ERROR == "0000") {
          //Promise.all([_storeData(TOKEN, result.data.TOKEN)]);
          dispatch({ type: LOGIN_SUCCESS, payload: result.data });
        } else {
          dispatch({ type: LOGIN_FAIL });
        }
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const LogOut = (data) => (dispatch) => {
  return dispatch({ type: LOG_OUT });
};
