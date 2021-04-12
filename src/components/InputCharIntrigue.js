import React, { useState } from 'react';
import styled from "styled-components";
import { clearInputIntrigueError, submitCharIntrigue } from "../redux/actions/index";
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


const InputCharIntrigue = ({ clearInputIntrigueError, isFetching, error, userEmail, userID, submitCharIntrigue}) => {
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
            {(error)
               ? <ErrorBox onClick={()=> clearInputIntrigueError()}>Error</ErrorBox>
               : <React.Fragment/>
            }
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


const mapStateToProps = (state) => ({  isFetching:state.inputCharIntrigue.isFetching, error:state.inputCharIntrigue.error, userID: state.authenticate.userID, userEmail: state.authenticate.userEmail  });

export default connect(mapStateToProps, { clearInputIntrigueError, submitCharIntrigue })(InputCharIntrigue);