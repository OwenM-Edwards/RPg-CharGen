import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



const CharImage = ({display,imageOutput}) => {

   var displayStateImage;
   if (display === 'init') {
      displayStateImage = <img src={require('../../img/blankProfile.png')} alt={''}></img>;

   } else if(display === 'loading') {
      displayStateImage = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayStateImage = <img src={`${imageOutput}` } alt={''}></img>           
                                            
   }


   return (
      <div>{displayStateImage} </div>
   )
}

export default CharImage; 