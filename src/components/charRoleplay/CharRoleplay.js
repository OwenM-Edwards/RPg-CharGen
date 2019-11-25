import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharRoleplay = ({roleplayOutputA, roleplayOutputB, roleplayOutputC, display}) => {
   var displayRoleplay;
   if (display === 'init') {
      displayRoleplay = <div>Roleplay:???</div>;

   } else if(display === 'loading') {
      displayRoleplay = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayRoleplay = 
         <div>
            Roleplay Ques:

            <div>{`${roleplayOutputA}.`}</div>
            

            <div>{`${roleplayOutputB}.`}</div>
            

            <div>{`${roleplayOutputC}.`}</div>
            
         </div>
   }

   return (
      <div>{displayRoleplay} </div>
   )
}

export default CharRoleplay;  