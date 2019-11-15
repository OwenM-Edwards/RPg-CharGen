import React from 'react';
import './inputName.css'


class InputName extends React.Component {
   constructor(){
      super()
      this.state = {
         name: '',
         gender: 'male',
         race: 'human'
      }
   }

   handleGender = (event) =>{
      this.setState({gender: event.target.value});
   }
   handleName = (event) => {
      let str = event.target.value.replace(/\s+/g, '');
      this.setState({name: str});
   }
   handleRace = (event)=>{
      this.setState({race: event.target.value});
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
               "name":this.state.name
            })
         })

         .then(response => response.json())
         .then(status => {
            if(status === 'Success'){
               console.log('Name added')
            } else if(status === 'duplicate'){
               console.log('Duplicate Name')
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
            Gender: 
               <select onChange={this.handleGender}>
                  <option value = "male">Male</option>
                  <option value = "female">Female</option>
               </select>
            Race: 
               <select onChange={this.handleRace}>
                  <option value = "human">Human</option>
                  <option value = "orc">Orc</option>
               </select>
            Character Name: 
               <input onChange={this.handleName} minLength="3" maxLength="20" required="required" type="text" name="charName" placeholder="Character name"></input>

            <button type={"button"} onClick={this.onSubmitNewName}>submit</button> 
         </form>
      );
   }

}

export default InputName;
