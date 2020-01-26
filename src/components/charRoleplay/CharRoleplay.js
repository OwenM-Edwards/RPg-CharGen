import React from 'react';



const CharRoleplay = ({roleplayOutputA, roleplayOutputB, roleplayOutputC, loadingState}) => {
   var displayRoleplay;
   if (loadingState === 'init') {
      displayRoleplay = <div className={"title"}>Roleplay Cues :  ???</div>;

   } else if(loadingState === 'loading') {
      displayRoleplay = <div></div>;

   } else if(loadingState === 'loaded') {
      displayRoleplay = 
         <div>
            <div className="roleplayItems">Roleplay Cues :</div>
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