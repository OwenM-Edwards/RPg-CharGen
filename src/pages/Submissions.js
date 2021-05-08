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
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
`
const TabContainer = styled.div`
   width:100%;
   min-height:10%;
   background-color:green;
   display:flex;
   justify-content:space-around;
   align-items:center;
`
const ContentContainer = styled.div`
   width:100%;
   min-height:100%;
   max-height:100%;
   display:flex;
   flex-direction:column;

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
      console.log(category)
   },[userEmail])

   useEffect(()=> {
      getSubmissions(userEmail)
   },[])


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
            <TabContainer>
               <Link to="/submissions/firstnames">First Names</Link>
               <Link to="/submissions/lastnames">Last Names</Link>
               <Link to="/submissions/images">Images</Link>
               <Link to="/submissions/roleplay">Roleplay</Link>
               <Link to="/submissions/intrigue">Intrigue</Link>
            </TabContainer>
   
            <ContentContainer>
               {(modalDisplay)
                  ? <EditEntryModal modalData={modalData} setModalDisplay={setModalDisplay}/>
                  : <React.Fragment/>
               }
               {displayData}
            </ContentContainer>

   
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
