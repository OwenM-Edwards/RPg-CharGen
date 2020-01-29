import React from 'react';
import LoadingIcons from '../LoadingIcons/LoadingIcons';
import Select from 'react-select';

const optionsGender = [
   { value: 'male', label: 'Gender: Male' },
   { value: 'female', label: 'Gender: Female' },
];
const customStyles = {
   menu: (provided, state) => ({ 
     ...provided,
   }),
}
// Sets default options for drop boxes
let currentGender = { value: 'male', label: 'Gender: Male' };
let currentRace = { value: 'human', label: 'Race: Human' };

class InputImage extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         files:[],
         errors:[],
         race:'human',
         gender:'male',
         loading:'default',
         displayFile:null,
         previewSrc: ''
      }
   }
   handleRaceChange = (event)=>{
      this.setState({race: event.value});
      currentRace.value = event.value;
      currentRace.label = 'Race:'+event.value;
   }
   handleGenderChange = (event) =>{
      this.setState({gender: event.value});
      currentGender.value = event.value;
      currentGender.label = 'Gender:'+event.value;
   }
   handleLoading=(data)=>{
      this.setState({loading: data});
   }
   // Checks if an image is ready to submit
   handleSubmitCheck=()=>{
      if(this.state.previewSrc){
         this.uploadImage();
      } 
      else{
      }
   }

   uploadImage =() =>{
      this.handleLoading('loading')
      fetch('https://safe-dawn-37731.herokuapp.com/charimage', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
         body: JSON.stringify({
         "image": this.state.previewSrc,
         "gender":this.state.gender,
         "race":this.state.race,
         "email":this.props.email,
         "id":this.props.id
         })
      })
      .then(response => {
         this.handleLoading('default')
         if(response.status === 200){
            this.props.modalMessageChange('Image added, thank you for your contribution!');
            this.props.openModal();
         } else{
            this.props.modalMessageChange('Error Adding Image');
            this.props.openModal();
         }
      })
      .catch(err=>{
         this.handleLoading('default')
         this.props.modalMessageChange('Error Adding Name');
         this.props.openModal();
      })
   }

   // Displays user selected image for preview before submission
   handlePreview = (data) => {
      data.preventDefault();
      let file = data.target.files[0];
      let reader = new FileReader();
      if (data.target.files.length === 0) {
        return;
      }
      reader.onloadend = (data) => {
         this.setState({
           previewSrc: [reader.result]
         });
      }
      reader.readAsDataURL(file);
   }

   render(){
      const isEnabled = this.state.previewSrc;
      let display = '';
      if(this.state.loading === 'loading'){
         display = <LoadingIcons/>
      } else {
         display =
            <form className="newImageSelectContainer">
               <div>
                  <Select  className="selectContainer"
                     defaultValue={currentGender}
                     onChange={this.handleGenderChange}
                     isSearchable={false}
                     styles={customStyles}
                     options={optionsGender}
                  />
                  <Select  className="selectContainer"
                     defaultValue={currentRace}
                     onChange={this.handleRaceChange}
                     isSearchable={false}
                     styles={customStyles}
                     options={this.props.optionsRace}
                  />
               </div>
            <div className="imageSubmitBox">
               <div className="imageButtonContainer">
                  <div className="imageButtonBox">
                     <input className="hiddenFileInput" id="file" type="file" onChange={this.handlePreview} />
                     <label htmlFor="file" className="imageButtonLabel" >
                     <div>Select Image</div>
                     </label>
                     
                  </div>

                  <div className="imageButtonBox">
                     <button disabled={!isEnabled}  className="standardButton" onClick={this.handleSubmitCheck}>Upload Image</button>
                  </div>
               </div>
               
            </div>
            <img className="imageInputPreview" src={this.state.previewSrc} alt="" />   
         </form>
         }
         
      return (
         display
      )
   }
}
   
export default InputImage;
