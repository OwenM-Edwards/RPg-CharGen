import React from 'react';
import { connect } from "react-redux";
import {randomInterestArr} from '../constants/index';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   justify-content:center;
   padding:30px;

   & .nameContainer {
      width:100%;
      /* background-color:red; */
      font-size:2.1rem;
      height:30%;
      color:#01a4f6;
   }
   & .infoContainer {
      width:100%;
      /* background-color:blue; */
      font-size:1.2rem;
      height:70%;
   }
`


const CharDesc = ({ newCharDesc }) => {
   let interest = randomInterestArr[Math.floor(Math.random()*randomInterestArr.length)];
   let firstName = newCharDesc.data[0][0].name;
   let lastName = newCharDesc.data[0][0].lastname
   let gender = newCharDesc.data[4] ? 'male' : 'female';
   let race = newCharDesc.data[3];

   return(
      <Wrapper>
         <div className="nameContainer"><h3>{firstName} {lastName}</h3></div>
         <div className="infoContainer"><p>A <span>{gender} {race}</span> with an interest in <span>{interest}</span>.</p></div>
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ newCharDesc: state.newChar.newChar });
export default connect(mapStateToProps)(CharDesc);