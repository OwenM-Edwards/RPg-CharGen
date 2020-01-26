import React from 'react';



const Popup = ({popupText}) => {
   return (
      <div className="popupContainer">
         <span class="popuptext" id="myPopup">{popupText}</span>
      </div>
   )
}

export default Popup;  