import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import reducers from "../reducer";
export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(Thunk))
  );
  console.log("Redux", store);
  return store;
}

// export const store = createStore(reducers, {}, compose(applyMiddleware(Thunk)));
