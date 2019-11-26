import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharDesc = ({nameOutput, lastNameOutput, display, ageOutput, role, race}) => {
   var displayStateMainLine;
   if (display === 'init') {
      displayStateMainLine = 
            <div  className={"title"}>
               Description :  ???

            </div>;
           


   } else if(display === 'loading') {
      displayStateMainLine = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayStateMainLine = 
         <div>
            <div className={"title"}>Name :</div>
            <ul>
               <li>
                  <p>{`${nameOutput} ${lastNameOutput} is a ${ageOutput} year old ${race} ${role}.`}</p>
               </li>
            </ul>

         </div>
   }

   return (
      <div>{displayStateMainLine}</div>
   )
}

export default CharDesc;  