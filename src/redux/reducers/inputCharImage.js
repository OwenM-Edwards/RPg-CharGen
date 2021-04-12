import { SUBMIT_CHAR_IMAGE,CLEAR_INPUT_IMAGE_ERROR } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
};

function inputCharImageReducer(state = initialState, action) {
   if (action.type === SUBMIT_CHAR_IMAGE) {
      return action.payload
   }
   else if(action.type === CLEAR_INPUT_IMAGE_ERROR){
      return action.payload
   }
   return state;
};

export default inputCharImageReducer;
