import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   background-color:${props => props.theme.backgroundHvyColor};
   color:${props => props.theme.fontColor};
   width:100%;
   height:100%;
`





const Footer = () => {
   return(
      <Wrapper>
         footer
      </Wrapper>
   )
}


export default Footer;