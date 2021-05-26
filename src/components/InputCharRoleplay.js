import React, { useState } from 'react';
import styled from "styled-components";
import { submitCharRoleplay } from "../redux/actions/index";
import { connect } from "react-redux";
import { LoadingIcon } from '.';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   justify-content:center;
   border-radius:5px;
   padding:30px;

   & h2 {
      color:#01a4f6;
   }
   & form {
      display:flex;
      flex-direction:column;
      width:100%;
      height:100%;
      justify-content:center;
   }

   & .input {
      padding:10px;
      width:100%;
      margin: 0 auto;
      /* background-color:red; */
      border-radius:5px;
      margin-bottom:10px;
      outline: none;
      border:0px;
   }

   & button {
      background-color: #FF3E58;
      border:0;
      width:30%;
      height:39px;
      border-radius:5px;
      color:white;
      transition: all 0.2s ease-out;
      cursor: pointer;
      
      &:hover {
         background-color:#FB677B;
      }
   }
`
const ErrorBox = styled.div`
   width:100px;
   height:100px;
   background-color:red;   
`

const InputCharRoleplay = ({isFetching, submitCharRoleplay, userEmail, userID }) => {
   const [ inputRoleplay, setinputRoleplay] = useState(false);

   const handleRoleplay = (event) =>{
      let str = event.target.value.split('.').join("").trim();
      setinputRoleplay(str);
   }
   const handleSubmit = () => {
      submitCharRoleplay(
         inputRoleplay,
         userEmail,
         userID,
      )
   }

   if(isFetching){
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
   else {
      return(
         <Wrapper >
            <h2>Character Roleplay Cues</h2>
            <form onSubmit={()=>handleSubmit()}>
               <textarea 
                  placeholder="Roleplay Cues:" 
                  onChange={handleRoleplay} 
                  type="text" 
                  required="required"
                  minLength="3"
                  maxLength="80"
                  className="input"
               />
               <button type={"submit"}>Submit</button>
            </form>
         </Wrapper>
      )
   }

} 


const mapStateToProps = (state) => ({  
   isFetching:state.inputCharRoleplay.isFetching, 
   userID: state.authenticate.authenticated.id,
   userEmail: state.authenticate.authenticated.email
});

export default connect(mapStateToProps, { submitCharRoleplay })(InputCharRoleplay);