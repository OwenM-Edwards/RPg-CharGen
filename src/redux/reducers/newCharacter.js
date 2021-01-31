import { NEW_CHAR } from "../actions/action-types";

const initialState = {
   isFetching: false,
   newChar: false,
};

function newCharReducer(state = initialState, action) {
   if (action.type === NEW_CHAR) {
      return action.payload
   }
   return state;
};

export default newCharReducer;
