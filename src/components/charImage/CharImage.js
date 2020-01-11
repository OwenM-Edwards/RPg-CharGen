import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';
import Tilt from 'react-tilt'



const CharImage = ({loadingState,imageOutput}) => {

   var displayStateImage;
   if (loadingState === 'init') {
      displayStateImage = 
         <Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} >
            <img src={require('../../img/blankProfile.png')} alt={''}></img>
         </Tilt>

   } else if(loadingState === 'loading') {
      displayStateImage = <div></div>

   } else if(loadingState === 'loaded') {
      displayStateImage = 
      <Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} >
         <img src={`${imageOutput}` } alt={''}></img>        
      </Tilt>      
                                            
   }


   return (
      <div>{displayStateImage} </div>
   )
}

export default CharImage; 