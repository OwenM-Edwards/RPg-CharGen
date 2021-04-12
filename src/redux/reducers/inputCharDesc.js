import { SUBMIT_CHAR_DESC,CLEAR_INPUT_DESC_ERROR } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
};

function inputCharDescReducer(state = initialState, action) {
   if (action.type === SUBMIT_CHAR_DESC) {
      return action.payload
   }
   else if(action.type === CLEAR_INPUT_DESC_ERROR){
      return action.payload
   }
   return state;
};

export default inputCharDescReducer;
