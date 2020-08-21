import { ACCOUNT_NOTIFY } from "../action/types";

const INIT_STATE = {
  countNotify: 0,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACCOUNT_NOTIFY: {
      return {
        ...state,
        countNotify: action.payload,
      };
    }

    default:
      return { ...state };
  }
};
