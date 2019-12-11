import React from 'react';
import Select from 'react-select';

const optionsGender = [
   { value: 'male', label: 'Gender: Male' },
   { value: 'female', label: 'Gender: Female' },
];
const optionsRace = [
   { value: 'human', label: 'Race: Human' },
   { value: 'orc', label: 'Race: Orc' },
];
const customStyles = {
   menu: (provided, state) => ({
     ...provided,
   }),
}

class InputName extends React.Component {
   constructor(){
      super()
      this.state = {
         name: '',
         lastName:'',
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
   handleLastName =(event)=>{
      let str = event.target.value.replace(/\s+/g, '');
      this.setState({lastName: str});

   }
   handleRace = (event)=>{
      this.setState({race: event.target.value});
   }
   onSubmitNewName = () => {
      if(this.state.name){
         var firstName = this.state.name;
      } 
      if(this.state.lastName){
         var lastName = this.state.lastName
      }
      
      fetch('http://localhost:3000/addname', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
               "race": this.state.race,
               "gender": this.state.gender,
               "name":firstName,
               "lastname":lastName
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


   render(){
      return (
         <form id="newName">
            Add new character name: 
            <div>
               <Select  className="selectContainer"
                  defaultValue={optionsGender[0]}
                  onChange={this.props.handleGenderChange}
                  isSearchable={false}
                  styles={customStyles}
                  options={optionsGender}
               />
               <Select  className="selectContainer"
                  defaultValue={optionsRace[0]}
                  onChange={this.props.handleGenderChange}
                  isSearchable={false}
                  styles={customStyles}
                  options={optionsRace}
               />
               <input className="inputField" onChange={this.handleName} minLength="3" maxLength="20" type="text" name="charName" placeholder="First name"></input>
               <input className="inputField" onChange={this.handleLastName} minLength="3" maxLength="20" type="text" name="charName" placeholder="Optional last name"></input>
               <button className="inputSubmit" type={"button"} onClick={this.onSubmitNewName}>submit</button> 
            </div>
         </form>
      );
   }

}

export default InputName;
