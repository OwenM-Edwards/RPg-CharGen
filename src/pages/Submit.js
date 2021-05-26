import React from 'react';
import styled from "styled-components";
import { InputCharDesc, InputCharImage, InputCharIntrigue, InputCharRoleplay } from '../components';

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
   }

   & .main {
      background-color:${props => props.backgroundLgtColor};
      color:${props => props.theme.fontColor};
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 0.9fr 1.1fr;
      gap: 10px 10px;
      grid-template-areas:
         "desc desc image image"
         "role role intrigue intrigue";
   }
   
`
const InputDesc = styled.div`
   grid-area: desc;
   overflow: hidden;
   background-color:#2f3438;
   border-radius:20px;

`
const InputImage = styled.div`
   grid-area: image;
   overflow: hidden;
   background-color:#2f3438;
   border-radius:20px;
`
const InputRoleplay = styled.div`
   grid-area: role;
   overflow: hidden;
   background-color:#2f3438;
   border-radius:20px;
`
const InputIntrigue = styled.div`
   grid-area: intrigue;
   overflow: hidden;
   background-color:#2f3438; 
   border-radius:20px;
`



const Submit = () => {

   return(
      <Wrapper>
         <div className="titleContainer">
            <h1>Add your own characters!</h1>
         </div>

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