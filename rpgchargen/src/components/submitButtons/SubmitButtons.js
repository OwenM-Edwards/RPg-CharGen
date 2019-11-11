import React from 'react';

const SubmitButtons = ({fullRandom, submit, submitted}) => {
   return (
      <div>
         { fullRandom === true
          ? <button onClick={submit}>Suprise me!</button>
          : <button onClick={submit}>Submit</button>
        }
      </div>
   );
}

export default SubmitButtons;