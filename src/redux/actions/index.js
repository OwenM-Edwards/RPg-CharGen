import { 
   CLEAR_INPUT_DESC_ERROR, 
   SUBMIT_CHAR_ROLEPLAY, 
   SUBMIT_CHAR_INTRIGUE, 
   SUBMIT_CHAR_IMAGE, 
   SUBMIT_CHAR_DESC, 
   GET_SUBMISSIONS, 
   NEW_CHAR, 
   SIGN_IN, 
   CLEAR_SIGN_IN_ERROR, 
   REGISTER_USER, 
   CLEAR_REGISTER_ERROR,
   CLEAR_INPUT_IMAGE_ERROR,
   CLEAR_INPUT_ROLEPLAY_ERROR,
   CLEAR_INPUT_INTRIGUE_ERROR,
   SWITCH_THEME,
} from "./action-types";
import axios from 'axios';


// import { lightModeTheme, darkModeTheme } from '../../constants/index';


// export const switchTheme = (theme) => (dispatch) => {
//    if(theme === 'light'){
//       dispatch({
//          type: SWITCH_THEME,
//          payload: lightModeTheme,
//       })
//    }
//    else {
//       dispatch({
//          type: SWITCH_THEME,
//          payload: darkModeTheme,
//       })
//    }

// }


export const editUserSubmission = ( intrigue, email, id ) => async (dispatch) => {
   dispatch({
      type: SUBMIT_CHAR_INTRIGUE,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "entryType": intrigue,
      "userEmail": email,
      "originalSub": id,
   })
   const getSubmissionsResponse = await axios.post('https://safe-dawn-37731.herokuapp.com/edit', json, {
      headers: {
        'Content-Type': 'application/json'
      }
   })
   .then(res => {
      dispatch({
         type: SUBMIT_CHAR_INTRIGUE,
         payload:{
            isFetching: false,
         },
      })
   })
   .catch(error => {
      dispatch({
         type: SUBMIT_CHAR_INTRIGUE,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   });
}

export const deleteUserSubmission = ( intrigue, email, id ) => async (dispatch) => {
   dispatch({
      type: SUBMIT_CHAR_INTRIGUE,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "entryType": intrigue,
      "userEmail": email,
      "originalSub": id,
   })
   const getSubmissionsResponse = await axios.post('https://safe-dawn-37731.herokuapp.com/delete', json, {
      headers: {
        'Content-Type': 'application/json'
      }
   })
   .then(res => {
      dispatch({
         type: SUBMIT_CHAR_INTRIGUE,
         payload:{
            isFetching: false,
         },
      })
   })
   .catch(error => {
      dispatch({
         type: SUBMIT_CHAR_INTRIGUE,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   });
}



export const submitCharRoleplay = ( roleplay, email, id ) => async (dispatch) => { 
   dispatch({
      type: SUBMIT_CHAR_ROLEPLAY,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "roleplay": roleplay,
      "email": email,
      "id": id,
   })
   const getSubmissionsResponse = await axios.post('https://safe-dawn-37731.herokuapp.com/addroleplay', json, {
      headers: {
        'Content-Type': 'application/json'
      }
   })
   .then(res => {
      dispatch({
         type: SUBMIT_CHAR_ROLEPLAY,
         payload:{
            isFetching: false,
         },
      })
   })
   .catch(error => {
      dispatch({
         type: SUBMIT_CHAR_ROLEPLAY,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   });
}

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
      headers: { 'Content-Type': 'application/json' }
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
      headers: { 'Content-Type': 'application/json' }
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
      headers: { 'Content-Type': 'application/json' }
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