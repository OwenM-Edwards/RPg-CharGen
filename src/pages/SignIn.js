import React, { useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon } from '../components';


const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   justify-content:center;
   align-items:center;
   & .signInForm {
      padding:20px;
      height:auto;
      background-color:#2f3438;
      color:white;
      align-self:center;
      width:90%;
      justify-content:center;
      max-width:560px;
      align-self:center;
      border-radius:5px 5px 0 0;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
   }
   & .signInFieldset {
      display:flex;
      justify-content:center;
      flex-direction:column;
      padding:10px;
      padding-top:20px;
      border-radius:10px;
      border:0px;
      text-align:center;
      font-size:1.2rem;
      & p {
         margin-top:30px;
      }
      & span {
         font-weight:bold;
         cursor: pointer;
      }
      & .registerContainer {
         align-self:center;
         width:auto;
         text-decoration:none;
         font-size:1.1rem;
      }
   }
   & .buttonContainer {
      margin: 10px auto 0;
      width:100%;
      display:flex;
      justify-content:center;
      text-decoration:none;
   }
   & .signinInput {
      padding:10px;
      width:100%;
      margin: 0 auto;
      /* background-color:red; */
      border-radius:5px;
      margin-bottom:10px;
      outline: none;
      border:0px;
   }
   & .signinButton {
      padding:10px;
      width:100%;
      justify-self:center;
      margin: 0 auto;
      background-color: #FF3E58;
      border-radius:5px;
      color:white;
      border:0px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      font-size:1.1rem;
      cursor: pointer;
      transition: all 0.2s ease-out;

      &:hover {
         background-color:#FB677B;
      }
   }
`

const SignIn = ({signIn, isFetching}) => {
   const [ userEmail, setUserEmail] = useState(false);
   const [ userPassword, setUserPassword] = useState(false);

   const handlePassword = (event) => {
      setUserPassword(event.target.value)
   }
   const handleEmail = (event) => {
      setUserEmail(event.target.value) 
   }

   if(isFetching){
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
   else {
      return(
         <Wrapper>
            <form className="signInForm">
               <fieldset className="signInFieldset">
                  <legend>Sign In</legend>
                  <input
                     placeholder="Email"
                     className="signinInput"
                     onChange={handleEmail} 
                     type="email" name="email-address"  id="email-address" 
                  />
                  <input 
                     placeholder="Password"
                     className="signinInput"
                     onChange={handlePassword} 
                     type="password" name="password"  id="password" 
                  />
                  <div className="buttonContainer">
                     <input 
                        type="submit" 
                        value="Sign in" 
                        onClick={()=> signIn({userEmail, userPassword})}
                        className="signinButton" 
                     />
                  </div>
                  
                  <Link className="buttonContainer" to="/register">
                     <input                           
                        type="submit" 
                        value="Register"
                        className="signinButton" 
                     />
                  </Link>
               </fieldset>
            </form>
         </Wrapper>
      )   
   }
}


const mapStateToProps = (state) => ({ authenticated: state.authenticate.authenticated, isFetching: state.authenticate.isFetching });

export default connect(mapStateToProps, { signIn })(SignIn);