import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";


const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;

   & .headtext{
      margin: 0 auto;
   }
   & .navBarContainer {
      width:100%;
      height:100px;
      display:flex;
      flex-direction:row;
      justify-content:center;
   }
   & .navList {
      list-style-type:none;
      text-align: center;
      display: flex;
      justify-content: space-around;
      * {
         margin:10px;
         text-decoration: none;
         color:black;
         &:visited{
            text-decoration: none;
            color:black;
         }
      }
   }
`

const Header = () => {
   return(
      <Wrapper >
         <h1 className="headtext">The Community NPC Generator</h1>
         <nav className="navBarContainer">
            <ul className="navList">
               <li><Link to="/signin">Sign in</Link></li>
               <li><Link to="/generator">Generator</Link></li>
               <li><Link to="/submissions">Submissions</Link></li>
               <li><Link to="/submit">Submit</Link></li>
            </ul>
         </nav>
      </Wrapper>
   )
} 


export default Header;