import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";
import { editUserSubmission } from '../redux/actions/index';

const Wrapper = styled.div`
   position:absolute;
   width:300px;
   height:300px;
   background-color:grey;
   left:40%;
   top:40%;
   display:flex;
   flex-direction:column;
   padding:30px;
   border-radius:10px;
`
const EditEntryModal = ({modalData, setModalDisplay, editUserSubmission}) => {
   console.log(modalData)
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
   },[])
   

   const handleSubmit = (editUserSubmission) => {
      // this.state.
      if(!editedUserSub){
         console.log('Edit first')
      } else {
         editUserSubmission(entryType,)
      }
   }

   let moderationStatus = false;
   if(modalData.moderation){
      moderationStatus = 'Moderation Status: Accepted'
   }
   else if(modalData.moderation === null){
      moderationStatus = 'Moderation Status: Pending'
   } else if(modalData.moderation === false){
      moderationStatus = 'Moderation Status: Failed'
   }

   return (
      <Wrapper>
         <button onClick={()=>setModalDisplay(false)}>Close</button>

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
         {moderationStatus}
         {(moderationStatus)
            ? modalData.reason
            : <React.Fragment/>
         } 


         {/* Edit stuff */}
         <textarea className="editModalTextArea" onChange={(e)=>setEditedUserSub(e.target.value)} defaultValue={originalEntry} minlenth="3" maxLength="80"></textarea>

         {/* Submit Edit */}
         <button onClick={()=>handleSubmit()}>Submit</button>
      </Wrapper>
   )
}



const mapStateToProps = (state) => ({ 
   submittedFNames:state.submissions.submittedFNames,
});

export default connect(mapStateToProps, {editUserSubmission})(EditEntryModal);