import React from 'react';
import styles from './addOwnButton.module.css';


class AddOwnButton extends React.Component {
   constructor(props){
      super(props)
   }

   changeToAddChar = () =>{
      this.props.changeToAddCharScreen();
   }

   render(){
      return (
         <div className={styles.submitButtonContainer}>
            <button  className={styles.submit} onClick={this.changeToAddChar}>Add your own!</button>
         </div>
      );
   }
}

export default AddOwnButton;