import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharDesc = ({nameOutput, lastNameOutput, display, ageOutput, role, race}) => {
   var displayStateMainLine;
   if (display === 'init') {
      displayStateMainLine = <div>Desc</div>;

   } else if(display === 'loading') {
      displayStateMainLine = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayStateMainLine = 
         <div id="infoClass">
            {`${nameOutput} ${lastNameOutput} is a ${ageOutput} year old ${race} ${role}.`}
         </div>
   }

   return (
      <div  className={"charDesc"}>{displayStateMainLine} </div>
   )
}

export default CharDesc;  