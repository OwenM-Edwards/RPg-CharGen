import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharRoleplay = ({roleplayOutputA, roleplayOutputB, roleplayOutputC, loadingState}) => {
   var displayRoleplay;
   if (loadingState === 'init') {
      displayRoleplay = <div className={"title"}>Roleplay Cues :  ???</div>;

   } else if(loadingState === 'loading') {
      displayRoleplay = <div></div>;

   } else if(loadingState === 'loaded') {
      displayRoleplay = 
         <div>
            <div className={"title"}>Roleplay Cues :</div>
            <ul>
               <li><p>{`${roleplayOutputA}.`}</p></li>
               <li><p>{`${roleplayOutputB}.`}</p></li>
               <li><p>{`${roleplayOutputC}.`}</p></li>
            </ul>
         </div>
   }

   return (
      <div>{displayRoleplay} </div>
   )
}

export default CharRoleplay;  