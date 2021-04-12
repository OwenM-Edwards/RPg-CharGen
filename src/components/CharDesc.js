import React from 'react';
import { connect } from "react-redux";
import {randomInterestArr} from '../constants/index';
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


const CharDesc = ({ newCharDesc }) => {
   let interest = randomInterestArr[Math.floor(Math.random()*randomInterestArr.length)];
   let firstName = newCharDesc.data[0][0].name;
   let lastName = newCharDesc.data[0][0].lastname
   let gender = newCharDesc.data[4] ? 'male' : 'female';
   let race = newCharDesc.data[3];

   return(
      <Wrapper>
         <h3>{firstName} {lastName}</h3>
         <p>A {gender} {race} with an interest in {interest}.</p>
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ newCharDesc: state.newChar.newChar });
export default connect(mapStateToProps)(CharDesc);