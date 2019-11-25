import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharDesc = ({nameOutput, lastNameOutput, display, ageOutput, role, race}) => {
   var displayStateMainLine;
   if (display === 'init') {
      displayStateMainLine = 
            <div>
               Description:???

            </div>;
           


   } else if(display === 'loading') {
      displayStateMainLine = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayStateMainLine = 
         <div>
            Name:
            <div>
               {`${nameOutput} ${lastNameOutput} is a ${ageOutput} year old ${race} ${role}.`}
            </div>
         </div>
   }

   return (
      <div>{displayStateMainLine}</div>
   )
}

export default CharDesc;  