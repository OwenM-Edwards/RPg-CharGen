import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';


class Register extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         email: false,
         password: false,
         name: false,
         loading:'default'
      }
   }
   onEmailChange = (event) => {
      this.setState({email:event.target.value})
   }
   onNameChange = (event) => {
      this.setState({name:event.target.value})
   }
   onPasswordChange = (event) => {
      this.setState({password:event.target.value})
   }
   handleRegister =()=>{
      if(!this.state.email){
         console.log('nope')
      }
      else {
         console.log('yup')

      }
   }
   handleLoading = (data)=>{
      this.setState({loading:data}) 
   }

   onSubmitRegister = () => {
      this.handleLoading('loading')
      fetch('https://safe-dawn-37731.herokuapp.com/register', {
         method: 'post',
         headers: {'Content-Type' : 'application/json'},
         body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
         })
      })
      .then(response => response.json())
      .then(user => {
         this.handleLoading('default')
         if(user.id){
            this.props.loadUser(user);
            this.props.changeSubTitle('What would you like to add?')
            this.props.routeChange('input');
            
         }
         else{
            this.props.modalMessageChange('Error Registering');
            this.props.openModal();
         }
      })
      .catch(err=>{
         this.handleLoading('default')
         this.props.modalMessageChange('Email already registered');
         this.props.openModal();
      })
   }


   render(){
      const isEnabled = this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length > 0;
      let displayMainPage = ''
      if(this.state.loading === 'loading'){
         displayMainPage = 
            <div className="outputContainer">
               <LoadingIcons/>
            </div>
         } 
   
      else if(this.state.loading !== 'loading'){
         displayMainPage = 
            <div className="outputContainer">
               <form className="signInFormContainer" onSubmit={this.onSubmitRegister}>
                  <fieldset >
                     <legend >Register</legend>
                        <input 
                           placeholder="Username"
                           className="signinInput"
                           type="text" name="name"  id="name" 
                           onChange = {this.onNameChange} />
                     <div>
                        <input 
                           placeholder="Email"
                           className="signinInput"
                           type="email" name="email-address"  id="email-address" 
                            onChange = {this.onEmailChange} />
                     </div>
                     <div>          
                        <input 
                           placeholder="Password"
                           className="signinInput"
                           type="password" name="password"  id="password" 
                           onChange = {this.onPasswordChange} />
                     </div>
                     <div className="signinStandardButtonContainer">
                        <input className="standardButton" 
                           type="submit" 
                           value="Register" 
                           disabled={!isEnabled}
                           />
                     </div>
                     <div className="signinStandardButtonContainer">
                        <input className="standardButton" 
                           type="submit" 
                           value="Sign In" 
                           onClick={()=> this.props.routeChange('signIn')}
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

export default Register;