import { SUBMIT_CHAR_INTRIGUE,CLEAR_INPUT_INTRIGUE_ERROR } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
};

function inputCharIntrigueReducer(state = initialState, action) {
   if (action.type === SUBMIT_CHAR_INTRIGUE) {
      return action.payload
   }
   else if(action.type === CLEAR_INPUT_INTRIGUE_ERROR){
      return action.payload
   }
   return state;
};

export default inputCharIntrigueReducer;
