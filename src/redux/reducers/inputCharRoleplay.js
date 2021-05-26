import { SUBMIT_CHAR_ROLEPLAY } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
};

function inputCharRoleplayReducer(state = initialState, action) {
   if (action.type === SUBMIT_CHAR_ROLEPLAY) {
      return action.payload
   }
   return state;
};

export default inputCharRoleplayReducer;
