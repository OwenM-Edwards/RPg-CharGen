import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharRoleplay = ({roleplayOutputA, roleplayOutputB, roleplayOutputC, display}) => {
   var displayRoleplay;
   if (display === 'init') {
      displayRoleplay = <div className={"title"}>Roleplay Cues :  ???</div>;

   } else if(display === 'loading') {
      displayRoleplay = <div><LoadingIcons/></div>;

   } else if(display === 'loaded') {
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