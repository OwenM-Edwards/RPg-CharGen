import { combineReducers } from "redux";
import changeRace from "./changeRace";
import newChar from "./newCharacter";
import signIn from "./signIn";
import register from "./registerUser";
export default combineReducers({
   changeRace,
   newChar,
   signIn,
   register,
});