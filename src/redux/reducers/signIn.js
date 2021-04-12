import { CLEAR_SIGN_IN_ERROR, SIGN_IN } from "../actions/action-types";

const initialState = {
   isFetching: false,
   authenticated: false,
};

function signInReducer(state = initialState, action) {
   if (action.type === SIGN_IN) {
      return action.payload
   }
   return state;
};

export default signInReducer;
