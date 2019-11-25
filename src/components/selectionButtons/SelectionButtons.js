import React from 'react';
import styles from './selectionButtons.module.css';
import Select from 'react-select';


const optionsGender = [
   { value: 'random', label: 'Random Gender' },
   { value: 'male', label: 'Male' },
   { value: 'female', label: 'Female' }
];
const optionsRace = [
   { value: 'random', label: 'Random Race' },
   { value: 'human', label: 'Human' },
   { value: 'orc', label: 'Orc' }
];
const optionsRole = [
   { value: 'random', label: 'Random Role' },
   { value: 'merchant', label: 'Merchant' },
   { value: 'hunter', label: 'Hunter' }
];
const customStyles = {
   menu: (provided, state) => ({
     ...provided,
   }),
}
//({handleRoleChange, handleGenderChange, handleRaceChange,handleSystemChange}) 
class SelectionButtons extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         selectedOption: null
      };
   }
   handleChange = selectedOption => {
      this.setState(
      //   { selectedOption },
        () => console.log(`Option selected:`, this.state.selectedOption)
      );
   };

   render(){
      // const { selectedOption } = this.state;
      return (
         <div className={styles.selectMainContainer}>
            <Select 
               className={styles.selectContainer}
               defaultValue={optionsGender[0]}
               onChange={this.handleChange}
               isSearchable={false}
               styles={customStyles}
               options={optionsGender}


            />
            <Select className={styles.selectContainer}
               defaultValue={optionsRace[0]}
               onChange={this.handleChange}
               isSearchable={false}
               styles={customStyles}
               options={optionsRace}
            />
            <Select className={styles.selectContainer}
               defaultValue={optionsRole[0]}
               onChange={this.handleChange}
               isSearchable={false}
               styles={customStyles}
               options={optionsRole}
            />
         </div>




         // <form>
         //    <div className={styles.selectContainer}>
         //       <select className={styles.selection} onChange={handleGenderChange}>
         //          <option value = "Random">Random</option>
         //          <option value = "male">Male</option>
         //          <option value = "female">Female</option>
         //       </select>



         //       <select className={styles.selection} onChange={handleRaceChange}>
         //          <option value = "human">Random</option>
         //          <option value = "human">Human</option>
         //          <option value = "Orc">Orc</option>
         //       </select>

         //       <select className={styles.selection} onChange={handleRoleChange}>
         //          <option value = "merchant">Random</option>
         //          <option value = "merchant">Merchant</option>
         //          <option value = "guard">Guard</option>
         //       </select>



         //       <select className={styles.selection} onChange={handleSystemChange}>
         //          <option value = "Random">Random</option>
         //          <option value = "Dnd 5e">DnD 5e</option>
         //       </select>
         //    </div>
         // </form>

      );
   }
}

export default SelectionButtons;
