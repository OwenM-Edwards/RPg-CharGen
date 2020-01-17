import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';



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
   sayHello = () =>{
      console.log('hello')
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
               <form className="signInContainer" onSubmit={this.onSubmitSignIn}>
               <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                  <main className="pa4 black-80">
                     <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                           <legend className="f2 center fw6 ph0 mh0">Sign In</legend>
                           <div className="mt3">
                              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                              <input 
                                 onChange={this.onEmailChange} 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                              </div>
                              <div className="mv3">
                              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                              <input 
                                 onChange={this.onPasswordChange} 
                                 className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                           </div>
                           <div className="submitButtonContainer">
                           <input className="submit" 
                              type="submit" 
                              value="Sign in" 
                              disabled={!isEnabled}
                           />
                           </div>
                           <div className="submitButtonContainer">
                              <input className="submit" 
                                 type="submit" 
                                 value="Register" 
                                 
                                 onClick={()=> this.props.routeChange('register')}
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

export default Signin;