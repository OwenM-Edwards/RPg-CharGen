import React from 'react';



const CharDesc = ({nameOutput, roleOutput, lastNameOutput, loadingState, ageOutput, raceOutput}) => {
   var displayStateMainLine;
   if (loadingState === 'init') {
      displayStateMainLine = 
            <div  className={"title"}>
               Description :  ???

            </div>;
           


   } else if(loadingState === 'loading') {
      displayStateMainLine =  <div></div>

   } else if(loadingState === 'loaded') {
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