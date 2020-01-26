import React from 'react';



const CharIntrigue = ({intrigueOutput, loadingState}) => {
   var displayIntrigue;
   if (loadingState === 'init') {
      displayIntrigue =<div>Intrigue : ???</div>;

   } else if(loadingState === 'loading') {
      displayIntrigue = <div></div>;

   } else if(loadingState === 'loaded') {
      displayIntrigue = 
         <div>
            <div className="intrigueItems">Intrigue :</div>
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