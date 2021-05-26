import React, { useState } from 'react';
import styled from "styled-components";
import { submitCharIntrigue } from "../redux/actions/index";
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
   align-content:center;
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

const InputCharIntrigue = ({isFetching, userEmail, userID, submitCharIntrigue}) => {
   const [ inputIntrigue, setinputIntrigue] = useState(false);

   const handleIntrigue = (event) =>{
      let str = event.target.value.split('.').join("").trim();
      setinputIntrigue(str);
   }
   const handleSubmit = () => {
      submitCharIntrigue(
         inputIntrigue,
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
            <h2>Character Intrigue</h2>
            <form onSubmit={()=>handleSubmit()}>
               <textarea 
                  placeholder="Character Intrigue" 
                  onChange={handleIntrigue} 
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
   isFetching:state.inputCharIntrigue.isFetching, 
   userID: state.authenticate.authenticated.id,
   userEmail: state.authenticate.authenticated.email
});

export default connect(mapStateToProps, { submitCharIntrigue })(InputCharIntrigue);