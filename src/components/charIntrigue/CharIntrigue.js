import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharIntrigue = ({intrigueOutput, loadingState}) => {
   var displayIntrigue;
   if (loadingState === 'init') {
      displayIntrigue = <div className={"title"}>Intrigue :  ???</div>;

   } else if(loadingState === 'loading') {
      displayIntrigue = <div></div>

   } else if(loadingState === 'loaded') {
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