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
const SubmittedRoleplays = ({handleOpenModalDisplay, submittedRoleplays}) => {
   const [ displayRoleplays, setDisplayRoleplays] = useState([]);
   const races = ['Human','Orc','Dwarf','Elf','Halfling'];

   const buildRoleplayElements = () => {
      let elementList = [];
      submittedRoleplays.forEach(function callback(element, index){
         elementList.push(
            <p 
               data-text={element.roleplay} 
               key={index}
               onClick={()=>handleOpenModalDisplay(element)}
            >
               Roleplay Cue:{element.roleplay} 
               Moderation Status:{(element.moderation) ? 'Accepted' : (element.moderation === null) ? 'Pending' : 'Failed' }
            </p>
         )
      })
      setDisplayRoleplays(elementList)
   }

   useEffect(()=>{
      if(submittedRoleplays){
         buildRoleplayElements();
      }
   }, [])
   
   

   return(
      <Wrapper>
         {displayRoleplays}
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ 
   submittedRoleplays:state.submissions.submittedRoleplays,
});

export default connect(mapStateToProps)(SubmittedRoleplays);