import React from 'react';



const CharDesc = ({nameOutput, interestOutput, lastNameOutput, loadingState, ageOutput, raceOutput}) => {
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
            <p>{`${nameOutput} ${lastNameOutput} is a ${ageOutput} year old ${raceOutput}, with an interest in ${interestOutput}.`}</p>

         </div>
   }

   return (
      <div>{displayStateMainLine}</div>
   )
}

export default CharDesc;  