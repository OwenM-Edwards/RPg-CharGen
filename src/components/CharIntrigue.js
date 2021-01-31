import React from 'react';
import { connect } from "react-redux";
import Tilt from 'react-parallax-tilt';


const CharIntrigue = ({ newCharIntrigue }) => {
   
   return(
      <div>
         <h3>Intrigue:</h3>
         <p>{newCharIntrigue}.</p>
      </div>
   )
}
const mapStateToProps = (state) => ({ newCharIntrigue: state.newChar.newChar.data[0][0].intrigue });
export default connect(mapStateToProps)(CharIntrigue);