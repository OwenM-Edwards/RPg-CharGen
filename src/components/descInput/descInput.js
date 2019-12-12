import React from 'react';
import styles from './descInput.module.css';


class InputDesc extends React.Component {
   constructor(){
      super()
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
         fetch('http://localhost:3000/addroleplay', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
               "roleplay": this.state.roleplay
            })
         })
         .then(response => response.json())
         .then(status => {
            if(status === 'Success'){
               console.log('Name added')
            } else {
               console.log('Error adding name')
            }
         })
         .catch(err=>{
            console.log('problemo')
         })
      }
   }


   onSubmitIntrigue = () => {
      if(this.state.intrigue){
         fetch('http://localhost:3000/addintrigue', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
               "intrigue": this.state.intrigue
            })
         })
         .then(response => response.json())
         .then(status => {
            if(status === 'Success'){
               console.log('Name added')
            } else {
               console.log('Error adding name')
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
