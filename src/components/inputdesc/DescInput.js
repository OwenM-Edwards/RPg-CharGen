import React from 'react';
import LoadingIcons from '../loadingIcons/LoadingIcons';


class InputDesc extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         roleplay:'',
         intrigue:'',
         roleplayLoading:'default',
         intrigueLoading:'default'
      }
   }

   handleRP = (event) =>{
      this.setState({roleplay: event.target.value});
   }
   handleIntrigue = (event) =>{
      this.setState({intrigue: event.target.value});
   }
   handleRoleplayLoading=(data)=>{
      this.setState({roleplayLoading: data});
   }
   handleIntrigueLoading=(data)=>{
      this.setState({intrigueLoading: data});
   }
   handleSubmitCheckRoleplay=()=>{
      if(this.state.roleplay){
         this.onSubmitRoleplay();
      } 
      else if(!this.state.roleplay){

      }
   }
   handleSubmitCheckIntrigue=()=>{
      if(this.state.intrigue){
         this.onSubmitIntrigue();
      } 
      else if(!this.state.intrigue){

      }
   }

   onSubmitRoleplay = () => {
      if(this.state.roleplay){
         this.handleRoleplayLoading('loading')
         this.handleIntrigueLoading('loading')
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
            this.handleRoleplayLoading('default')
            this.handleIntrigueLoading('default')
            if(status === 'Success'){
               this.props.modalMessageChange('Roleplay added, thank you for your contribution!');
               this.props.openModal();
            } else {
               this.props.modalMessageChange('Error Adding Roleplay');
               this.props.openModal();
            }
         })
         .catch(err=>{
            this.handleRoleplayLoading('default')
            this.handleIntrigueLoading('default')
            this.props.modalMessageChange('Error Adding Roleplay');
            this.props.openModal();
            console.log('problemo')
         })
      }
   }


   onSubmitIntrigue = () => {
      if(this.state.intrigue){
         this.handleRoleplayLoading('loading')
         this.handleIntrigueLoading('loading')
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
            this.handleRoleplayLoading('default')
            this.handleIntrigueLoading('default')
            if(status === 'Success'){
               this.props.modalMessageChange('Intrigue added, thank you for your contribution!');
               this.props.openModal();
            } else {
               this.props.modalMessageChange('Error Adding Intrigue');
               this.props.openModal();
            }
         })
         .catch(err=>{
            this.handleRoleplayLoading('default')
            this.handleIntrigueLoading('default')
            this.props.modalMessageChange('Error Adding Intrigue');
            this.props.openModal();
            console.log('problemo')
         })
      }
   } 


   render(){
      const isRoleplayEnabled = this.state.roleplay.length > 0 ;
      const isIntrigueEnabled = this.state.intrigue.length > 0 ;
      let displayRoleplay = '';
      let displayIntrigue = '';
      if(this.state.roleplayLoading === 'loading'){
         displayRoleplay = <LoadingIcons/>
      } else {
         displayRoleplay =
         <form onSubmit={this.handleSubmitCheckRoleplay} className="inputRoleplayForm">
            Roleplay Cue: 
            <textarea  className="roleplayText" placeholder="Roleplay Cue" onChange={this.handleRP} type="text" required="required" minLength="3" maxLength="60"></textarea>
            <div className="roleplayDescStandardButtonContainer">
               <button disabled={!isRoleplayEnabled} className="standardButton" type={"submit"}>Submit</button> 
            </div>
         </form>
      }

      if(this.state.intrigueLoading === 'loading'){
         displayIntrigue = <LoadingIcons/>
      } else {
         displayIntrigue =
         <form onSubmit={this.handleSubmitCheckIntrigue} className="inputIntrigueForm">
            Intrigue: 
            
            <textarea  name="hello" className="intrigueText" placeholder="Character Intrigue" onChange={this.handleIntrigue} maxLength="60"></textarea>
            <div className="roleplayDescStandardButtonContainer">
               <button disabled={!isIntrigueEnabled} className="standardButton" type={"submit"}>Submit</button> 
            </div>
            
         </form>
      }


      
      
      return (
         <div className="inputDescContainer">
            {displayRoleplay}
            {displayIntrigue} 
         </div>
      );
   }

}

export default InputDesc;
