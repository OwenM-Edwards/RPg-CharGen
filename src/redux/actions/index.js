import { ADD_ARTICLE, CHANGE_RACE, NEW_CHAR, SIGN_IN, REGISTER_USER, CLEAR_REGISTER_ERROR } from "./action-types";
import axios from 'axios';
import { toast } from "react-toastify";


export function addArticle(payload) {
   return { type: ADD_ARTICLE, payload}
};

export function changeRace() {
   return {
      type: CHANGE_RACE,
      payload: {
         race : { value: 'test', label: 'testing' },
      }
   }
};

export const generateCharacter = ({gender, race}) => async (dispatch) => {
   dispatch({
      type: NEW_CHAR,
      payload:{
         isFetching: true,
         newChar: {},
      },
   })
   const json = JSON.stringify({
      "race": race,
      "gender": gender
   })
   const genCharResponse = await axios.post('https://safe-dawn-37731.herokuapp.com/genchar', json, {
      headers: {
        'Content-Type': 'application/json'
      }
   });
   dispatch({
      type: NEW_CHAR,
      payload:{
         isFetching: false,
         newChar: genCharResponse,
      },
   })
}

export const signIn = ({userEmail, userPassword}) => async (dispatch) => {
   dispatch({
      type: SIGN_IN,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "email": userEmail,
      "password": userPassword
   })
   const authenticated = await axios.post('https://safe-dawn-37731.herokuapp.com/signin', json, {
      headers: {
        'Content-Type': 'application/json'
      }
   })
   .then(data => {
      dispatch({
         type: SIGN_IN,
         payload:{
            isFetching: false,
            authenticated: true,
         },
      })
   })
   .catch(error => {
      toast.dismiss();
      toast.error('Incorrect email address or password.');
      dispatch({
         type: SIGN_IN,
         payload:{
            isFetching: false,
            authenticated: false,
         },
      })
   });
}

export const registerUser = ({userEmail, userPassword, userName}) => async (dispatch) => {
   dispatch({
      type: REGISTER_USER,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "email": userEmail,
      "password": userPassword,
      "name" : userName
   })
   const authenticated = await axios.post('https://safe-dawn-37731.herokuapp.com/register', json, {
      headers: {
        'Content-Type': 'application/json'
      }
   })
   .then(data => {
      dispatch({
         type: REGISTER_USER,
         payload:{
            isFetching: false,
         },
      })
      dispatch({
         type: SIGN_IN,
         payload:{
            authenticated: true,
         },
      })
   })
   .catch(error => {
      toast.dismiss();
      toast.error('Incorrect email address or password.');
      dispatch({
         type: REGISTER_USER,
         payload:{
            isFetching: false,
         },
      })
   });
}