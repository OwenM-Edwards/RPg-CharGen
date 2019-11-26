import React from 'react';
import styles from './addOwnButton.module.css';


const AddOwnButton = ({changeMain}) => {
   return (
      <div className={styles.submitButtonContainer}>
         <button  className={styles.submit} onClick={changeMain}>Add your own!</button>
      </div>
   );
}

export default AddOwnButton;