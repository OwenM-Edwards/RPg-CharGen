import React, { useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/index";
import Loader from 'react-loader-spinner';
import { Link } from "react-router-dom";

const Wrapper = styled.div`

`
const SpinnerContainer = styled.div`
   margin:0 auto;
   align-self:center;
`
const ErrorBox = styled.div`
   width:100px;
   height:100px;
   background-color:red;   
`

const Register = ({registerUser, isFetching}) => {
   const [ userEmail, setUserEmail] = useState(false);
   const [ userPassword, setUserPassword] = useState(false);
   const [ userName, setUserName] = useState(false);

   const handlePassword = (event) => {
      setUserPassword(event.target.value)
   }
   const handleEmail = (event) => {
      setUserEmail(event.target.value)
   }
   const handleUserName = (event) => {
      setUserName(event.target.value)
   }
   if(isFetching == false){
      return(
         <Wrapper>
            <form>
               <fieldset>
                  <legend>Register</legend>
                  <input
                     placeholder="User Name"
                     className="signinInput"
                     onChange={handleUserName} 
                     type="text" name="user-name"  id="user-name" 
                  />
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
   
                  <input 
                     className="registerButton" 
                     type="submit" 
                     value="Register" 
                     onClick={()=> registerUser({userEmail, userPassword, userName})}
                  />
                  <Link to="/signIn"><input                           
                     type="submit" 
                     value="Sign In"
                     className="signInButton" 
                  /></Link>
               </fieldset>
            </form>
         </Wrapper>
      )   
   }
   else {
      return(
         <Wrapper>
            <SpinnerContainer>
               <Loader type="BallTriangle" color="red" height={100} width={100} />
            </SpinnerContainer>
         </Wrapper>
      )
   }
}


const mapStateToProps = (state) => ({ authenticated: state.signIn.authenticated, isFetching: state.register.isFetching });

export default connect(mapStateToProps, { registerUser, })(Register);