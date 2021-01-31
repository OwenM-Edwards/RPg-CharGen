import { CHANGE_RACE } from "../actions/action-types";

const initialState = {
   race : { value: 'random', label: 'Random Race' },
};

function changeRaceReducer(state = initialState, action) {
   if (action.type === CHANGE_RACE) {
      return action.payload
   }
   return state;
};

export default changeRaceReducer;
