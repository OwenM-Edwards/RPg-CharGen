import React from 'react';
import Select from 'react-select';
import LoadingIcons from '../loadingIcons/LoadingIcons';

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
   constructor(props){
      super(props)
      this.state = {
         name: '',
         lastName:'',
         gender: 'male',
         race: 'human',
         loading:'default'
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
            } else{
               this.props.modalMessageChange('Error Adding Name');
               this.props.openModal();
            }
         })
         
         .catch(err=>{
            this.handleLoading('default')
            this.props.modalMessageChange('Error Adding Name');
            this.props.openModal();
            console.log('problemo')
         }) 
   }


   render(){
      const isEnabled = this.state.name.length > 0 || this.state.lastName.length > 0;
      let displayName = '';
      if(this.state.loading === 'loading'){
         displayName = <LoadingIcons/>
      } else {
         displayName =
         <form className="inputNameFormContainer" id="newName" onSubmit={this.handleSubmitCheck}> 
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
