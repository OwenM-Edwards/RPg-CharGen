import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharIntrigue = ({intrigueOutput, display}) => {
   var displayIntrigue;
   if (display === 'init') {
      displayIntrigue = <div className={"title"}>Intrigue :  ???</div>;

   } else if(display === 'loading') {
      displayIntrigue = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayIntrigue = 
         <div>
            <div className={"title"}>Intrigue :</div>
            <ul>
               <li>
                  <p>{`${intrigueOutput}.`}</p>
               </li>
            </ul>
            
         </div>
   }
   return (
      <div>{displayIntrigue}</div>
   )
}

export default CharIntrigue;  