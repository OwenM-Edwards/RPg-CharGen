import React from 'react';
import Files from "react-butterfiles";

class InputImage extends React.Component {
   constructor(){
      super()
      this.state = {
         files:[],
         errors:[],
         race:'human',
         gender:'male',
         role:'merchant'
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
   uploadImage =() =>{
      console.log(this.state)
      fetch('http://localhost:3000/charimage', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        "image": this.state.files,
        "gender":this.state.gender,
        "race":this.state.race,
        "role":this.state.role
      })
    })
    .then(response => response.json())
    .catch(err=>{
      console.log('problemo')
    })
   }

   render(){
      return (
         
         <div>
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
            <Files
               multiple={false} 
               maxSize="60mb"
               accept={["application/pdf","image/jpg","image/jpeg", "image/png"]}
               onSuccess={files => this.setState({ files })}
               onError={errors => this.setState({ errors })}
               convertToBase64={true}
            >
            {({ browseFiles, getDropZoneProps }) => (
               <>
               <div {...getDropZoneProps({ className: "myDropZone" })}/>
               <button onClick={browseFiles}>Select files...</button>
               <ol>
                  {this.state.files.map(file => (
                     <li key={file.name}>{file.name}</li>
                  ))}
                  {this.state.errors.map(error => (
                     <li key={error.file.name}>
                     {error.file.name} - {error.type}
                     </li>
                  ))}
               </ol>
               </>
            )}
            </Files>
            <button onClick={this.uploadImage}>Upload Image</button>
         </div>
      )
   }
}
   
export default InputImage;
