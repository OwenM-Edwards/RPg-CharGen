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

   render(){
      // const { selectedOption } = this.state;
      return (
         <div className={styles.selectMainContainer}>
            <Select 
               className={styles.selectContainer}
               defaultValue={optionsGender[0]}
               onChange={this.props.handleGenderChange}
               isSearchable={false}
               styles={customStyles}
               options={optionsGender}


            />
            <Select className={styles.selectContainer}
               defaultValue={optionsRace[0]}
               onChange={this.props.handleRaceChange}
               isSearchable={false}
               styles={customStyles}
               options={optionsRace}
            />
            <Select className={styles.selectContainer}
               defaultValue={optionsRole[0]}
               onChange={this.props.handleRoleChange}
               isSearchable={false}
               styles={customStyles}
               options={optionsRole}
            />
         </div>

      );
   }
}

export default SelectionButtons;
