import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { connect } from "react-redux";

const Wrapper = styled.div`
   width:100%;
   max-height:100%;
   display:flex;
   flex-direction:column;
   padding:0px 20px 20px 20px;
   
   & h3 {
      color:#01a4f6;
      margin:20px 0 10px 5px;
      font-size:1.3rem;
   }
   & div {
      cursor:pointer;
      background-color:#2f3438;
      margin-bottom:3px;
      border-radius:10px;
      padding:10px 10px 10px 30px;
      display:flex;
      justify-content:space-between;
      transition:background-color 0.2s ease-in-out;
      & p {
         width:30%;
         font-size:1rem;
      }
      & .accepted {
         color:green;
      }
      & .pending {
         color:blue;
      }
      & .failed {
         color:red;
      }
      &:hover {
         background-color:#FB677B;
      }
   }
`

const SubmittedImages = ({handleOpenModalDisplay, submittedImages}) => {
   const [ displayImages, setDisplayImages] = useState([]);
   const races = ['Human','Orc','Dwarf','Elf','Halfling'];

   const buildImageElements = () => {
      let elementList = [];
      let counter = 0;
      let raceCounter = 0;
      Object.keys(submittedImages).forEach(key => {
         elementList.push(
            <h3 key={counter}>{races[raceCounter]}</h3>
         )
         counter++;
         raceCounter++;
         submittedImages[key].forEach(function callback(element){
            elementList.push(
               <div 
                  key={counter}
                  onClick={()=>handleOpenModalDisplay(element)} 
               >
                  <p>URL: {element.url} </p>
                  <p>Gender: {(element.gender) ? 'male' : 'female'} </p>
                  <p className={(element.moderation) ? 'accepted' : (element.moderation === null) ? 'pending' : 'failed' }>Moderation Status: {(element.moderation) ? 'Accepted' : (element.moderation === null) ? 'Pending' : 'Failed' }</p>
               </div>
            )
            counter++
         })
      })
      setDisplayImages(elementList)
   }

   useEffect(()=>{
      if(submittedImages){
         buildImageElements();
      }
   }, [])
   
   

   return(
      <Wrapper>
         {displayImages}
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ 
   submittedImages:state.submissions.submittedImages,
});

export default connect(mapStateToProps)(SubmittedImages);