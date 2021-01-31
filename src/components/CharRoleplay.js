import React from 'react';
import { connect } from "react-redux";
import Tilt from 'react-parallax-tilt';


const CharRoleplay = ({ newCharRoleplay }) => {
   
   return(
      <div>
         <h3>Roleplay Cues:</h3>
         <ul>
            <li>{newCharRoleplay[0].roleplay}.</li>
            <li>{newCharRoleplay[1].roleplay}.</li>
            <li>{newCharRoleplay[2].roleplay}.</li>
         </ul>
      </div>
   )
}
const mapStateToProps = (state) => ({ newCharRoleplay: state.newChar.newChar.data[1] });
export default connect(mapStateToProps)(CharRoleplay);