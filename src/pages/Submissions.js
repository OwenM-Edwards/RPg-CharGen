import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { getSubmissions } from "../redux/actions/index";
import { 
   LoadingIcon,
   SubmittedNames, 
   SubmittedLastNames,
   SubmittedImages,
   SubmittedRoleplays,
   SubmittedIntrigues,
   EditEntryModal,
} from '../components';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   color:#f3f3f3;

   & .titleContainer {
      width:100%;
      padding-left:20px;
      margin-bottom:10px;
      color:#01a4f6;
      font-size:1.5rem;
      padding:0;
   }

   & .tabContainer {
      width:100%;
      min-height:10%;
      background-color:#2f3438;
      display:flex;
      justify-content:space-around;
      align-items:center;
      padding:20px;
      border-radius:10px 10px 0 0;
      * {
         color:white;
         text-decoration: none;
         margin-bottom:10px;
         padding:10px;
         opacity:0.8;
         transition: border-color 0.2s ease-in-out, opacity 0.2s ease-in-out;  
         border-bottom:2px solid #2f3438;
      }
      & .active {
         border-bottom:2px solid #FF3E58;
         opacity:1;
      }
   }

   & .listContainer {
      width:100%;
      height:90%;
      display:flex;
      flex-direction:column;
      overflow-y:scroll;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);      
   }
`

const Submissions = ({
      userEmail, 
      getSubmissions,
      isFetching,
   }) => {
   const [modalDisplay, setModalDisplay] = useState(false);
   const [modalData, setModalData] = useState();
   const {category} = useParams();

   const handleOpenModalDisplay = (entry) => {
      setModalDisplay(true);
      setModalData(entry);
      // console.log(entry.target.dataset.text);
   }


   useEffect(()=> {
      getSubmissions(userEmail)
   },[userEmail]) // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(()=> {
      getSubmissions(userEmail)
   },[]) // eslint-disable-line react-hooks/exhaustive-deps


   let displayData = false
   switch(category){
      case 'firstnames':
         displayData = <SubmittedNames handleOpenModalDisplay={handleOpenModalDisplay}/>;
         break;
      case 'lastnames':
         displayData = <SubmittedLastNames handleOpenModalDisplay={handleOpenModalDisplay}/>;
         break;
      case 'images':
         displayData = <SubmittedImages handleOpenModalDisplay={handleOpenModalDisplay}/>;
         break;
      case 'roleplay':
         displayData = <SubmittedRoleplays handleOpenModalDisplay={handleOpenModalDisplay}/>;
         break;
      case 'intrigue':
         displayData = <SubmittedIntrigues handleOpenModalDisplay={handleOpenModalDisplay}/>;
         break;
      default:
         displayData = <SubmittedNames handleOpenModalDisplay={handleOpenModalDisplay}/>;
   }

   if(!isFetching){
      return(
         <Wrapper>
            <div className="titleContainer">
               <h1>Your Submissions</h1>
            </div>
            <div className="tabContainer">
               <Link className={category === 'firstnames' ? 'active' : 'notactive'} to="/submissions/firstnames">First Names</Link>
               <Link className={category === 'lastnames' ? 'active' : 'notactive'} to="/submissions/lastnames">Last Names</Link>
               <Link className={category === 'images' ? 'active' : 'notactive'} to="/submissions/images">Images</Link>
               <Link className={category === 'roleplay' ? 'active' : 'notactive'} to="/submissions/roleplay">Roleplay</Link>
               <Link className={category === 'intrigue' ? 'active' : 'notactive'} to="/submissions/intrigue">Intrigue</Link>
            </div>
   
            <div className="listContainer">
               {(modalDisplay)
                  ? <EditEntryModal modalData={modalData} setModalDisplay={setModalDisplay}/>
                  : <React.Fragment/>
               }
               {displayData}
            </div>

   
         </Wrapper>
      )
   }
   else {
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
   
}


const mapStateToProps = (state) => ({ 
   userEmail: state.authenticate.authenticated.email,
   isFetching: state.submissions.isFetching,
});

export default connect(mapStateToProps, {getSubmissions})(Submissions);
