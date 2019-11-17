import React from 'react';
import Files from "react-butterfiles";

class InputImage extends React.Component {
   constructor(){
      super()
      this.state = {
         files:[],
         errors:[]
      }
   }

   uploadImage =() =>{
      console.log(this.state.files)
      fetch('http://localhost:3000/charimage', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        "image": this.state.files
      })
    })
    .then(response => response.json())
    .catch(err=>{
      console.log('problemo')
    })
   }

   render(){
      return (
         <div id='photo-form-container'>
            <Files
               multiple={true} 
               maxSize="2mb"
               multipleMaxSize="10mb"
               multipleMaxCount={3}
               accept={["application/pdf","image/jpg","image/jpeg"]}
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
            <button onClick={this.uploadImage}></button>
         </div>
      )
   }
}
   
export default InputImage;
