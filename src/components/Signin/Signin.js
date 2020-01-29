import React from 'react';
import LoadingIcons from '../LoadingIcons/LoadingIcons';

class Signin extends React.Component {
   constructor(props){
      super(props); 
      this.state = {
         signInEmail: '',
         signInPassword: '',
         loading:'default'
      }
   }
   onEmailChange = (event) => {
      this.setState({signInEmail:event.target.value})
   }
   onPasswordChange = (event) => {
      this.setState({signInPassword:event.target.value}) 
   }
   handleLoading = (data)=>{
      this.setState({loading:data}) 
   }

   onSubmitSignIn = () => {
      this.handleLoading('loading')
      fetch('https://safe-dawn-37731.herokuapp.com/signin', {
         method: 'post',
         headers: {'Content-Type' : 'application/json'},
         body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
         })
      })
      .then(response => response.json())
      .then(user => {
            if(user.id){
               this.setState({signInPassword:false}) 
               this.setState({signInEmail:false}) 
               this.handleLoading('default')
               this.props.changeSubTitle('What would you like to add?')
               this.props.loadUser(user);
               this.props.handleSignIn('SignedIn')
               this.props.routeChange('homepage');
            }
            else{
               this.setState({signInPassword:false}) 
               this.setState({signInEmail:false}) 
               this.props.modalMessageChange('Incorrect email or password');
               this.props.openModal();
               this.handleLoading('default')
            }
      })
      .catch(err=>{
         console.log(err)
         this.setState({signInPassword:false}) 
         this.setState({signInEmail:false}) 
         this.handleLoading('default')
         this.props.modalMessageChange('Incorrect email or password');
         this.props.openModal();
      })
   }

   render() {
      const isEnabled = this.state.signInEmail.length > 0 && this.state.signInPassword.length > 0;
      let displayMainPage = '';
      if(this.state.loading === 'loading'){
         displayMainPage = 
            <div className="outputContainer">
               <LoadingIcons/>
            </div>
      }
      else if(this.state.loading !== 'loading'){
          displayMainPage = 
            <div className="outputContainer">
               <form className="signInFormContainer" onSubmit={this.onSubmitSignIn}>
                  <fieldset>
                  <legend >Sign In</legend>
                     <input 
                        placeholder="Email"
                        className="signinInput"
                        onChange={this.onEmailChange} 
                        type="email" name="email-address"  id="email-address" />
                     <div >
                        <input 
                           placeholder="Password"
                           className="signinInput"
                           onChange={this.onPasswordChange} 
                           type="password" name="password"  id="password" />
                     </div>
                     <div className="signinStandardButtonContainer">
                     <input className="standardButton" 
                        type="submit" 
                        value="Sign in" 
                        disabled={!isEnabled}
                     />
                     </div>
                     <div className="signinStandardButtonContainer">
                        <input className="standardButton" 
                           type="submit" 
                           value="Register" 
                           
                           onClick={()=> this.props.routeChange('register')}
                        />
                     </div>
                  </fieldset>
               </form>
            </div>
         }
      return (
         displayMainPage
      );
   } 
}

export default Signin;