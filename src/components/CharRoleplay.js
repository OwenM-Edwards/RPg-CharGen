import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   justify-content:center;
   border:3px solid black;
   border-radius:5px;
   align-content:center;
`

const CharRoleplay = ({ newCharRoleplay }) => {
   
   return(
      <Wrapper>
         <h3>Roleplay Cues:</h3>
         <ul>
            <li>{newCharRoleplay[0].roleplay}.</li>
            <li>{newCharRoleplay[1].roleplay}.</li>
            <li>{newCharRoleplay[2].roleplay}.</li>
         </ul>
      </Wrapper>
   )
}
const mapStateToProps = (state) => ({ newCharRoleplay: state.newChar.newChar.data[1] });
export default connect(mapStateToProps)(CharRoleplay);