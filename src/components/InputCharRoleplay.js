import React, { useState } from 'react';
import styled from "styled-components";
import { clearInputRoleplayError, submitCharRoleplay } from "../redux/actions/index";
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

const InputCharRoleplay = ({ clearInputRoleplayError, isFetching, error, submitCharRoleplay, userEmail, userID }) => {
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
            {(error)
               ? <ErrorBox onClick={()=> clearInputRoleplayError()}>Error</ErrorBox>
               : <React.Fragment/>
            }
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


const mapStateToProps = (state) => ({  isFetching:state.inputCharRoleplay.isFetching, error:state.inputCharRoleplay.error, userID: state.authenticate.userID, userEmail: state.authenticate.userEmail  });

export default connect(mapStateToProps, { clearInputRoleplayError, submitCharRoleplay })(InputCharRoleplay);