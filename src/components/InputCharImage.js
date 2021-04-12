import React, { useState } from 'react';
import styled from "styled-components";
import { clearInputImageError, submitCharImage } from "../redux/actions/index";
import {optionsRace, optionsGender} from "../constants/index";
import { connect } from "react-redux";
import { LoadingIcon } from '../components/Index';

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


const InputCharImage = ({ clearInputImageError, isFetching, error,  submitCharImage, userID, userEmail }) => {
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
            {(error)
               ? <ErrorBox onClick={()=> clearInputImageError()}>Error</ErrorBox>
               : <React.Fragment/>
            }
            <form>
               Character Image:
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
               />
               <label htmlFor="file"/>
               
               <button
                  type={"button"}
                  onClick={()=> handleSubmit()}
                  >Submit
               </button>
   
   
            </form>
            <img src={previewSRC} alt=""/>
         </Wrapper>
      )
   }
   
} 


const mapStateToProps = (state) => ({  isFetching:state.inputCharImage.isFetching, error:state.inputCharImage.error, userID: state.authenticate.userID, userEmail: state.authenticate.userEmail  });

export default connect(mapStateToProps, { clearInputImageError, submitCharImage })(InputCharImage);