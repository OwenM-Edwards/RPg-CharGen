import React from 'react';
import './infoCards.css';

const InfoCards = ({imageOutput, nameOutput}) => {
   return (
      <div id="infoCardContainer">
         <div className="infocard" id="infoClass">
           {`${nameOutput}`}
         </div>
         
         <div className="infocard" id="infoRace">
            {`${imageOutput}`}
         </div>
            
         <div className="infocard" id="infoSystem"></div>
      </div>
   );
}

export default InfoCards; 