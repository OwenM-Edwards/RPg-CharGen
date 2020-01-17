import React from 'react';
import HomePageListItem from './HomePageListItem'



const HomePageList = ({submissions}) => {
   return (
       <div>
           {
               submissions.forEach(element=>{
                     <div>hey</div>
                     // <HomePageListItem 
                     //    name={element[0]} 
                     // />
                  
               })
           }
       </div>
   );
}

export default HomePageList;