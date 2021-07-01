import { SIGNIN, SETQUERYSTRING, SETACCESSTOKEN } from "../actions/index";
import { initialState } from "./initialState";
import { PURGE } from "redux-persist";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURGE: 
      return Object.assign({}, initialState);
    case SIGNIN:
      return Object.assign({}, state, action.payload);
    case SETQUERYSTRING:
      return Object.assign({}, state, action.payload);
    case SETACCESSTOKEN:
    return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

export default reducer;