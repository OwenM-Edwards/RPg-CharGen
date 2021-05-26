import { combineReducers } from "redux";
import newChar from "./newCharacter";
import authenticate from "./authenticate";
import register from "./registerUser";
import submissions from "./submissions";
import inputCharDesc from "./inputCharDesc";
import inputCharIntrigue from './inputCharIntrigue'
import inputCharImage from './inputCharImage';
import inputCharRoleplay from './inputCharRoleplay';
// import currentTheme from './currentTheme';

export default combineReducers({
   newChar,
   authenticate,
   register,
   submissions,
   inputCharDesc,
   inputCharIntrigue,
   inputCharImage,
   inputCharRoleplay,
});