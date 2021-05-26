export function fetchGenChar = () => {
   fetch('https://safe-dawn-37731.herokuapp.com/genchar', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
         "race": this.state.charGenrace,
         "gender": this.state.charGengender
      })
   })
   .then(response => response.json())
   .then(data => {
   if(data[4]===true){
      data[4]='male'
   } else{
      data[4]='female'
   }
   this.setState({loadingState:'loaded'})
   this.setState({newChar: {
      nameOutput:data[0][0].name,
      imageOutput:data[0][0].url,
      lastNameOutput:data[0][0].lastname,
      intrigueOutput:data[0][0].intrigue,
      roleplayOutputA:data[1][0].roleplay,
      roleplayOutputB:data[1][1].roleplay,
      roleplayOutputC:data[1][2].roleplay,
      raceOutput:data[3],
      genderOutput:data[4]
   }})
   
   })
   .then(this.setState({
      genNewChar: false
   }))
   .then(this.setState({
      submitted: true
   }))
   .catch(err=>{
      console.log(err)
   })
}