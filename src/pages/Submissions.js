import React, { useState } from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { getSubmissions } from "../redux/actions/index";

const Wrapper = styled.div`
   width:100%;
   height:100%;
`

const Submissions = ({
      submittedFNames, 
      submittedLNames, 
      submittedImages,
      submittedRoleplays,
      submittedIntrigues,
      userEmail, 
      getSubmissions
   }) => {
   const [ displayFNames, setDisplayFNames] = useState([]);
   const [ displayLNames, setDisplayLNames] = useState([]);
   const [ displayImages, setDisplayImages] = useState([]);
   const [ displayRoleplays, setDisplayRoleplays] = useState([]);
   const [ displayIntrigues, setDisplayIntrigues] = useState([]);
   const [ selectedSubmission, setSelectedSubmission ] = useState([]);
   const races = ['Human','Orc','Dwarf','Elf','Halfling']

   const handleEditAndDelete = (el) => {
      setSelectedSubmission(el.target.dataset.text);
      
   }
   const test = (el) => {
      console.log(el.target.dataset.text);
   }
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
               <p data-text={element.name} onClick={test.bind(this)} key={counter}>Name:{element.name} Gender:{(element.gender) ? 'male' : 'female'} Moderation Status:{(element.moderation) ? 'Approved' : 'Denied'}</p>
            )
            counter++
         })
      })
      setDisplayFNames(elementList)
   }

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
               <p data-text={element.lastname} key={counter}>Last Name:{element.lastname} Gender:{(element.gender) ? 'male' : 'female'} Moderation Status:{(element.moderation) ? 'Approved' : 'Denied'}</p>
            )
            counter++
         })
      })
      setDisplayLNames(elementList)
   }

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
               <p key={counter}>URL:{element.url} Gender:{(element.gender) ? 'male' : 'female'} Moderation Status:{(element.moderation) ? 'Approved' : 'Denied'}</p>
            )
            counter++
         })
      })
      setDisplayImages(elementList)
   }

   const buildRoleplayElements = () => {
      let elementList = [];
      submittedRoleplays.returnedSubRoleplay.forEach(function callback(element, index){
         elementList.push(
            <p data-text={element.roleplay} key={index}>Roleplay Cue:{element.roleplay} Moderation Status:{(element.moderation) ? 'Approved' : 'Denied'}</p>
         )
      })
      setDisplayRoleplays(elementList)
   }
   const buildIntrigueElements = () => {
      let elementList = [];
      submittedIntrigues.returnedSubIntrigue.forEach(function callback(element, index){
         elementList.push(
            <p data-text={element.intrigue} key={index}>Intrigue:{element.intrigue} Moderation Status:{(element.moderation) ? 'Approved' : 'Denied'}</p>
         )
      })
      setDisplayIntrigues(elementList)
   }

   return(
      <Wrapper>
         <div onClick={()=>getSubmissions(userEmail)}>Submissions</div>
         <div onClick={()=>buildFNameElements()}>BuildFNames</div>
         <div onClick={()=>buildLNameElements()}>BuildLNames</div>
         <div onClick={()=>buildImageElements()}>BuildImages</div>
         <div onClick={()=>buildRoleplayElements()}>BuildRoleplay</div>
         <div onClick={()=>buildIntrigueElements()}>BuildIntrigues</div>
         
         <h2>First Names</h2>
            {displayFNames}
         <h2>Last Names</h2>
            {displayLNames}
         <h2>Images</h2>
            {displayImages}
         <h2>Roleplay Cues</h2>
            {displayRoleplays}
         <h2>Intrigues</h2>
            {displayIntrigues}
      </Wrapper>
   )
}


const mapStateToProps = (state) => ({ 
   submittedFNames:state.submissions.submittedFNames,
   submittedLNames:state.submissions.submittedLNames,
   submittedImages:state.submissions.submittedImages,
   submittedRoleplays:state.submissions.submittedRoleplays,
   submittedIntrigues:state.submissions.submittedIntrigues,
   userEmail: state.authenticate.userEmail 
});

export default connect(mapStateToProps, {getSubmissions})(Submissions);
