import React from 'react';
import styled from "styled-components";
import { Sidebar, InputCharDesc, InputCharImage, InputCharIntrigue, InputCharRoleplay } from '../components/Index';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   & .main {
      background-color:${props => props.theme.backgroundLgtColor};
      color:${props => props.theme.fontColor};
      min-height:100%;
      min-width:80%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: 0px;
      grid-row-gap: 0px; 
   }
`
const InputDesc = styled.div`
   grid-area: 1 / 1 / 2 / 2;
   overflow: hidden;

`
const InputImage = styled.div`
   grid-area: 1 / 2 / 2 / 3;
   overflow: hidden;
`
const InputRoleplay = styled.div`
   grid-area: 2 / 1 / 3 / 2;
   overflow: hidden;
`
const InputIntrigue = styled.div`
   grid-area: 2 / 2 / 3 / 3;
   overflow: hidden;
`



const Submit = () => {

   return(
      <Wrapper>
         <Sidebar page={'generator'}/>
         <div className="main">
            <InputImage>
               <InputCharImage/>
            </InputImage>

            <InputDesc>
               <InputCharDesc/>
            </InputDesc>

            <InputRoleplay>
               <InputCharRoleplay/>
            </InputRoleplay>

            <InputIntrigue>
               <InputCharIntrigue/>
            </InputIntrigue>
         </div>
      </Wrapper>
   )
}

export default Submit;