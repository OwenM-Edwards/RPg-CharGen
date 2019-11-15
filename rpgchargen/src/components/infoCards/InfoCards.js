import React from 'react';
import './infoCards.css';

const InfoCards = ({nameOutput}) => {
   return (
      <div id="infoCardContainer">
         <div className="infocard" id="infoClass">
           {`${nameOutput}`}
         </div>
         
         <div className="infocard" id="infoRace"></div>
         <div className="infocard" id="infoSystem"></div>
      </div>
   );
}

export default InfoCards; 