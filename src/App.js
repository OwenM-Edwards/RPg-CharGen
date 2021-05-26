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

import { Footer, Header, Sidebar} from './components';
import { Register, Generator, SignIn, Submit, Submissions } from './pages/Index';

const Wrapper = styled.div`
  background-color:#25292e;
  color:${props => props.theme.fontColor};
  display:flex;
  flex-direction:row;
  height: 100vh;
  min-height:100vh;
  max-height: 100vh;
  margin: 0;
  overflow:hidden;
  width:100%;

  & .main {
    width:100%;
    max-width:1600px;
    height:100%;
    background-color:#25292e;
    margin:0 auto;
    padding:20px;
  }
`

function App({ authenticated }) {
  return (
    <Router>

      <Wrapper>

        <ToastContainer
          position="bottom-right"
        />

        <Switch>
            <Route path="/signin">
              <Sidebar className="sidebar" page={'signin'}/>

              {(authenticated)
              ? <div className="main"><Generator/></div>
              : <div className="main"><SignIn/></div>
              }
            </Route>

            <Route path="/register">
              <Sidebar className="sidebar" page={'signin'}/>

              {(authenticated)
                ? <div className="main"><Generator/></div>
                : <div className="main"><Register/></div>
              }
            </Route>

            <Route path="/submissions/:category">
              <Sidebar className="sidebar" page={'submissions'}/>
              {(authenticated)
                ? <div className="main"><Submissions/></div>
                : <div className="main"><SignIn/></div>
              }
            </Route>

            <Route path="/submit">
              <Sidebar className="sidebar" page={'submit'}/>
              {(authenticated)
                ? <div className="main"><Submit/></div>
                : <div className="main"><SignIn/></div>
              }
            </Route>

            <Route path="/generator">
              <Sidebar className="sidebar" page={'generator'}/>

              <div className="main">
                <Generator/>
              </div>
            </Route>

            <Route exact path="/">
              <Sidebar className="sidebar" page={'generator'}/>
              <div className="main">
                <Generator/>
              </div>
            </Route>
        
        </Switch>
          
      </Wrapper>
    </Router>
  )
}


const mapStateToProps = (state) => ({ authenticated: state.authenticate.authenticated });

export default connect(mapStateToProps)(App);