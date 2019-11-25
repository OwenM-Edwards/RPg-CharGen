import React from 'react';
import './infoCards.css';
import LoadingIcons from '../loadingIcons/LoadingIcons';

const InfoCards = ({intrigueOutput, roleplayOutput, display,imageOutput, nameOutput, ageOutput,role,race,lastNameOutput}) => {

   var displayStateMainLine;
   if (display === 'init') {
      displayStateMainLine = <div></div>;

   } else if(display === 'loading') {
      displayStateMainLine = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayStateMainLine = <div id="infoClass">
                                 {`${nameOutput} ${lastNameOutput} is a ${ageOutput} year old ${race} ${role}.`}
                              </div>
   }

   var displayStateImage;
   if (display === 'init') {
      displayStateImage = <div></div>;

   } else if(display === 'loading') {
      displayStateImage = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayStateImage = <div id="infoRace">
                              <img src={`${imageOutput}` } alt={''}></img>           
                           </div>
   }

   var displayStateDesc;
   if (display === 'init') {
      displayStateDesc = <div></div>;

   } else if(display === 'loading') {
      displayStateDesc = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayStateDesc = <div id="infoMainline">
                              {`${intrigueOutput} ${roleplayOutput}.`}
                           </div>
   }

   return (
      <div id="infoCardContainer">
         <div  className="infocard" >{displayStateMainLine} </div>
         <div  className="infocard" >{displayStateImage} </div>
         <div  className="infocard" > {displayStateDesc} </div>
         
         
         

      </div>
   );
}

export default InfoCards; 