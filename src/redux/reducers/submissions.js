import { GET_SUBMISSIONS } from "../actions/action-types";

const initialState = {
   isFetching: false,
   submissions: false,
   error: false,
   submittedFNames: false,
   submittedLNames: false,
   submittedImages: false,
   submittedRoleplays: false,
   submittedIntrigues: false,
};

function submissionsReducer (state = initialState, action) {
   if (action.type === GET_SUBMISSIONS) {
      console.log(action.payload)
      return action.payload
   }
   return state;
};

export default submissionsReducer;
