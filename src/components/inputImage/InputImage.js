import React from 'react';
import Tilt from 'react-tilt';
import LoadingIcons from '../loadingIcons/LoadingIcons';

class InputImage extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         files:[],
         errors:[],
         race:'human',
         gender:'male',
         role:'merchant',
         loading:'default',
         displayFile:null,
         previewSrc: ''
      }
   }
   handleRace = (event)=>{
      this.setState({race: event.target.value});
   }
   handleGender = (event) =>{
      this.setState({gender: event.target.value});
   }
   handleRole = (event) =>{
      this.setState({role: event.target.value});
   }
   handleLoading=(data)=>{
      this.setState({loading: data});
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
         "role":this.state.role,
         "email":this.props.email,
         "id":this.props.id
         })
      })
      .then(response => {
         this.handleLoading('default')
         if(response.status === 200){
            
            console.log('success')
         } else{
            console.log('failure')
         }
      })
      .catch(err=>{
         console.log('problemo')
      })
   }


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
      let display = '';


      if(this.state.loading === 'loading'){
         display = <LoadingIcons/>
      } else {
         display =
         <div className="imageInputContainer">
            
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
               Role:
                  <select onChange={this.handleRole}>
                     <option value = "merchant">Merchant</option>
                     <option value = "guard">Guard</option>
                     <option value = "magic">Magic User</option>
                     <option value = "hunter">Hunter</option>
                  </select>
            </form>


            <input type="file" onChange={this.handlePreview} />

            <Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} >
               <img className="imageInputPreview" src={this.state.previewSrc} alt="" />   
            </Tilt>


            
            <button className="imageSubmitButton" onClick={this.uploadImage}>Upload Image</button>
         </div>
         }
      return (
         display
      )
   }
}
   
export default InputImage;
