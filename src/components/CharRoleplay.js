import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   justify-content:center;
   padding:30px;
   & span {
      color:#01a4f6;
   }
   & .titleContainer {
      width:100%;
      font-size:1.8rem;
      height:30%;
      padding:0!important;
   }
   & .infoContainer {
      width:100%;
      font-size:1.2rem;
      height:70%;
      padding-left:20px;
   }
`

const CharRoleplay = ({ newCharRoleplay }) => {
   
   return(
      <Wrapper>
         <div className="titleContainer"><h3>Roleplay Cues:</h3></div>
         <div className="infoContainer">
            <ul>
               <li>{newCharRoleplay[0].roleplay}.</li>
               <li>{newCharRoleplay[1].roleplay}.</li>
               <li>{newCharRoleplay[2].roleplay}.</li>
            </ul>
         </div>
      </Wrapper>
   )
}
const mapStateToProps = (state) => ({ newCharRoleplay: state.newChar.newChar.data[1] });
export default connect(mapStateToProps)(CharRoleplay);