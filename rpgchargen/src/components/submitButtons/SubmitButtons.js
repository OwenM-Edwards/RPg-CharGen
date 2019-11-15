import React from 'react';

const SubmitButtons = ({fullRandom, submit,test}) => {
   return (
      <div>
         { fullRandom === true
          ? <button onClick={submit}>Suprise me!</button>
          : <button onClick={test}>Submit</button>
        }
      </div>
   );
}

export default SubmitButtons;