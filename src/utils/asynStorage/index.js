import AsyncStorage from "@react-native-community/async-storage";
export const _storeData = (field, value) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(field, JSON.stringify(value))
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
        console.log("error store item asyncStore: " + error);
      });
  });
};
export const _retrieveData = async (field) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(field)
      .then((data) => {
        console.log("get asyncStore for key: " + field);
        resolve(data);
      })
      .catch((error) => {
        reject(error);
        console.log("error get item asyncStore: " + error);
      });
  });
};
export const _removeData = (field) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(field)
      .then(() => {
        console.log("remove asyncStore for key: " + field);
      })
      .catch((error) => {
        console.log("error remove item asyncStore: " + error);
      });
  });
};
