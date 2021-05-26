import { SIGN_IN, SIGN_OUT } from "../actions/action-types";

const initialState = {
   isFetching: false,
   authenticated: false,
};

function authenticateReducer(state = initialState, action) {
   if (action.type === SIGN_IN) {
      return action.payload
   }
   else if (action.type === SIGN_OUT) {
      return initialState
   }
   
   return state;
};

export default authenticateReducer;
