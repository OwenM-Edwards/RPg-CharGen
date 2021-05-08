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
const SubmittedNames = ({handleOpenModalDisplay, submittedFNames}) => {
   const [ displayFNames, setDisplayFNames] = useState([]);
   const races = ['Human','Orc','Dwarf','Elf','Halfling'];

   const buildFNameElements = () => {
      let elementList = [];
      let counter = 0;
      let raceCounter = 0;
      Object.keys(submittedFNames).forEach(key => {
         elementList.push(
            <h3 key={counter}>{races[raceCounter]}</h3>
         )
         counter++;
         raceCounter++;
         submittedFNames[key].forEach(function callback(element){
            elementList.push(
               <p 
                  data-text={element.name} 
                  onClick={()=>handleOpenModalDisplay(element)} 
                  key={counter}>Name:{element.name} 
                  Gender:{(element.gender) ? 'male' : 'female'}
                  Moderation Status:{(element.moderation) ? 'Accepted' : (element.moderation === null) ? 'Pending' : 'Failed' }
               </p>
            )
            counter++
         })
      })
      setDisplayFNames(elementList)
      console.log('built')
   }

   useEffect(()=>{
      if(submittedFNames){
         buildFNameElements();
      }
   }, [])
   
   

   return(
      <Wrapper>
         {displayFNames}
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ 
   submittedFNames:state.submissions.submittedFNames,
});

export default connect(mapStateToProps)(SubmittedNames);