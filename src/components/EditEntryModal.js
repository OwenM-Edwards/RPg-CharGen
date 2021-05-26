import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";
import { editUserSubmission } from '../redux/actions/index';
import closeIcon from "../img/close.png";

const Wrapper = styled.div`
   position:absolute;
   width:300px;
   height:300px;
   background-color:#2f3438;
   left:30%;
   top:20%;
   display:flex;
   flex-direction:column;
   padding:50px 20px 20px 20px;
   border-radius:10px;
   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); 

   & h1 {
      color:#01a4f6;
      font-size:1.5rem;
      margin-bottom:30px;
   }
   & textarea {
      padding:10px;
      width:100%;
      margin: 0 auto;
      /* background-color:red; */
      border-radius:5px;
      margin-bottom:10px;
      outline: none;
      border:0px;
      margin-bottom:30px;
   }
   & img {
      position: absolute;
      top:0;
      right:0;
      transition: scale 0.2s ease-in-out;
      width:35px;
      cursor:pointer;

      &:hover {
         scale:0.9;
      }
   }
   & .submitButton {
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
   & p {
      width:100%;
      font-size:1rem;
      position:absolute;
      bottom:0;
      left:10px;
      padding:10px;
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
`
const EditEntryModal = ({modalData, setModalDisplay, editUserSubmission}) => {
   const [entryType, setEntryType] = useState('');
   const [originalEntry, setOriginalEntry] = useState('');
   const [editedUserSub, setEditedUserSub] = useState(false);

   useEffect(()=>{
      if('name' in modalData){
         setEntryType('name')
         setOriginalEntry(modalData.name)
      }
      else if('lastname' in modalData){
         setEntryType('lastname')
         setOriginalEntry(modalData.lastname)
      }
      else if('roleplay' in modalData){
         setEntryType('roleplay')
         setOriginalEntry(modalData.roleplay)
      }
      else if('intrigue' in modalData){
         setEntryType('intrigue')
         setOriginalEntry(modalData.intrigue)
      }
   }, [modalData])
   

   const handleSubmit = (editUserSubmission) => {
      // this.state.
      if(!editedUserSub){
         console.log('Edit first')
      } else {
         editUserSubmission(entryType,)
      }
   }

   return (
      <Wrapper>
         
         <img alt="Close icon" onClick={()=>setModalDisplay(false)} src={closeIcon}></img>
         <h1>Edit your submission.</h1>
         {(modalData.race)
            ? modalData.race
            : <React.Fragment/>
         }
         {(modalData.gender)
            ? (modalData.gender)
               ? 'Male'
               : 'Female'
            : <React.Fragment/>
         }
         <p className={(modalData.moderation) ? 'accepted' : (modalData.moderation === null) ? 'pending' : 'failed' }>Moderation Status: {(modalData.moderation) ? 'Accepted' : (modalData.moderation === null) ? 'Pending' : 'Failed' }</p>


         {/* Edit stuff */}
         <textarea className="editModalTextArea" onChange={(e)=>setEditedUserSub(e.target.value)} defaultValue={originalEntry} minlenth="3" maxLength="80"></textarea>

         {/* Submit Edit */}
         <button className="submitButton" onClick={()=>handleSubmit()}>Submit</button>
      </Wrapper>
   )
}



const mapStateToProps = (state) => ({ 
   submittedFNames:state.submissions.submittedFNames,
});

export default connect(mapStateToProps, {editUserSubmission})(EditEntryModal);