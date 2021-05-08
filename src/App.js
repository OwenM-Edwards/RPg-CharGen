import React from 'react';
import './index.css';
import styled from "styled-components";
import { connect } from "react-redux";
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

import { Footer, Header} from './components';
import { Register, Generator, SignIn, Submit, Submissions } from './pages/Index';

const Wrapper = styled.div`
  background-color:${props => props.theme.backgroundHvyColor};
  color:${props => props.theme.fontColor};
  display:flex;
  flex-direction:column;
  height: 100vh;
  min-height:100vh;
  max-height: 100vh;
  margin: 0;
  overflow:auto;
  width:100%;
  padding-top:30px;

  & .header {
    width:100%;
    min-height:100px;
  }
  & .main {
    width:90%;
    align-self:center;
    flex-grow:1;
    max-height:70%;
  }
  & .footer {
    width:100%;
    min-height:50px;
    margin-top: auto;    
    background-color:orange;
  }
`

function App({ authenticated }) {
  return (
    <Router>
      <Wrapper>
        <ToastContainer
          position="bottom-right"
        />

        <div className="header">
          <Header/>
        </div>

        <Switch>
          <Route path="/signin">
            {(authenticated)
            ? <div className="main"><Generator/></div>
            : <div className="main"><SignIn/></div>
            }
          </Route>

          <Route path="/register">
            {(authenticated)
              ? <div className="main"><Generator/></div>
              : <div className="main"><Register/></div>
            }
          </Route>

          <Route path="/submissions/:category">
            {(authenticated)
              ? <div className="main"><Submissions/></div>
              : <div className="main"><SignIn/></div>
            }
          </Route>

          <Route path="/submit">
            {(authenticated)
              ? <div className="main"><Submit/></div>
              : <div className="main"><SignIn/></div>
            }
          </Route>

          <Route path="/generator">
            <div className="main"><Generator/></div>
          </Route>
        </Switch>

        <div className="footer">
          <Footer/>
        </div>
          
      </Wrapper>
    </Router>
  )
}


const mapStateToProps = (state) => ({ authenticated: state.authenticate.authenticated });

export default connect(mapStateToProps)(App);