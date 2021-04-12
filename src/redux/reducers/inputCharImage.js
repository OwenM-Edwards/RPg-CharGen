import { SUBMIT_CHAR_IMAGE } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function inputCharImageReducer(state = initialState, action) {
   if (action.type === SUBMIT_CHAR_IMAGE) {
      return action.payload
   }
   return state;
};

export default inputCharImageReducer;
