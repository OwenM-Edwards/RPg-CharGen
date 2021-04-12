import { SUBMIT_CHAR_ROLEPLAY,CLEAR_INPUT_ROLEPLAY_ERROR } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
};

function inputCharRoleplayReducer(state = initialState, action) {
   if (action.type === SUBMIT_CHAR_ROLEPLAY) {
      return action.payload
   }
   else if(action.type === CLEAR_INPUT_ROLEPLAY_ERROR){
      return action.payload
   }
   return state;
};

export default inputCharRoleplayReducer;
