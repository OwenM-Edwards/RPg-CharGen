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
  background-color:${props => props.theme.backgroundHvyColor};
  color:${props => props.theme.fontColor};
  display:flex;
  flex-wrap:wrap;
  height: 100vh;
  margin: 0;
  padding: 0 0 0 20px;
  & .header {
    height:10%;
    max-height:200px;
    width:100%;
  }
  & .main {
    height:88%;
    width:95%;
    /* padding-right:5%; */
  }
  & .footer {
    align-self:flex-end;
    height:2%;
    width:100%;
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


const mapStateToProps = (state) => ({ authenticated: state.authenticate.authenticated });

export default connect(mapStateToProps)(App);