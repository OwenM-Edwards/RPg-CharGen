import React from 'react';
import styles from './descInput.module.css';


class InputDesc extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         roleplay:'',
         intrigue:'',
      }
   }

   handleRP = (event) =>{
      this.setState({roleplay: event.target.value});
   }
   handleIntrigue = (event) =>{
      this.setState({intrigue: event.target.value});
   }

   onSubmitRoleplay = () => {
      if(this.state.roleplay){
         this.props.handleInputLoadingState('loading')
         fetch('https://safe-dawn-37731.herokuapp.com/addroleplay', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
               "roleplay": this.state.roleplay,
               "email":this.props.email,
               "id":this.props.id
            })
         })
         .then(response => response.json())
         .then(status => {
            this.props.handleInputLoadingState('default')
            if(status === 'Success'){
               console.log('Roleplay added')
            } else {
               console.log('Error adding roleplay')
            }
         })
         .catch(err=>{
            console.log('problemo')
         })
      }
   }


   onSubmitIntrigue = () => {
      if(this.state.intrigue){
         this.props.handleInputLoadingState('loading')
         fetch('https://safe-dawn-37731.herokuapp.com/addintrigue', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
               "intrigue": this.state.intrigue,
               "email":this.props.email,
               "id":this.props.id
            })
         })
         .then(response => response.json())
         .then(status => {
            this.props.handleInputLoadingState('default')
            if(status === 'Success'){
               console.log('Intrigue added')
            } else {
               console.log('Error adding intrigue')
            }
         })
         .catch(err=>{
            console.log('problemo')
         })
      }
   } 


   render(){
      return (
         <div>
            <form className="inputRoleplayForm">
               Roleplay Que: 
               <input className="roleplayText" onChange={this.handleRP} minLength="3" maxLength="20" required="required" type="text" name="charName" placeholder="Roleplay Q"></input>

               <button className="submitButton" type={"button"} onClick={this.onSubmitRoleplay}>submit</button> 
            </form>
            <form className="inputIntrigueForm">
               Intrigue: 
               <textarea  className="intrigueText" onChange={this.handleIntrigue} rows="4" cols="50"></textarea>

               <button className="submitButton" type={"button"} onClick={this.onSubmitIntrigue}>submit</button> 
            </form>
         </div>
      );
   }

}

export default InputDesc;
