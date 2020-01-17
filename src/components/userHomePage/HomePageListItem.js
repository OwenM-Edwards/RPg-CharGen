import React from 'react';

//On the user homepage, this component creates each line listing a submission.
//Is imported by UserHomePage.js
const  HomePageListItem = ({items}) => {
   // This converts database gender and moderation entries from bool back to string.
   let gender = false;
   let moderation = '';
   if(items.gender){
      gender = 'Male';

   }
   else {
      gender = 'Female'
   }


   if(items.moderation){
      moderation = 'Accepted'
   }
   else if(items.moderation === null){
      moderation = 'Pending'
   } else{
      moderation = 'Failed'
   }
      

   
   
   // If relevent information is present in argument, display it in a heading
   return (
      <div className='homePageListItem'>
         {(typeof(items)==='string') ? <h2>{items}</h2> : <div></div>}
         {(items.name) ? <h2>{items.name}</h2> : <div></div>}
         {(items.lastname) ? <h2>{items.lastname}</h2> : <div></div>}
         {(items.url) ? <h2>{items.url}</h2> : <div></div>}
         {(items.roleplay) ? <h2>{items.roleplay}</h2> : <div></div>}
         {(items.intrigue) ? <h2>{items.intrigue}</h2> : <div></div>}


         {(gender) ? <h2>{gender}</h2> : <div></div>}
         {(moderation) ? <h2>{moderation}</h2> : <div></div>}

      </div>
   );
}

export default  HomePageListItem;