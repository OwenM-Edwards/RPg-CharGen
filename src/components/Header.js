import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Sidebar} from './index';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   background-color:${props => props.theme.backgroundHvyColor};
   color:${props => props.theme.fontColor};

   & .headtext{
      margin: 0 auto;
   }
`

const Header = () => {
   return(
      <Wrapper >
         
         <h1 className="headtext">The Community NPC Generator</h1>
      
      </Wrapper>
   )
} 

export default Header;