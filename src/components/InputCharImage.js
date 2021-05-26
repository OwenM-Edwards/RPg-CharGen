import React, { useState } from 'react';
import styled from "styled-components";
import {submitCharImage } from "../redux/actions/index";
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
   & .hiddenBrowse {
      display:none;
   }

   & .button {
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


const InputCharImage = ({ isFetching,  submitCharImage, userID, userEmail }) => {
   const [ selectedGender, setSelectedGender] = useState('random');
   const [ selectedRace, setSelectedRace] = useState('random');
   const [ previewSRC, setPreviewSRC] = useState('');

   const handleGender = (event) => {
      setSelectedGender(event.value)
   }
   const handleRace = (event) => {
      setSelectedRace(event.value)
   }

   const handleSubmit = () => {
      
      submitCharImage(
         previewSRC,
         selectedGender,
         selectedRace, 
         userEmail,
         userID,
      )
   }

   const handlePreview = (data) => {
      console.log(data)
      data.preventDefault();
      let file = data.target.files[0];
      let reader = new FileReader();
      if (data.target.files.length === 0) {
        return;
      }
      reader.onloadend = (data) => {
         setPreviewSRC([reader.result])
      }
      reader.readAsDataURL(file);
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
            <h2>Character Image</h2>
            <form>
               <Select  
                  className="selectContainer"
                  defaultValue={optionsGender[0]}
                  onChange={handleGender}
                  isSearchable={false}
                  options={optionsGender}
               />
               <Select  
                  className="selectContainer"
                  defaultValue={optionsRace[0]}
                  onChange={handleRace}
                  isSearchable={false}
                  options={optionsRace}
               />
   
               <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="file"
                  onChange={handlePreview} 
                  className="hiddenBrowse"
               />
               <label className="button" htmlFor="file">Browse</label>
               
               <button
                  type={"button"}
                  onClick={()=> handleSubmit()}
                  className="button"
               >
                  Submit
               </button>
   
   
            </form>
            <img src={previewSRC} alt=""/>
         </Wrapper>
      )
   }
   
} 


const mapStateToProps = (state) => (
   {  
      isFetching:state.inputCharImage.isFetching, 
      userID: state.authenticate.authenticated.id,
      userEmail: state.authenticate.authenticated.email  
   }
);

export default connect(mapStateToProps, {  submitCharImage })(InputCharImage);