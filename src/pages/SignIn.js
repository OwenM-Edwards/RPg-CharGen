import React, { useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/index";
import Loader from 'react-loader-spinner';
import { Link } from "react-router-dom";


const Wrapper = styled.div`

`
const SpinnerContainer = styled.div`   
   margin:0 auto;
   align-self:center;
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
   if(isFetching == false){
      return(
         <Wrapper>
            <form>
               <fieldset>
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
   
                  <input 
                     className="signInButton" 
                     type="submit" 
                     value="Sign in" 
                     onClick={()=> signIn({userEmail, userPassword})}
                  />
                  <Link to="/register"><input                           
                     type="submit" 
                     value="Register"
                     className="registerButton" 
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


const mapStateToProps = (state) => ({ authenticated: state.signIn.authenticated, isFetching: state.signIn.isFetching });

export default connect(mapStateToProps, { signIn })(SignIn);