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

const CharIntrigue = ({ newCharIntrigue }) => {
   
   return(
      <Wrapper>
         <h3>Intrigue:</h3>
         <p>{newCharIntrigue}.</p>
      </Wrapper>
   )
}
const mapStateToProps = (state) => ({ newCharIntrigue: state.newChar.newChar.data[0][0].intrigue });
export default connect(mapStateToProps)(CharIntrigue);