import React from 'react';
import { connect } from "react-redux";
import {randomInterestArr} from '../constants/index';

const CharDesc = ({ newCharDesc }) => {
   let interest = randomInterestArr[Math.floor(Math.random()*randomInterestArr.length)];
   let firstName = newCharDesc.data[0][0].name;
   let lastName = newCharDesc.data[0][0].lastname
   let gender = newCharDesc.data[4] ? 'male' : 'female';
   let race = newCharDesc.data[3];

   return(
      <div>
         <h3>{firstName} {lastName}</h3>
         <p>is a {gender} {race} with an interest in {interest}.</p>
      </div>
   )
}

const mapStateToProps = (state) => ({ newCharDesc: state.newChar.newChar });
export default connect(mapStateToProps)(CharDesc);