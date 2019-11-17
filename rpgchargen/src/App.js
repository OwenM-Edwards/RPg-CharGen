import React, {Component} from 'react';
import './App.css';
import SelectionButtons from './components/selectionButtons/SelectionButtons';
import InfoCards from './components/infoCards/InfoCards';
import SubmitButtons from './components/submitButtons/SubmitButtons';
import InputName from './components/inputName/InputName'
import InputImage from './components/inputImage/InputImage'



const initialState = {
  submitted: false,
  fullRandom: true,
  gender:'',
  race: '',
  system: 'Random',
  nameOutput:'',
  imageOutput: '',
  statsOutput:''
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }


  //HANDLES SUBMIT BUTTON

  submit = () => {
    fetch('http://localhost:3000/genchar', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        "race": this.state.race,
        "gender": this.state.gender
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({nameOutput:data[1][0].name})
      this.setState({imageOutput:data[0][0].url})
      
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


  render() {
    const {submitted } = this.state;
    return (
      <div className="App">
        <h1>The RPG character generator</h1>
        <h2>Who are you looking for?</h2>

        <SelectionButtons handleRaceChange={this.handleRaceChange} handleSystemChange={this.handleSystemChange} handleGenderChange={this.handleGenderChange}/>
        <SubmitButtons submit={this.submit} fullRandom={this.state.fullRandom} submitted={this.state.submitted} />
        { submitted === true
          ? <InfoCards imageOutput={this.state.imageOutput} nameOutput={this.state.nameOutput}/>
          : <div></div>
        }
        <InputName/>
        <InputImage/>

        

      
      </div>
    );
  }
}

export default App;
