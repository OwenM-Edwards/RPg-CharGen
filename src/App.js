import React, {Component} from 'react';
import './App.css';
import SelectionButtons from './components/selectionButtons/SelectionButtons';
import SubmitButtons from './components/submitButtons/SubmitButtons';
// import InputName from './components/inputName/InputName';
// import InputImage from './components/inputImage/InputImage';
// import InputDesc from './components/descInput/DescInput';
import AddOwnButton from './components/addOwnButton/AddOwnButton';
import CharImage from './components/charImage/CharImage';
import CharDesc from './components/charDesc/CharDesc';
import CharRoleplay from './components/charRoleplay/CharRoleplay';
import CharIntrigue from './components/charIntrigue/CharIntrigue';


 


const initialState = {
  fullRandom: true,
  gender:'male',
  race: 'human',
  system: 'Random',
  nameOutput:'',
  imageOutput: '',
  statsOutput:'',
  role:'merchant',
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
      console.log(data)
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
    this.setState({gender: event.target.value});
  }
  handleRaceChange = (event) => {
    this.setState({race: event.target.value});
  }
  handleSystemChange = (event) => {
    this.setState({system: event.target.value});
  }
  handleRoleChange = (event) => {
    this.setState({role: event.target.value});
  }

  changeToAddCharScreen = () =>{
    this.setState({addNewCharPage:true})
  }

  render() {
    const {intrigueOutput, roleplayOutputA, roleplayOutputB, roleplayOutputC, display, nameOutput, imageOutput, ageOutput,role,race,lastNameOutput } = this.state;
    var displayStateDesc;
    var displayStateImg;
    var displayStateRoleplay;
    var displayStateIntrigue;
    displayStateImg = <div className="OutputImage"><CharImage imageOutput={imageOutput} display={display} /></div>;
    displayStateDesc = <div className="OutputDesc"><CharDesc nameOutput={nameOutput} lastNameOutput={lastNameOutput} display={display} ageOutput={ageOutput} role={role} race={race}  /></div>;
    displayStateRoleplay = <div className="OutputRoleplay"><CharRoleplay roleplayOutputA={roleplayOutputA} roleplayOutputB={roleplayOutputB} roleplayOutputC={roleplayOutputC} display={display} /></div>
    displayStateIntrigue = <div className="OutputIntrigue"><CharIntrigue intrigueOutput={intrigueOutput} display={display} /></div>

      // displayStateImg = <div className="loadedOutputImage"><CharImage imageOutput={imageOutput} display={display}/></div>;
      // displayStateDesc = <div className="loadedOutputDesc"><CharDesc nameOutput={nameOutput} lastNameOutput={lastNameOutput} display={display} ageOutput={ageOutput} role={role} race={race}  /></div>;
      // displayStateRoleplay = <div className="loadedOutputRoleplay"><CharRoleplay roleplayOutput={roleplayOutput} display={display} /> </div>
      // displayStateIntrigue = <div className="loadedOutputIntrigue"><CharIntrigue intrigueOutput={intrigueOutput} display={display} /> </div>
    


    return (
      <div  className="App">
            <div className="titleContainer">
              <h1>The RPG character generator</h1>
              <h2>Who are you looking for?</h2>
            </div>
            <div className="main">
              <div className="sidebarContainer">
                <SelectionButtons handleRoleChange={this.handleRoleChange} handleRaceChange={this.handleRaceChange} handleSystemChange={this.handleSystemChange} handleGenderChange={this.handleGenderChange}/>
                <SubmitButtons submit={this.submit} fullRandom={this.state.fullRandom} submitted={this.state.submitted} />
                <AddOwnButton/>
              </div>

              <div className="outputContainer">
                {displayStateDesc}
                {displayStateImg}

                {displayStateRoleplay}
                {displayStateIntrigue}
              </div>

              {/* <div className="inputContainer">
                <InputName/>
                <InputImage/>
                <InputDesc/>
              </div> */}
            </div>
      </div>
    );
  }
}

export default App;
