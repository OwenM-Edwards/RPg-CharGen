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
   { value: 'orc', label: 'Orc' },
   { value: 'elf', label: 'Elf' },
   { value: 'halfling', label: 'Halfling' },
];

const customStyles = {
   menu: (provided, state) => ({
     ...provided,
   }),
}

class SelectionButtons extends React.Component {

   render(){
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
         </div>

      );
   }
}

export default SelectionButtons;
