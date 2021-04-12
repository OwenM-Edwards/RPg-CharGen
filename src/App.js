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

import { Footer, Header} from './components/Index';
import { Register, Generator, SignIn, Submit, Submissions } from './pages/Index';

const Wrapper = styled.div`
  background-color:red;
  display:flex;
  flex-wrap:wrap;
  height: 100vh;
  margin: 0;
  & .header {
    background-color:white;
    height:10%;
    max-height:200px;
    width:100%;
  }
  & .nav {
    grid-column: 2 / 3;
  }
  & .main {
    background-color:yellow;
    height:85%;
    width:100%;
  }
  & .footer {
    align-self:flex-end;
    background-color:pink;
    height:5%;
    width:100%;
  }
`


function App({authenticated}) {
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

            <Route path="/submissions">
              {(authenticated)
              ?  <div className="main"><Submissions/></div>
              :  <Redirect to="/signin"/>
              }
            </Route>

            <Route path="/submit">
              {(authenticated)
              ?  <div className="main"><Submit/></div>
              :  <Redirect to="/signin"/>
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


const mapStateToProps = (state) => ({ authenticated: state.signIn.authenticated });

export default connect(mapStateToProps)(App);