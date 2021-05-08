import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { connect } from "react-redux";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   max-height:100%;
   background-color:purple;
   overflow-y:auto;

`
const SubmittedIntrigues = ({handleOpenModalDisplay, submittedIntrigues}) => {
   const [ displayIntrigues, setDisplayIntrigues] = useState([]);

   const buildIntrigueElements = () => {
      let elementList = [];
      submittedIntrigues.forEach(function callback(element, index){
         elementList.push(
            <p 
               data-text={element.intrigue} 
               key={index}
               onClick={()=>handleOpenModalDisplay(element)} 
            >
               Intrigue:{element.intrigue} 
               Moderation Status:{(element.moderation) ? 'Accepted' : (element.moderation === null) ? 'Pending' : 'Failed' }
            </p>
         )
      })
      setDisplayIntrigues(elementList)
   }

   useEffect(()=>{
      console.log(submittedIntrigues)
      if(submittedIntrigues){
         buildIntrigueElements();
      }
   }, [])
   
   

   return(
      <Wrapper>
         {displayIntrigues}
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ 
   submittedIntrigues:state.submissions.submittedIntrigues,
});

export default connect(mapStateToProps)(SubmittedIntrigues);