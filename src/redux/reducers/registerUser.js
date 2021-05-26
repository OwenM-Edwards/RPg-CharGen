import { REGISTER_USER, CLEAR_REGISTER_ERROR } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function registerReducer(state = initialState, action) {
   if (action.type === REGISTER_USER) {
      return action.payload
   }
   return state;
};

export default registerReducer;
