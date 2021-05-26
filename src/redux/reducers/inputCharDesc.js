import { SUBMIT_CHAR_DESC } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function inputCharDescReducer(state = initialState, action) {
   if (action.type === SUBMIT_CHAR_DESC) {
      return action.payload
   }
   return state;
};

export default inputCharDescReducer;
