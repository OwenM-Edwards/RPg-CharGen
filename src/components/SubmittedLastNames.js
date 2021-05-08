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
const SubmittedLastNames = ({handleOpenModalDisplay, submittedLNames}) => {
   const [ displayLNames, setDisplayLNames] = useState([]);
   const races = ['Human','Orc','Dwarf','Elf','Halfling'];

   const buildLNameElements = () => {
      let elementList = [];
      let counter = 0;
      let raceCounter = 0;
      Object.keys(submittedLNames).forEach(key => {
         elementList.push(
            <h3 key={counter}>{races[raceCounter]}</h3>
         )
         counter++;
         raceCounter++;
         submittedLNames[key].forEach(function callback(element){
            elementList.push(
               <p 
                  data-text={element.lastname} 
                  key={counter}
                  onClick={()=>handleOpenModalDisplay(element)} 
               >
                  Last Name:{element.lastname} 
                  Moderation Status:{(element.moderation) ? 'Accepted' : (element.moderation === null) ? 'Pending' : 'Failed' }
               </p>
            )
            counter++
         })
      })
      setDisplayLNames(elementList)
   }

   useEffect(()=>{
      if(submittedLNames){
         buildLNameElements();
      }
   }, [])
   
   

   return(
      <Wrapper>
         {displayLNames}
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ 
   submittedLNames:state.submissions.submittedLNames,
});

export default connect(mapStateToProps)(SubmittedLastNames);