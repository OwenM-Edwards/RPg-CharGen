import React, {Component} from 'react';
import './App.css';
import SelectionButtons from './components/selectionButtons/SelectionButtons';
import SubmitButtons from './components/submitButtons/SubmitButtons';
import InputName from './components/inputName/InputName';
import InputImage from './components/inputImage/InputImage';
import InputDesc from './components/descInput/DescInput';
import AddOwnButton from './components/addOwnButton/AddOwnButton';
import CharImage from './components/charImage/CharImage';
import CharDesc from './components/charDesc/CharDesc';
import CharRoleplay from './components/charRoleplay/CharRoleplay';
import CharIntrigue from './components/charIntrigue/CharIntrigue';


 


const initialState = {
  fullRandom: true,
  gender:'random',
  genderOutput:'',
  race: 'random',
  raceOutput:'',
  system: 'Random',
  nameOutput:'',
  imageOutput: '',
  statsOutput:'',
  role:'random',
  roleOutput: '',
  ageOutput: '',
  lastNameOutput:'',
  display:'init',
  intrigueOutput:'',
  roleplayOutputA:'',
  roleplayOutputB:'',
  roleplayOutputC:'',
  addNewCharPage:false
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }


  //HANDLES SUBMIT BUTTON

  submit = () => {

    this.setState({display:'loading'})
    fetch('http://localhost:3000/genchar', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        "race": this.state.race,
        "gender": this.state.gender,
        "role":this.state.role
      })
    })
    .then(response => response.json())
    .then(data => {
      
      this.setState({display:'loaded'})
      this.setState({nameOutput:data[0][0].name})
      this.setState({imageOutput:data[1][0].url})
      this.setState({
        ageOutput:Math.floor(Math.random()*data[2][0].maxage)
      })
      this.setState({lastNameOutput:data[3][0].lastname})
      this.setState({intrigueOutput:data[4][0].intrigue})
      this.setState({roleplayOutputA:data[5][0].roleplay})
      this.setState({roleplayOutputB:data[5][1].roleplay})
      this.setState({roleplayOutputC:data[5][2].roleplay})
      this.setState({roleOutput:data[6]})
      
      this.setState({raceOutput:data[7]})
      this.setState({genderOutput:data[8]})
      if(this.state.ageOutput < 2){
        this.setState({
          ageOutput:this.state.ageOutput+14
        })
      } 
      else if(this.state.ageOutput < 4){
        this.setState({
          ageOutput:this.state.ageOutput*7
          
        })
      } else if(this.state.ageOutput < 13){
        this.setState({
          ageOutput:this.state.ageOutput*3
          
        })
      } 
      
    })
    .then(this.setState({
      fullRandom: false
    }))
    .then(this.setState({
      submitted: true
    }))
    .catch(err=>{
      console.log('problemo')
    })
  }

  //HANDLES DROP OPTIONS CHANGES
  handleGenderChange = (event) => {
    this.setState({gender: event.value});

  }
  handleRaceChange = (event) => {
    this.setState({race: event.value});
  }
  handleRoleChange = (event) => {
    this.setState({role: event.value});
  }
  changeMain = () =>{
    if(this.state.addNewCharPage){
      this.setState({addNewCharPage:false})
    } else {
      this.setState({addNewCharPage:true})
    }
    
  }

  render() {
    const {intrigueOutput, roleplayOutputA, roleplayOutputB, roleplayOutputC, display, nameOutput, imageOutput, ageOutput,raceOutput,lastNameOutput,roleOutput,genderOutput } = this.state;
    var displayStateDesc;
    var displayStateImg;
    var displayStateRoleplay;
    var displayStateIntrigue;
    displayStateImg = <div className="OutputImage"><CharImage imageOutput={imageOutput} display={display} /></div>;
    displayStateDesc = <div className="OutputDesc"><CharDesc roleOutput ={roleOutput} nameOutput={nameOutput} lastNameOutput={lastNameOutput} display={display} ageOutput={ageOutput} roleOutput={roleOutput} raceOutput={raceOutput}  /></div>;
    displayStateRoleplay = <div className="OutputRoleplay"><CharRoleplay roleplayOutputA={roleplayOutputA} roleplayOutputB={roleplayOutputB} roleplayOutputC={roleplayOutputC} display={display} /></div>
    displayStateIntrigue = <div className="OutputIntrigue"><CharIntrigue intrigueOutput={intrigueOutput} display={display} /></div>

    if(this.state.addNewCharPage){
      var displayMainPage = 
      <div className="main">
        <div className="sidebarContainer">
          <div className="submitButtonContainer">
            <button  className="submit" onClick={this.changeMain}>Return to generator</button>
          </div>
        </div>
        <div className="inputContainer">

          <div className="inputName">
            <InputName/>
          </div>

          <div className="inputImage">
            <InputImage/>
          </div>
            
          <div className="inputDesc">
            <InputDesc/>
          </div>
          
        </div>
      </div> 

      var subTitle =
      <h2>What would you like to add?</h2>
      
    } else {
      var displayMainPage = 
      <div className="main">
        <div className="sidebarContainer">
          <SelectionButtons handleGenderChange={this.handleGenderChange} handleRaceChange={this.handleRaceChange} handleRoleChange={this.handleRoleChange}/>
          <SubmitButtons submit={this.submit} fullRandom={this.state.fullRandom} submitted={this.state.submitted} />
          <AddOwnButton changeMain={this.changeMain}/>
        </div>
  
        <div className="outputContainer">
          {displayStateDesc}
          {displayStateImg}
  
          {displayStateRoleplay}
          {displayStateIntrigue}
        </div>
      </div>

      var subTitle =
      <h2>Who are you looking for?</h2>
    }
    
    
    


    return (
      <div  className="App">
            <div className="titleContainer">
              <h1>The RPG NPC character generator</h1>
              {subTitle}
            </div>
            {displayMainPage}
      </div>
    );
  }
}

export default App;
