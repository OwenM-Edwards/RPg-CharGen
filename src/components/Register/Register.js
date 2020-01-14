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
               <form className="registerContainer" onSubmit={this.onSubmitRegister}>
               <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                  <main className="pa4 black-80">
                     <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                           <legend className="f2 center fw6 ph0 mh0">Register</legend>
                           <div className="mt3">
                              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                              <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="text" name="name"  id="name" 
                                 onChange = {this.onNameChange} />
                           </div>
                           <div className="mt3">
                              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                              <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="email" name="email-address"  id="email-address" 
                                 onChange = {this.onEmailChange} />
                           </div>
                           <div className="mv3">
                              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                              <input 
                                 className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="password" name="password"  id="password" 
                                 onChange = {this.onPasswordChange} />
                           </div>
                           <div className="submitButtonContainer">
                              <input className="submit" 
                                 type="submit" 
                                 value="Register" 
                                 disabled={!isEnabled}
                                 />
                           </div>
                        </fieldset>
                        
                     </div>
                  </main>
               </article>
               </form>
               
            </div>
         }
      return (
         displayMainPage
      );
   }
}

export default Register;