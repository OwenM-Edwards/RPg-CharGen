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
   border:3px solid black;
   border-radius:5px;
   align-content:center;
`
const ErrorBox = styled.div`
   width:100px;
   height:100px;
   background-color:red;   
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
            <form onSubmit={()=>handleSubmit()}>
               Character Intrigue:
               <textarea 
                  placeholder="Character Intrigue" 
                  onChange={handleIntrigue} 
                  type="text" 
                  required="required"
                  minLength="3"
                  maxLength="80"
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