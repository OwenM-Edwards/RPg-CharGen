import React from 'react';
import Select from 'react-select';
import LoadingIcons from '../LoadingIcons/LoadingIcons';

const optionsGender = [
   { value: 'male', label: 'Gender: Male' },
   { value: 'female', label: 'Gender: Female' },
];
const customStyles = {
   menu: (provided, state) => ({
     ...provided,
   }),
}

// Sets default values for drop down boxes
let currentGender = { value: 'male', label: 'Gender: Male' };
let currentRace = { value: 'human', label: 'Race: Human' };

class InputName extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         name: false,
         lastName:false,
         gender: 'male',
         race: 'human',
         loading:'default'
      }
      this.props.changeSubTitle('What would you like to add?')
   }

   // Removes spaces and fullstops from start and end, then sets as state
   handleName = (event) => {
      let frststr = event.target.value.split('.').join("").trim();
      this.setState({name: frststr});
   }
   handleLastName =(event)=>{
      let lststr = event.target.value.split('.').join("").trim();
      this.setState({lastName: lststr});
   }
   
   handleGender = (event) =>{
      this.setState({gender: event.value});
      currentGender.value = event.value;
      currentGender.label = 'Gender:'+event.value;
   }
   handleRace = (event)=>{
      this.setState({race: event.value});
      currentRace.value = event.value;
      currentRace.label = 'Race:'+event.value;
   }
   handleLoading=(data)=>{
      this.setState({loading: data});
   }

   handleSubmitCheck=()=>{
      if(this.state.name || this.state.lastName){
         this.onSubmitNewName();
      } 
      else if(!this.state.name && !this.state.lastName){
      }
   }

   onSubmitNewName = () => {
      // Checks if either first or last name has been added, if so add to submit
      if(this.state.name){
         var firstName = this.state.name;
      } 
      if(this.state.lastName){
         var lastName = this.state.lastName
      }
      this.handleLoading('loading')
      fetch('https://safe-dawn-37731.herokuapp.com/addname', {
         method: 'post',
         headers: {'Content-Type' : 'application/json'},
         body: JSON.stringify({
            "race": this.state.race,
            "gender": this.state.gender,
            "name":firstName,
            "lastname":lastName,
            "email":this.props.email,
            "id":this.props.id
         })
      })
      .then(response => {
         this.handleLoading('default');
         if(response.status === 200){
            this.props.modalMessageChange('Name added, thank you for your contribution!');
            this.props.openModal();
            this.setState({lastName: false});
            this.setState({name: false});
         } else{
            this.props.modalMessageChange('Error Adding Name');
            this.props.openModal();
            this.setState({lastName: false});
            this.setState({name: false});
         }
      })
      .catch(err=>{
         this.handleLoading('default')
         this.props.modalMessageChange('Error Adding Name');
         this.props.openModal();
         this.setState({lastName: false});
         this.setState({name: false});
         console.log('problemo')
      }) 
   }

   render(){
      // Enables submit buttons when submission text reaches required min length
      const isEnabled = this.state.name.length > 2 || this.state.lastName.length > 2;
      let displayName = '';
      if(this.state.loading === 'loading'){
         displayName = <LoadingIcons/>
      } else {
         displayName =
         <form className="inputNameFormContainer" id="newName" onSubmit={this.handleSubmitCheck}> 
            <div>
               <Select  className="selectContainer"
                  defaultValue={currentGender}
                  onChange={this.handleGender}
                  isSearchable={false}
                  styles={customStyles}
                  options={optionsGender}
               />
               <Select  className="selectContainer"
                  defaultValue={currentRace}
                  onChange={this.handleRace}
                  isSearchable={false}
                  styles={customStyles}
                  options={this.props.optionsRace}
               />
               <input className="inputNameField" onChange={this.handleName} minLength="3" maxLength="20" type="text" name="charName" placeholder="First name"></input>
               <input className="inputNameField" onChange={this.handleLastName} minLength="3" maxLength="20" type="text" name="charName" placeholder="Optional last name - gender neutral"></input>
               <div className="nameStandardButtonContainer">
                  <button disabled={!isEnabled} className="standardButton" type={"submit"}>Submit</button> 
               </div>
            </div>
         </form>
      }
      return (
         displayName
      );
   }
}

export default InputName;
