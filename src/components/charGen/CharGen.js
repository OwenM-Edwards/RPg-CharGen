import React from 'react';
import styles from './selectionButtons.module.css';
import Select from 'react-select';




class charGen extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         
      }
   }

   
   render(){
      return (
         <div className={styles.selectMainContainer}>
            <form>
               <Select 
                  className={styles.selectContainer}
                  defaultValue={this.state.optionsGender[0]}
                  onChange={this.props.handleGenderChange}
                  isSearchable={false}
                  styles={customStyles}
                  options={this.state.optionsGender}
               />
               <Select className={styles.selectContainer}
                  defaultValue={this.state.optionsRace[0]}
                  onChange={this.props.handleRaceChange}
                  isSearchable={false}
                  styles={customStyles}
                  options={this.state.optionsRace}
               />
            </form>
         </div>

      );
   }
}

export default charGen;
