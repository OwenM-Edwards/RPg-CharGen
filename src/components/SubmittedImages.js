import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { connect } from "react-redux";

const Wrapper = styled.div`
   width:100%;
   max-height:100%;
   background-color:purple;
   overflow-y:auto;

   display:flex;
   flex-direction:column;
   padding:20px 20px 20px 20px;

   & h3 {

   }
   & p {
      cursor:pointer;
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
               <p 
                  key={counter}
                  onClick={()=>handleOpenModalDisplay(element)} 
               >
                  URL:{element.url} 
                  Gender:{(element.gender) ? 'male' : 'female'} 
                  Moderation Status:{(element.moderation) ? 'Accepted' : (element.moderation === null) ? 'Pending' : 'Failed' }
               </p>
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