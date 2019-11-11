import React from 'react';


const SelectionButtons = ({role, race, system}) => {
   return (
      <div>
         <select id="classSelection">
            <option value = "1">One</option>
            <option value = "2">Two</option>
            <option value = "3">Three</option>
            <option value = "4">Four</option>
         </select>

         <select id="raceSelection">
            <option value = "1">One</option>
            <option value = "2">Two</option>
            <option value = "3">Three</option>
            <option value = "4">Four</option>
         </select>

         <select id="systemSelection">
            <option value = "1">One</option>
            <option value = "2">Two</option>
            <option value = "3">Three</option>
            <option value = "4">Four</option>
         </select>
      </div>
   );
}

export default SelectionButtons;
