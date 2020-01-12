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

   onSubmitRoleplay = () => {
      if(this.state.roleplay){
         this.handleRoleplayLoading('loading')
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
            this.handleIntrigueLoading('default')
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
      let displayRoleplay = '';
      let displayIntrigue = '';
      if(this.state.roleplayLoading === 'loading'){
         displayRoleplay = <LoadingIcons/>
      } else {
         displayRoleplay =
         <form className="inputRoleplayForm">
            Roleplay Que: 
            <input className="roleplayText" onChange={this.handleRP} minLength="3" maxLength="20" required="required" type="text" name="charName" placeholder="Roleplay Q"></input>

            <button className="submitButton" type={"button"} onClick={this.onSubmitRoleplay}>submit</button> 
         </form>
      }

      if(this.state.intrigueLoading === 'loading'){
         displayIntrigue = <LoadingIcons/>
      } else {
         displayIntrigue =
         <form className="inputIntrigueForm">
            Intrigue: 
            <textarea  className="intrigueText" onChange={this.handleIntrigue} rows="4" cols="50"></textarea>

            <button className="submitButton" type={"button"} onClick={this.onSubmitIntrigue}>submit</button> 
         </form>
      }


      
      
      return (
         <div>
            {displayRoleplay}
            {displayIntrigue} 
         </div>
      );
   }

}

export default InputDesc;
