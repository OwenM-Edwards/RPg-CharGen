import { 
   SUBMIT_CHAR_ROLEPLAY, 
   SUBMIT_CHAR_INTRIGUE, 
   SUBMIT_CHAR_IMAGE, 
   SUBMIT_CHAR_DESC, 
   GET_SUBMISSIONS, 
   NEW_CHAR, 
   SIGN_IN, 
   REGISTER_USER, 
} from "./action-types";
import axios from 'axios';
import { toast } from "react-toastify";


export const submitCharDesc = (
   selectedRace, 
   selectedGender,
   inputFName,
   inputLName,
   userEmail,
   userID,) => async (dispatch) => {

   dispatch({
      type: SUBMIT_CHAR_DESC,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "race": selectedRace,
      "gender": selectedGender,
      "name":inputFName,
      "lastname":inputLName,
      "email":userEmail,
      "id":userID
   })
   const inputCharDescAPI = await axios.post('https://safe-dawn-37731.herokuapp.com/addname', json, {
      headers: {
        'Content-Type': 'application/json'
      },
   })
   dispatch({
      type: SUBMIT_CHAR_DESC,
      payload:{
         isFetching: false,
      },
   })
}




export const submitCharImage = (
   previewSRC,
   selectedGender,
   selectedRace, 
   userEmail,
   userID,) => async (dispatch) => {

   dispatch({
      type: SUBMIT_CHAR_IMAGE,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "race": selectedRace,
      "gender": selectedGender,
      "image": previewSRC,
      "email":userEmail,
      "id":userID
   })
   const inputCharImageAPI = await axios.post('https://safe-dawn-37731.herokuapp.com/charimage', json, {
      headers: {
        'Content-Type': 'application/json'
      },
   })
   dispatch({
      type: SUBMIT_CHAR_IMAGE,
      payload:{
         isFetching: false,
      },
   })
}

export const submitCharIntrigue = (
   inputIntrigue, 
   userEmail,
   userID,) => async (dispatch) => {

   dispatch({
      type: SUBMIT_CHAR_INTRIGUE,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "intrigue": inputIntrigue,
      "email":userEmail,
      "id":userID
   })
   const inputCharIntrigueAPI = await axios.post('https://safe-dawn-37731.herokuapp.com/addintrigue', json, {
      headers: {
        'Content-Type': 'application/json'
      },
   })
   dispatch({
      type: SUBMIT_CHAR_INTRIGUE,
      payload:{
         isFetching: false,
      },
   })
}



export const getSubmissions = (userEmail) => async (dispatch) => {
   dispatch({
      type: GET_SUBMISSIONS,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "email": userEmail
   })
   const getSubmissionsResponse = await axios.post('https://safe-dawn-37731.herokuapp.com/getsubmissions', json, {
      headers: {
        'Content-Type': 'application/json'
      },
   })
   console.log(getSubmissionsResponse)
   dispatch({
      type: GET_SUBMISSIONS,
      payload:{
         isFetching: false,
         submittedFNames: [
            getSubmissionsResponse.data[0],
            getSubmissionsResponse.data[1],
            getSubmissionsResponse.data[2],
            getSubmissionsResponse.data[3],
            getSubmissionsResponse.data[4],
         ],
         submittedLNames: [
            getSubmissionsResponse.data[10],
            getSubmissionsResponse.data[11],
            getSubmissionsResponse.data[12],
            getSubmissionsResponse.data[13],
            getSubmissionsResponse.data[14],
         ],
         submittedImages: [
            getSubmissionsResponse.data[5],
            getSubmissionsResponse.data[6],
            getSubmissionsResponse.data[7],
            getSubmissionsResponse.data[8],
            getSubmissionsResponse.data[9],
         ],
         submittedRoleplays: getSubmissionsResponse.data[15],
         submittedIntrigues: getSubmissionsResponse.data[16],
      },
   })
   return true;
}

export const editUserSubmission = ( entryType, editedUserSub, email, entryValue ) => async (dispatch) => {
   dispatch({
      type: SUBMIT_CHAR_INTRIGUE,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "entryType": entryType,
      "entryData": editedUserSub,
      "userEmail": email,
      "originalSub": entryValue
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
      console.log(data)
      dispatch({
         type: SIGN_IN,
         payload:{
            isFetching: false,
            authenticated: data.data,
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