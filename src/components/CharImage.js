import React from 'react';
import { connect } from "react-redux";
import Tilt from 'react-parallax-tilt';


const CharImage = ({ newCharImage }) => {
   
   return(
      <Tilt>
         <img src={newCharImage}/>
      </Tilt>
   )
}
const mapStateToProps = (state) => ({ newCharImage: state.newChar.newChar.data[0][0].url });
export default connect(mapStateToProps)(CharImage);