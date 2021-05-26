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
   }
`

const CharIntrigue = ({ newCharIntrigue }) => {
   
   return(
      <Wrapper>
         <div className="titleContainer"><h3>Intrigue:</h3></div>
         <div className="infoContainer"><p>{newCharIntrigue}.</p></div>
      </Wrapper>
   )
}
const mapStateToProps = (state) => ({ newCharIntrigue: state.newChar.newChar.data[0][0].intrigue });
export default connect(mapStateToProps)(CharIntrigue);