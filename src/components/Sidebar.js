import React from 'react';
import { connect } from "react-redux";
import { signOut } from "../redux/actions/index";
import styled from "styled-components";
import { Link } from "react-router-dom";
import loginIcon from "../img/login.png";
import logoutIcon from "../img/logout.png";
import submitIcon from "../img/submit.png";
import submissionsIcon from "../img/submissions.png";
import homeIcon from "../img/home.png";
import ReactTooltip from 'react-tooltip';

const Wrapper = styled.div`
   width:8%;
   min-width:60px;
   max-width:80px;
   max-height:100%;
   display:flex;
   flex-direction:column;
   background-color:#2f3438;
   color:${props => props.theme.fontColor};
   padding:10px 0 10px 0;
   border-radius:0 10px 10px 0;

   & .navBarContainer {
      width:100%;
      height:100%;
      
   }
   & .navList {
      list-style-type:none;
      text-align: center;
      display: flex;
      flex-direction:column;
      width:100%;
      height:100%;

      * {
         margin-bottom:10px;
         padding:10px;
         transition: all 0.2s ease-out;
         &:visited{
            text-decoration: none;
         }
         

      }
      & a:hover {
         background-color:#FB677B;
      }
      & .active {
         background-color:#FF3E58;
      }

      & :nth-child(4) {
         /* display:flex; */
         margin-top:auto;
         
      }
      & img {
         width:100%;
         max-width: 60px;
         margin: auto 0 ;
         cursor: pointer;
      }
   }
`


const Sidebar = ({ page, signOut, authenticated }) => {

   const handleSignOut = () => {
      signOut();
   }
   
   return(
      <Wrapper>
         <ReactTooltip />
         <nav className="navBarContainer">
            <ul className="navList">
               
               <Link data-tip="Character Generator" className={page === 'generator' ? 'active' : 'notactive'} to="/generator"><img src={homeIcon}/></Link>
               
               <Link data-tip="Your Submissions" className={page === 'submissions' ? 'active' : 'notactive'} to="/submissions/firstnames"><img src={submissionsIcon}/></Link>

               <Link data-tip="Add your own submissions!" className={page === 'submit' ? 'active' : 'notactive'} to="/submit"><img src={submitIcon}/></Link>
               {authenticated 
                  ? <div data-tip="Sign Out" onClick={()=>handleSignOut()}><img src={logoutIcon}/></div>
                  : <Link data-tip="Sign In" to="/signin"><img src={loginIcon}/></Link>
               }
            </ul>
         </nav>
      </Wrapper>
   )
}


const mapStateToProps = (state) => ({ authenticated: state.authenticate.authenticated });
export default connect(mapStateToProps, { signOut })(Sidebar);