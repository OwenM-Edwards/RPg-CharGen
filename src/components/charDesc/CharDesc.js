import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharDesc = ({nameOutput, roleOutput, lastNameOutput, display, ageOutput, raceOutput}) => {
   var displayStateMainLine;
   if (display === 'init') {
      displayStateMainLine = 
            <div  className={"title"}>
               Description :  ???

            </div>;
           


   } else if(display === 'loading') {
      displayStateMainLine = <div><LoadingIcons/></div>;

   } else if(display === 'loaded') {
      displayStateMainLine = 
         <div>
            <div className={"title"}>Name :</div>
            <ul>
               <li>
                  <p>{`${nameOutput} ${lastNameOutput} is a ${ageOutput} year old ${raceOutput} ${roleOutput}.`}</p>
               </li>
            </ul>

         </div>
   }

   return (
      <div>{displayStateMainLine}</div>
   )
}

export default CharDesc;  