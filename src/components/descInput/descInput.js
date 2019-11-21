import React from 'react';


class DescInput extends React.Component {
   constructor(){
      super()
      this.state = {
         hair:'',
         face:'',
         clothes:'',
         roleplayQ1:'',
         roleplayQ2:'',
         intrigue:'',
      }
   }

   handleGender = (event) =>{
      this.setState({gender: event.target.value});
   }

   onSubmitNewName = () => {
      if(this.state.name.length < 3){
         console.log('problem')
      } else {
         fetch('http://localhost:3000/addname', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
               "race": this.state.race,
               "gender": this.state.gender,
               "name":this.state.name,
               "lastname":this.state.lastName
            })
         })

         .then(response => response.json())
         .then(status => {
            if(status === 'Success'){
               console.log('Name added')
            } else if(status === 'duplicate'){
               console.log('Duplicate Name')
            } else if(status === 'duplicate last name'){
               console.log('First name added, Duplicate Last Name')
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
         <form id="newName">
            Hair: 

            <input onChange={this.handleHair} minLength="3" maxLength="200" required="required" type="text" name="charName" placeholder="Character name"></input>
            
            Face: 
            <input onChange={this.handleFace} minLength="3" maxLength="20" required="required" type="text" name="charName" placeholder="Character name"></input>
            
            Clothes: 
            <input onChange={this.handleClothes} minLength="3" maxLength="20" required="required" type="text" name="charName" placeholder="Character name"></input>

            Roleplay Que: 
            <input onChange={this.handleRP1} minLength="3" maxLength="20" required="required" type="text" name="charName" placeholder="Character name"></input>

            Intrigue: 
            <textarea onChange={this.handleIntrigue} rows="4" cols="50"></textarea>

            <button type={"button"} onClick={this.onSubmitDescInfo}>submit</button> 
         </form>
      );
   }

}

export default DescInput;
