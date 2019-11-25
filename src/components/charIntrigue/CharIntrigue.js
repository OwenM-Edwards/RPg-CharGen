import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharIntrigue = ({intrigueOutput, display}) => {
   var displayIntrigue;
   if (display === 'init') {
      displayIntrigue = <div>Intrigue</div>;

   } else if(display === 'loading') {
      displayIntrigue = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayIntrigue = 
         <div id="infoClass">
            {`${intrigueOutput}.`}
         </div>
   }
   return (
      <div className={"charIntrigue"}>{displayIntrigue} </div>
   )
}

export default CharIntrigue;  