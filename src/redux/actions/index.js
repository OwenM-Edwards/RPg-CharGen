import { ADD_ARTICLE, CHANGE_RACE, NEW_CHAR, SIGN_IN, CLEAR_SIGN_IN_ERROR, REGISTER_USER, CLEAR_REGISTER_ERROR } from "./action-types";
import axios from 'axios';
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
            error:false,
         },
      })
   })
   .catch(error => {
      dispatch({
         type: SIGN_IN,
         payload:{
            isFetching: false,
            error:true,
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
            error:false,
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
      dispatch({
         type: REGISTER_USER,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   });
}

export const clearRegisterError = () => (dispatch) => {
   dispatch({
      type: CLEAR_REGISTER_ERROR,
      payload:{
         error:false,
         isFetching: false,
      },
   })
}

export const clearSignInError = () => (dispatch) => {
   dispatch({
      type: CLEAR_SIGN_IN_ERROR,
      payload:{
         error:false,
         isFetching: false,
         authenticated: false,
      },
   })
}