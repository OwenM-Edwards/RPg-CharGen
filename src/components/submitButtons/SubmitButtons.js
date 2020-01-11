import React from 'react';
import styles from './submitButtons.module.css';




const SubmitButtons = ({fullRandom, submit}) => {
   return (
      <div className={styles.submitButtonContainer}>
         { fullRandom === true
          ? <button  className={styles.submit} onClick={submit}>Suprise me!</button>
          : <button className={styles.submit} onClick={submit}>Make another NPC</button>
        }
      </div>
   );
}

export default SubmitButtons;