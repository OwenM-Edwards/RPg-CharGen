import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';
import styles from './charImage.module.css';



const CharImage = ({display,imageOutput}) => {

   var displayStateImage;
   if (display === 'init') {
      displayStateImage = <img src={require('../../img/blankProfile.png')}></img>;

   } else if(display === 'loading') {
      displayStateImage = <LoadingIcons/>;

   } else if(display === 'loaded') {
      displayStateImage = <div id="infoRace">
                              <img src={`${imageOutput}` } alt={''}></img>           
                              </div>                  
   }


   return (
      <div>{displayStateImage} </div>
   )
}

export default CharImage; 