import React, { useState } from 'react';
import styled from "styled-components";
import { submitCharRoleplay } from "../redux/actions/index";
import { connect } from "react-redux";
import { LoadingIcon } from '../components/Index';

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
            <form onSubmit={()=>handleSubmit()}>
               Roleplay cue:
               <textarea 
                  placeholder="Roleplay Cues:" 
                  onChange={handleRoleplay} 
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
   isFetching:state.inputCharRoleplay.isFetching, 
   userID: state.authenticate.authenticated.id,
   userEmail: state.authenticate.authenticated.email
});

export default connect(mapStateToProps, { submitCharRoleplay })(InputCharRoleplay);