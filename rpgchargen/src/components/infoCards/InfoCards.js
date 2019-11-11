import React from 'react';
import './infoCards.css';

const InfoCards = () => {
   return (
      <div id="infoCardContainer">
         <div className="infocard" id="infoClass"></div>
         <div className="infocard" id="infoRace"></div>
         <div className="infocard" id="infoSystem"></div>
      </div>
   );
}

export default InfoCards;