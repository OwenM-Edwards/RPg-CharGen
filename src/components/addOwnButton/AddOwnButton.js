import React from 'react';
import styles from './addOwnButton.module.css';


const AddOwnButton = ({signIn}) => {
   return (
      <div className={styles.submitButtonContainer}>
         <button  className={styles.submit} onClick={signIn}>Sign in to add your own!</button>
      </div>
   );
}

export default AddOwnButton;