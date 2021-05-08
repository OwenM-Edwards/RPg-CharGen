import React, { useState } from 'react';
import styled from "styled-components";
import { submitCharDesc } from "../redux/actions/index";
import {optionsRace, optionsGender} from "../constants/index";
import { connect } from "react-redux";
import { LoadingIcon } from '.';

import Select from 'react-select';
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


const InputCharDesc = ({ isFetching, submitCharDesc, userID, userEmail}) => {
   const [ selectedGender, setSelectedGender] = useState('random');
   const [ selectedRace, setSelectedRace] = useState('random');
   const [ inputFName, setinputFName] = useState('random');
   const [ inputLName, setinputLName] = useState('random');

   const handleGender = (event) => {
      setSelectedGender(event.value)
   }
   const handleRace = (event) => {
      setSelectedRace(event.value)
   }
   const handleFName = (event) => {
      setinputFName(event.target.value.split('.').join("").trim())
   }
   const handleLName = (event) => {
      setinputLName(event.target.value.split('.').join("").trim())
   }
   const handleSubmit = () => {
      submitCharDesc(
         selectedRace, 
         selectedGender,
         inputFName,
         inputLName,
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
            <form>
               Character Names:
               <Select
                  defaultValue={optionsRace[0]}
                  options={optionsRace}
                  onChange={handleRace}
                  isSearchable={false}
               />
               <Select
                  defaultValue={optionsGender[0]}
                  options={optionsGender}
                  onChange={handleGender}
                  isSearchable={false}
               />
               <input
                  onChange={handleFName}
                  minLength="3"
                  maxLength="20"
                  name="charFName"
                  placeholder="First Name"
               />
               <input
                  onChange={handleLName}
                  minLength="3"
                  maxLength="20"
                  name="charLName"
                  placeholder="Optional Last Name - Gender neutral"
               />
               <button
                  type={"button"}
                  onClick={()=> handleSubmit()}
               >Submit</button>
            </form>
         </Wrapper>
      )
   }
} 


const mapStateToProps = (state) => ({ 
   isFetching:state.inputCharDesc.isFetching, 
   userID:state.authenticate.authenticated.id, 
   userEmail:state.authenticate.authenticated.email });

export default connect(mapStateToProps, { submitCharDesc })(InputCharDesc);