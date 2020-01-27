import React from 'react';

//On the user homepage, this component creates each line listing a submission.
//Is imported by UserHomePage.js
const  HomePageListItem = ({items}) => {
   // This converts database gender and moderation entries from bool back to string.
   let gender = '';
   let moderation = '';
   if(items.gender === true){
      gender = 'Gender: Male';

   }
   else if(items.gender === false) {
      gender = 'Gender: Female'
   }


   if(items.moderation){
      moderation = 'Moderation Status: Accepted'
   }
   else if(items.moderation === null){
      moderation = 'Moderation Status: Pending'
   } else if(items.moderation === false){
      moderation = 'Moderation Status: Failed'
   }
      

   
   
   // If relevent information is present in argument, display it in a heading
   return (
         <ul className="homePageListUl">
         {(typeof(items)==='string') ? <li className={"homePageItemLi"}><p>{items}</p></li> : <div></div>}
         {(items.name) ? <li className={"homePageItemLi"}><p>Name:  {items.name}</p></li> : <div></div>}
         {(items.lastname) ? <li className={"homePageItemLi"}><p>Last Name: {items.lastname}</p></li> : <div></div>}
         {(items.url) ? <li className={"homePageItemLi"}><p>Image Link: {items.url}</p></li> : <div></div>}
         {(items.roleplay) ? <li className={"homePageItemLi"}><p>Roleplay: {items.roleplay}</p></li> : <div></div>}
         {(items.intrigue) ? <li className={"homePageItemLi"}><p>Intrigue: {items.intrigue}</p></li> : <div></div>}
         {(gender) ? <li className={"homePageItemLi"}><p>{gender}</p></li> : <div></div>}
         {(moderation) ? <li className={"homePageItemLi"}><p>{moderation}</p></li> : <div></div>}
         </ul>
   );
}

export default  HomePageListItem;