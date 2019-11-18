import React from 'react';


const SelectionButtons = ({handleRoleChange, handleGenderChange, handleRaceChange,handleSystemChange}) => {
   return (
      <form>
         <div>
            <select onChange={handleGenderChange}>
               <option value = "Random">Random</option>
               <option value = "male">Male</option>
               <option value = "female">Female</option>
            </select>



            <select onChange={handleRaceChange}>
               <option value = "human">Random</option>
               <option value = "human">Human</option>
               <option value = "Orc">Orc</option>
            </select>

            <select onChange={handleRoleChange}>
               <option value = "merchant">Random</option>
               <option value = "merchant">Merchant</option>
               <option value = "guard">Guard</option>
            </select>



            <select onChange={handleSystemChange}>
               <option value = "Random">Random</option>
               <option value = "Dnd 5e">DnD 5e</option>
            </select>
         </div>
      </form>
   );
}

export default SelectionButtons;
