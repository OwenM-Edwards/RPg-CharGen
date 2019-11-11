import React, {Component} from 'react';
import './App.css';
import SelectionButtons from './components/selectionButtons/SelectionButtons';
import InfoCards from './components/infoCards/InfoCards';
import SubmitButtons from './components/submitButtons/SubmitButtons';

const initialState = {
  submitted: false,
  fullRandom: true,
  role:'Random',
  race: 'Random',
  system: 'Random',
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  //HANDLES SUBMIT BUTTON
  submit = () => {
    this.setState({
      submitted: true
    });
    console.log(this.state.role);
    console.log(this.state.race);
    console.log(this.state.system);
  }

  //HANDLES DROP OPTIONS CHANGES
  handleRoleChange = (event) => {
    this.setState({role: event.target.value});
  }
  handleRaceChange = (event) => {
    this.setState({race: event.target.value});
  }
  handleSystemChange = (event) => {
    this.setState({system: event.target.value});
  }


  render() {
    const { role, race, system, fullRandom, submitted } = this.state;
    return (
      <div className="App">
        <h1>The RPG character generator</h1>
        <h2>Who are you looking for?</h2>

        <SelectionButtons handleRaceChange={this.handleRaceChange} handleSystemChange={this.handleSystemChange} handleRoleChange={this.handleRoleChange}/>
        <SubmitButtons submit={this.submit} fullRandom={this.state.fullRandom} submitted={this.state.submitted}/>
        { submitted === true
          ? <InfoCards role={this.state.role} race={this.state.race} system={this.state.system}/>
          : <div></div>
        }
      
      </div>
    );
  }
}

export default App;
