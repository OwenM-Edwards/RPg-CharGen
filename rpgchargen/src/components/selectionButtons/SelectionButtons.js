import React from 'react';


const SelectionButtons = ({handleGenderChange, handleRaceChange,handleSystemChange}) => {
   return (
      <form>
         <div>
            <select onChange={handleGenderChange}>
               <option value = "Random">Random</option>
               <option value = "Warrior">Warrior</option>
               <option value = "Hunter">Hunter</option>
               <option value = "Monk">Monk</option>
            </select>



            <select onChange={handleRaceChange}>
               <option value = "Random">Random</option>
               <option value = "Human">Human</option>
               <option value = "Orc">Orc</option>
               <option value = "Elf">Elf</option>
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
