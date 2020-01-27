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
import UserHomePage from './components/userHomePage/UserHomePage';
import SignedUserTab from './components/signedUserTab/SignedUserTab';

 
/* 
  TODO Make input submits direct to the temp moderation databases
  TODO Add confirmation popups to submits
  TODO CHANGED NAME DATABASES TO MIXED GENDER, NEED TO CHANGE SERVER DATABASE CALLS TO MATCH

  DONE finish updating the intrigue and roleplay submitions
  TODO finish up the imahge submissions
  TODO Standardize all the different submit button css's
*/ 

const initialState = {
  route:'main',

  subTitle:'Who are you looking for?',
  modalIsOpen: false,
  modalMessage:'',
  loadingState:'init',
  addNewCharPage:false,
  isSignedIn: false,
  fullRandom: true,

  charGenInfo:{
    gender:'random',
    race: 'random'
  },
  optionsRace:[
    { value: 'human', label: 'Race: Human' },
    { value: 'orc', label: 'Race: Orc' },
    { value: 'elf', label: 'Race: Elf' },
    { value: 'halfling', label: 'Race: Halfling' },
  ],

  newChar:{
    raceOutput:'',
    nameOutput:'',
    imageOutput: '',
    interestOutput: '',
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
        "gender": this.state.charGenInfo.gender
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
        interestOutput:data[2],
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

  //Changes state if user is signed in or out
  handleSignIn=(signInStatus)=>{
    this.setState({isSignedIn:signInStatus})
  }
  //HANDLES DROP OPTIONS CHANGES
  handleGenderChange = (event) => {
    this.setState({charGenInfo:{gender: event.value}});
  }
  handleRaceChange = (event) => {
    this.setState({charGenInfo:{race: event.value}});
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
    const {subTitle,isSignedIn,route,loadingState,user} = this.state;
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
    let displayStateDesc = <div className="OutputDesc"><CharDesc nameOutput={this.state.newChar.nameOutput} interestOutput={this.state.newChar.interestOutput}  lastNameOutput={this.state.newChar.lastNameOutput} loadingState={loadingState} ageOutput={this.state.newChar.ageOutput} raceOutput={this.state.newChar.raceOutput}  /></div>;
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
                <div className="sidebarButtonContainer">
                  <div className="signInSidebarStandardButtonContainer">
                    <button  className="standardButton" onClick={()=> this.routeChange('home')}>Back to main page</button>
                  </div>
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
                <div className="sidebarButtonContainer">
                <div className="signInSidebarStandardButtonContainer">
                  <button  className="standardButton" onClick={()=> this.routeChange('home')}>Back to main page</button>
                </div>
                </div>
              </div>
              <Signin handleSignIn={this.handleSignIn} openModal={this.openModal} modalMessageChange={this.modalMessageChange} isSignedIn={isSignedIn} changeSubTitle={this.changeSubTitle} inputLoadingState={this.state.inputLoadingState} handleInputLoadingState={this.handleInputLoadingState} loadUser={this.loadUser} routeChange={this.routeChange}/>
            </div>
          )
          

          : (
            route === 'homepage' ? (
            <div className="main">
              <div className="sidebarContainer">
                <div className="sidebarButtonContainer">
                  <div className="homepageSidebarStandardButtonContainer">
                    <button  className="standardButton" onClick={()=> this.routeChange('input')}>Add your own!</button>
                  </div>
                  <div className="homepageSidebarStandardButtonContainer">
                    <button  className="standardButton" onClick={()=> {this.routeChange('home');this.changeSubTitle('Who are you looking for?');}}>Back to main page</button>
                  </div>
                </div>
              </div>
              <div className="outputContainer">
                <UserHomePage changeSubTitle={this.changeSubTitle} user={user}/>
              </div>
              
            </div>
          ) 


          : (
          route === 'input' ? (
            <div className="main">
              {modalBox}
              <div className="sidebarContainer">
                <div className="sidebarButtonContainer">
                  <div className="inputSidebarStandardButtonContainer">
                    <button  className="standardButton" onClick={()=> this.routeChange('homepage')}>View your submissions</button>
                  </div>
                  <div className="inputSidebarStandardButtonContainer">
                    <button  className="standardButton" onClick={()=> {this.routeChange('main');this.changeSubTitle('Who are you looking for?');}}>Return to generator</button>
                  </div>
                </div>
              </div>
              <div className="inputContainer">
                  <div className="inputNameContainer">
                    <InputName optionsRace={this.state.optionsRace} changeSubTitle={this.changeSubTitle} modalMessageChange={this.modalMessageChange} id={this.state.user.id} email={this.state.user.email} openModal={this.openModal}/>
                  </div>
                  <div className="inputImageContainer">
                    <InputImage optionsRace={this.state.optionsRace} openModal={this.openModal} modalMessageChange={this.modalMessageChange} id={this.state.user.id} email={this.state.user.email}/>
                  </div>
                <div className="roleplayAndIntrigueContainer">
                    <InputDesc openModal={this.openModal} modalMessageChange={this.modalMessageChange} id={this.state.user.id} email={this.state.user.email}/>
                </div>
              </div>
            </div>
          ) 


          : (
            <div className="main">
              <div className="sidebarContainer">
                {/* <SignedUserTab isSignedIn={isSignedIn} user={user}/> */}
                <div className="sidebarSelectionContainer">
                  <SelectionButtons optionsRace={this.state.optionsRace} handleGenderChange={this.handleGenderChange} handleRaceChange={this.handleRaceChange} />
                </div>
                
                <div className="sidebarButtonContainer">
                  <div className="standardButtonContainer">
                    { this.state.fullRandom === true
                      ? <button  className="standardButton" onClick={this.submit}>Suprise me!</button>
                      : <button className="standardButton" onClick={this.submit}>Make another NPC</button>
                    }
                  </div>
                  <div className="standardButtonContainer">
                    <button  className="standardButton" onClick={()=> {this.routeChange('signIn');this.changeSubTitle('');}}>Sign in to add your own!</button>
                  </div>
                </div>
              </div>
                { loadingState === 'loading' ? (
                  <div className="outputContainer">
                    <LoadingIcons/>
                  </div>
                ) : (
                  <div className="outputContainer">
                    <div className="charOutputItems">
                      {displayStateDesc}
                      {displayStateImg}
              
                      {displayStateRoleplay}
                      {displayStateIntrigue}
                    </div>
                  </div>
                )}
            </div>
          ))))}
        </div>
    );
  }
}

export default App;
