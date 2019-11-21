import React from 'react';
import './infoCards.css';

const InfoCards = ({imageOutput, nameOutput, ageOutput,role,race,lastNameOutput}) => {

   return (
      <div id="infoCardContainer">
         <div className="infocard" id="infoClass">
           {`${nameOutput} ${lastNameOutput} is a ${ageOutput} year old ${race} ${role}.`}
         </div>
         
         <div className="infocard" id="infoRace">
            <img src={`${imageOutput}` } alt={''}></img>           
         </div>
            
         <div className="infocard" id="infoMainline">

         </div>
      </div>
   );
}

export default InfoCards; 