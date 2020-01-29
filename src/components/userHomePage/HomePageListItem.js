import React from 'react';

//On the user homepage, this component creates each line listing a submission.
//Is imported by UserHomePage.js
const  HomePageListItem = ({items,handleCheck}) => {
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
      <span>
         {(typeof(items)==='string') ? <div className="homePageSubHeading"><p>{items}</p></div> : 
            <ul onClick={handleCheck.bind(this)} className="homePageListUl" >
            {(items.name) ? <li className={"homePageItemLi"}><p>Name:  {items.name}</p></li> : false}
            {(items.lastname) ? <li className={"homePageItemLi"}><p>Last Name: {items.lastname}</p></li> : false}
            {(items.url) ? <span className={"homePageItemLi"}><span>Image Link: {items.url}</span></span> : false}
            {(items.roleplay) ? <li className={"homePageItemLi"}><p>Roleplay: {items.roleplay}</p></li> : false}
            {(items.intrigue) ? <li className={"homePageItemLi"}><p>Intrigue: {items.intrigue}</p></li> : false}
            {(items.race) ? <li className={"homePageItemLi"}><p>Race: {items.race}</p></li> : false}
            {(gender) ? <li className={"homePageItemLi"}><p>{gender}</p></li> : false}
            {(moderation) ? <li className={"homePageItemLi"}><p>{moderation}</p></li> : false}
            </ul>
         }
      </span>
   );
}

export default  HomePageListItem;