import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharRoleplay = ({roleplayOutput, display}) => {
   var displayRoleplay;
   if (display === 'init') {
      displayRoleplay = <div>Roleplay</div>;

   } else if(display === 'loading') {
      displayRoleplay = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayRoleplay = <div id="infoClass">
         {`${roleplayOutput}.`}
    </div>
   }

   return (
      <div  className={"charRoleplay"} >{displayRoleplay} </div>
   )
}

export default CharRoleplay;  