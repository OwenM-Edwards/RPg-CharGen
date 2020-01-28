import React from 'react';



const CharDesc = ({genderOutput, nameOutput, lastNameOutput, loadingState, raceOutput}) => {
   const randomInterestArr = 
   [
      'pottery',
      'hunting',
      'fishing',
      'swimming',
      'brewing',
      'geology',
      'astronomy',
      'lockpicking',
      'literature',
      'botany',
      'fine rugs',
      'whiskey',
      'archery',
      'mushroom hunting',
      'travelling',
      'leather crafting',
      'knife throwing',
      'drawing',
      'boxing',
      'dancing',
      'puzzles',
      'people watching',
      'woodworking',
      'martial arts'
   ];
   let interest = randomInterestArr[Math.floor(Math.random()*randomInterestArr.length)];


   var displayStateMainLine;
   if (loadingState === 'init') {
      displayStateMainLine = 
         <div  className={"title"}>
            Description :  ???
         </div>;
           


   } else if(loadingState === 'loading') {
      displayStateMainLine =  <div></div>

   } else if(loadingState === 'loaded') {
      displayStateMainLine = 
         <div>
            <span className="descNameSpan">{`${nameOutput} ${lastNameOutput} `}</span> 
            <p className="descNameP">{`is a ${genderOutput} ${raceOutput}, with an interest in ${interest}.`}</p>

         </div>
   }

   return (
      <div>{displayStateMainLine}</div>
   )
}

export default CharDesc;  