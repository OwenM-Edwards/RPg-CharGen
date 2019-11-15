import React, {Component} from 'react';
import './App.css';
import SelectionButtons from './components/selectionButtons/SelectionButtons';
import InfoCards from './components/infoCards/InfoCards';
import SubmitButtons from './components/submitButtons/SubmitButtons';

const initialState = {
  submitted: false,
  fullRandom: true,
  gender:'male',
  race: 'nameshuman',
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
    .then(response => this.setState({nameOutput:response[0].male}))
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

  test=()=>{
    console.log(this.state.nameOutput)
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

        <SelectionButtons handleRaceChange={this.handleRaceChange} handleSystemChange={this.handleSystemChange} handleRoleChange={this.handleRoleChange}/>
        <SubmitButtons submit={this.submit} fullRandom={this.state.fullRandom} submitted={this.state.submitted} test={this.test}/>
        { submitted === true
          ? <InfoCards nameOutput={this.state.nameOutput}/>
          : <div></div>
        }
      
      </div>
    );
  }
}

export default App;
