import React, {Component} from 'react';
import './App.css';
import SelectionButtons from './components/selectionButtons/SelectionButtons';
import InfoCards from './components/infoCards/InfoCards';
import SubmitButtons from './components/submitButtons/SubmitButtons';

const initialState = {
  submitted: false,
  fullRandom: true,
  role:'',
  race: '',
  system: '',
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  submit = () => {
    this.setState({
      submitted: true
    });
  }


  render() {
    const { role, race, system, fullRandom, submitted } = this.state;
    return (
      <div className="App">
        <h1>The RPG character generator</h1>
        <h2>Who are you looking for?</h2>

        <SelectionButtons role={this.state.role} race={this.state.race} system={this.state.system}/>
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
