import React, {Component} from 'react';
import './App.css';
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
// import SignedUserTab from './components/signedUserTab/SignedUserTab';
import Select from 'react-select';
 
const initialState = {
  route:'main',
  subTitle:'Who are you looking for?',

  modalIsOpen: false,
  modalMessage:'',

  // Used to active loading icon
  loadingState:'init',

  isSignedIn: false,

  // Used to change generate char button text
  genNewChar: true,
  
  charGenrace: 'random',
  charGengender:'random',

  optionsGender:[
    { value: 'random', label: 'Random Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ],
  optionsRace:[
    { value: 'random', label: 'Random Race' },
    { value: 'human', label: 'Human' },
    { value: 'orc', label: 'Orc' },
    { value: 'elf', label: 'Elf' },
    { value: 'halfling', label: 'Halfling' },
    { value: 'dwarf', label: 'Dwarf' },
  ],

  // Character returned from server
  newChar:{
    raceOutput:'',
    nameOutput:'',
    imageOutput: '',
    lastNameOutput:'',
    intrigueOutput:'',
    roleplayOutputA:'',
    roleplayOutputB:'',
    roleplayOutputC:'',
    genderOutput:''
  },

  user:{
    id:'',
    name: '',
    email: ''
  },

  // Submission selected for edit or delete
  selectedUserSub:{
    type:'',
    value:''
  },
  editedUserSub:''
}

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
  }),
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
      email: data.email
    }})
  }

  //HANDLES CHARACTER GENERATION
  submit = () => {
    this.setState({loadingState:'loading'})
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

  //Changes state if user is signed in or out
  handleSignIn=(signInStatus)=>{
    this.setState({isSignedIn:signInStatus})
  }
  //HANDLES MAIN PAGE drop selection OPTIONS CHANGES
  handleGender = (event) => {
    this.setState({charGengender: event.value});
  }
  handleRace = (event) => {
    this.setState({charGenrace: event.value});
  }
  // Route state control function
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

  // Selects currently selected user submission from their homepage
  setCurrentUserSubmission=(data)=>{
    this.setState({selectedUserSub: {
      type:data[0],
      value:data[1]
    }})
  }
  handleEditedUserSub=(event)=>{
    this.setState({editedUserSub:event.target.value})
  }

  // Submits user edited submission to server
  submitEditedUserSub=()=>{
    if(this.state.editedUserSub===''){
      console.log('Edit first')
    } else {
      this.setState({loadingState:'loading'})
      fetch('https://safe-dawn-37731.herokuapp.com/edit', {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          "entryType": this.state.selectedUserSub.type.textContent,
          "entryData": this.state.editedUserSub,
          "userEmail": this.state.user.email,
          "originalSub":this.state.selectedUserSub.value.textContent
        })
      })
      .then(response => response.json())
      .then(data => {
        this.setState({loadingState:'loaded'});
        this.closeModal();
        this.routeChange('input');
        this.routeChange('homepage');
      })
      .catch(err=>{
        this.setState({loadingState:'loaded'});
        this.closeModal();
        this.routeChange('homepage');
      })
    }
  }
  // Submits user deleted submission to server
  submitDeletedUserSub=()=>{
    this.setState({loadingState:'loading'})
    fetch('https://safe-dawn-37731.herokuapp.com/delete', {
      method: 'delete',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        "entryType": this.state.selectedUserSub.type.textContent,
        "userEmail": this.state.user.email,
        "originalSub":this.state.selectedUserSub.value.textContent
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({loadingState:'loaded'});
      this.closeModal();
      this.routeChange('input');
      this.routeChange('homepage');
    })
    .catch(err=>{
      this.setState({loadingState:'loaded'});
      this.closeModal();
      this.routeChange('homepage');
    })
  }
  



  render() {
    const {subTitle,isSignedIn,route,loadingState,user} = this.state;
      var modalEditBox = 
      // Popup box for edited or deleted user submissions
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        className="editModal"
        >
        <button className="editModalCloseButton" onClick={this.closeModal} >X</button>
        <textarea className="editModalTextArea" onChange={this.handleEditedUserSub} defaultValue={this.state.selectedUserSub.value.textContent}minlenth="3" maxLength="80"></textarea>
        <button className="editModalEditButton" onClick={this.submitEditedUserSub}>Submit Changes</button>
        <button className="editModalDeleteButton" onClick={this.submitDeletedUserSub}>Delete Submission</button>
      </Modal>
      // Regular modal confirmation box for users adding new things
      var modalBox = 
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        className="Modal"
        >
        <button className="ModalButton" onClick={this.closeModal}>X</button>
        <h2 className="ModalText" ref={subtitle => this.subtitle = subtitle}>{this.state.modalMessage}</h2>
      </Modal>

    // Pings the server to ensure its not idling
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
          <h1>The Community NPC Generator</h1>
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
          
          // User homepage listing their submissions, can delete and edit
          : (
            route === 'homepage' ? (
            <div className="main">
              {modalEditBox}
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
                <UserHomePage setCurrentUserSubmission={this.setCurrentUserSubmission} openModal={this.openModal} user={user} changeSubTitle={this.changeSubTitle} user={user}/>
              </div>
              
            </div>
          ) 

          // Page where users can submit entries of their own
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

          // Initial page, has the character generation output
          : (
            <div className="main">
                <div className="sidebarContainer">
                  {/* <SignedUserTab isSignedIn={isSignedIn} user={user}/> */}
                  <div className="sidebarSelectionContainer">
                    <div className="selectMainContainer">
                      <Select 
                        className="selectContainer"
                        defaultValue={this.state.optionsGender[0]}
                        onChange={this.handleGender}
                        isSearchable={false}
                        styles={customStyles}
                        options={this.state.optionsGender}
                      />
                      <Select className="selectContainer"
                        defaultValue={this.state.optionsRace[0]}
                        onChange={this.handleRace}
                        isSearchable={false}
                        styles={customStyles}
                        options={this.state.optionsRace}
                      />
                    </div>
                  </div>
                  <div className="sidebarButtonContainer">
                    <div className="standardButtonContainer">
                      { this.state.genNewChar === true
                        ? <button  className="standardButton" onClick={this.submit}>Suprise me!</button>
                        : <button className="standardButton" onClick={this.submit}>Make another NPC</button>
                      }
                    </div>
                    <div className="standardButtonContainer">
                      <button  className="standardButton" onClick={()=> {this.routeChange('signIn');this.changeSubTitle('Sign in to submit');}}>Sign in to add your own!</button>
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
                      <div className="OutputImage"><CharImage imageOutput={this.state.newChar.imageOutput} loadingState={loadingState} /></div>
                      <div className="OutputDesc"><CharDesc genderOutput={this.state.newChar.genderOutput} nameOutput={this.state.newChar.nameOutput} lastNameOutput={this.state.newChar.lastNameOutput} loadingState={loadingState} ageOutput={this.state.newChar.ageOutput} raceOutput={this.state.newChar.raceOutput}  /></div>
                      <div className="OutputRoleplay"><CharRoleplay roleplayOutputA={this.state.newChar.roleplayOutputA} roleplayOutputB={this.state.newChar.roleplayOutputB} roleplayOutputC={this.state.newChar.roleplayOutputC} loadingState={loadingState} /></div>
                      <div className="OutputIntrigue"><CharIntrigue intrigueOutput={this.state.newChar.intrigueOutput} loadingState={loadingState} /></div>
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
