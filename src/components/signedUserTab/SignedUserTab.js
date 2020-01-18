import React from 'react';


class SignedUserTab extends React.Component {
   constructor(props){
      super(props); 
      this.state = {
      }
   }


   render() {
      let display = '';
      let userName = this.props.user.name;
      console.log(userName)
      if(this.props.isSignedIn === 'SignedIn'){
         display = 'Signed in - ' + userName
         return (
            <div className="tabContainer">
               {display}
            </div>
         );
      } else {
         display = 'Hello'
         return (
            <div className="tabContainer">
               {display}
            </div>
         );
      }
      
   } 
}

export default SignedUserTab;