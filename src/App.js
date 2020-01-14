import React, {Component} from 'react';
import './App.css';
import SelectionButtons from './components/selectionButtons/SelectionButtons';
import SubmitButtons from './components/submitButtons/SubmitButtons';
import InputName from './components/inputName/InputName';
import InputImage from './components/inputImage/InputImage';
import InputDesc from './components/inputdesc/DescInput';
import CharImage from './components/charImage/CharImage';
import CharDesc from './components/charDesc/CharDesc';
import CharRoleplay from './components/charRoleplay/CharRoleplay';
import CharIntrigue from './components/charIntrigue/CharIntrigue';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import LoadingIcons from './components/loadingIcons/LoadingIcons';
import Modal from 'react-modal';

 
/* 
  TODO Make input submits direct to the temp moderation databases
  TODO Add confirmation popups to submits
  TODO CHANGED NAME DATABASES TO MIXED GENDER, NEED TO CHANGE SERVER DATABASE CALLS TO MATCH

  DONE finish updating the intrigue and roleplay submitions
  TODO finish up the imahge submissions
  TODO Standardize all the different submit button css's
*/ 

const initialState = {
  subTitle:'Who are you looking for?',
  modalIsOpen: false,
  modalMessage:'',
  loadingState:'init',
  addNewCharPage:false,
  route:'signIn',
  isSignedIn: false,
  fullRandom: true,

  charGenInfo:{
    gender:'random',
    race: 'random',
    role:'random'
  },

  newChar:{
    raceOutput:'',
    nameOutput:'',
    imageOutput: '',
    roleOutput: '',
    lastNameOutput:'',
    intrigueOutput:'',
    roleplayOutputA:'',
    roleplayOutputB:'',
    roleplayOutputC:'',
    ageOutput: ''
  },

  user:{
    id:'',
    name: '',
    email: '',
    joined: ''
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  loadUser = (data) => {
    this.setState({user: {
      id:data.id,
      name: data.name,
      email: data.email,
      joined: data.join
    }})
  }


  //HANDLES SUBMIT BUTTON

  submit = () => {
    this.setState({loadingState:'loading'})
    fetch('https://safe-dawn-37731.herokuapp.com/genchar', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        "race": this.state.charGenInfo.race,
        "gender": this.state.charGenInfo.gender,
        "role":this.state.charGenInfo.role
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({loadingState:'loaded'})
      this.setState({newChar: {
        nameOutput:data[0][0].name,
        imageOutput:data[0][0].url,
        ageOutput:Math.floor(Math.random()*data[0][0].maxage),
        lastNameOutput:data[0][0].lastname,
        intrigueOutput:data[0][0].intrigue,
        roleplayOutputA:data[1][0].roleplay,
        roleplayOutputB:data[1][1].roleplay,
        roleplayOutputC:data[1][2].roleplay,
        roleOutput:data[2],
        raceOutput:data[3],
        genderOutput:data[4], 
      }})
      if(this.state.newChar.ageOutput < 2){
        this.setState({newChar: {
          ageOutput:this.state.ageOutput+14
        }})
      } 
      else if(this.state.newChar.ageOutput < 4){
        this.setState({newChar: {
          ageOutput:this.state.ageOutput*7 
        }})
      } else if(this.state.newChar.ageOutput < 13){
        this.setState({newChar: {
          ageOutput:this.state.ageOutput*3  
        }})
      } 
    })
    .then(this.setState({
      fullRandom: false
    }))
    .then(this.setState({
      submitted: true
    }))
    .catch(err=>{
      console.log(err)
    })
  }

  //HANDLES DROP OPTIONS CHANGES
  handleGenderChange = (event) => {
    this.setState({charGenInfo:{gender: event.value}});
  }
  handleRaceChange = (event) => {
    this.setState({charGenInfo:{race: event.value}});
  }
  handleRoleChange = (event) => {
    this.setState({charGenInfo:{role: event.value}});
  }
  routeChange = (newRoute) =>{
    if(newRoute){
      this.setState({route:newRoute})
    } else{
      this.setState({route:'home'})
    }   
  }
  changeSubTitle = (data)=>{
    this.setState({subTitle:data})
  }
  returnFromInput=()=>{
    this.setState({subTitle:'Who are you looking for?'})
    this.setState({route:'home'})
  }

  // MODALSTUFF
  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#fff';
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  modalMessageChange=(data)=>{
    this.setState({modalMessage:data});
  }



  render() {
    const {modalMessage,subTitle,isSignedIn,route,loadingState} = this.state;
    let modalBox = 
    <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      className="Modal"
      >
      <button className="ModalButton" onClick={this.closeModal}>X</button>
      <h2 className="ModalText" ref={subtitle => this.subtitle = subtitle}>{this.state.modalMessage}</h2>
      
    </Modal>
    let displayStateImg = <div className="OutputImage"><CharImage imageOutput={this.state.newChar.imageOutput} loadingState={loadingState} /></div>;
    let displayStateDesc = <div className="OutputDesc"><CharDesc nameOutput={this.state.newChar.nameOutput} roleOutput ={this.state.newChar.roleOutput}  lastNameOutput={this.state.newChar.lastNameOutput} loadingState={loadingState} ageOutput={this.state.newChar.ageOutput} raceOutput={this.state.newChar.raceOutput}  /></div>;
    let displayStateRoleplay = <div className="OutputRoleplay"><CharRoleplay roleplayOutputA={this.state.newChar.roleplayOutputA} roleplayOutputB={this.state.newChar.roleplayOutputB} roleplayOutputC={this.state.newChar.roleplayOutputC} loadingState={loadingState} /></div>
    let displayStateIntrigue = <div className="OutputIntrigue"><CharIntrigue intrigueOutput={this.state.newChar.intrigueOutput} loadingState={loadingState} /></div>
    window.onload = function(){
      fetch('https://safe-dawn-37731.herokuapp.com/', {
        method: 'get',
        headers: {'Content-Type' : 'application/json'},
      })
      .then(response => console.log('server up'))
      .catch(error => console.log('server down'))
    }


    return (
      <div  className="App">
        <div className="titleContainer">
          <h1>The RPG-NPC character generator</h1>
          <h2>{subTitle}</h2>
        </div>


          { route === 'register' ? (
            <div className="main">
              <div className="sidebarContainer">
                  <SelectionButtons handleGenderChange={this.handleGenderChange} handleRaceChange={this.handleRaceChange} handleRoleChange={this.handleRoleChange}/>
                  <SubmitButtons submit={this.submit} fullRandom={this.state.fullRandom} submitted={this.state.submitted} />
                  <div className="signInButtonContainer">
                    <button  className="signInButton" onClick={()=> this.routeChange('home')}>Back to main page</button>
                  </div>
              </div>
              
              <Register openModal={this.openModal} modalMessageChange={this.modalMessageChange} changeSubTitle={this.changeSubTitle} inputLoadingState={this.state.inputLoadingState} handleInputLoadingState={this.handleInputLoadingState} loadUser={this.loadUser} routeChange={this.routeChange}/>
            </div>
          ) 


          : (
          route === 'signIn' ? (
            <div  className="main">
              {modalBox}
              <div className="sidebarContainer">
                <div className="signInButtonContainer">
                  <button  className="signInButton" onClick={()=> this.routeChange('home')}>Back to main page</button>
                </div>
              </div>

              <Signin openModal={this.openModal} modalMessageChange={this.modalMessageChange} isSignedIn={isSignedIn} changeSubTitle={this.changeSubTitle} inputLoadingState={this.state.inputLoadingState} handleInputLoadingState={this.handleInputLoadingState} loadUser={this.loadUser} routeChange={this.routeChange}/>
            </div>
          ) 


          : (
          route === 'input' ? (
            <div className="main">
              {modalBox}

              <div className="sidebarContainer">
                <div className="submitButtonContainer">
                  <button  className="submit" onClick={()=> this.returnFromInput()}>Return to generator</button>
                </div>
              </div>

              <div className="inputContainer">
                <div className="nameAndImageContainer">
                  <div className="inputName">
                    <InputName modalMessageChange={this.modalMessageChange} id={this.state.user.id} email={this.state.user.email} openModal={this.openModal}/>
                  </div>

                  <div className="inputImage">
                    <InputImage openModal={this.openModal} modalMessageChange={this.modalMessageChange} id={this.state.user.id} email={this.state.user.email}/>
                  </div>
                </div>

                <div className="roleplayAndIntrigueContainer">
                  <div className="inputDesc">
                    <InputDesc openModal={this.openModal} modalMessageChange={this.modalMessageChange} id={this.state.user.id} email={this.state.user.email}/>
                  </div>
                </div>
              </div>
            </div>
          ) 

          : (
            <div className="main">
              <div className="sidebarContainer">
                <SelectionButtons handleGenderChange={this.handleGenderChange} handleRaceChange={this.handleRaceChange} handleRoleChange={this.handleRoleChange}/>
                <SubmitButtons submit={this.submit} fullRandom={this.state.fullRandom} submitted={this.state.submitted} />
                <div className="signInButtonContainer">
                  <button  className="signInButton" onClick={()=> this.routeChange('signIn')}>Sign in to add your own!</button>
                </div>
              </div>
                { loadingState === 'loading' ? (
                  <div className="outputContainer">
                    <LoadingIcons/>
                  </div>
                ) : (
                  <div className="outputContainer">
                    {displayStateDesc}
                    {displayStateImg}
            
                    {displayStateRoleplay}
                    {displayStateIntrigue}
                  </div>
                )}
            </div>
          )))}
        </div>
    );
  }
}

export default App;
