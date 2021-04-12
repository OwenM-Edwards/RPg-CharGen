import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";


const Wrapper = styled.div`
   position: absolute;
   display:flex;
   align-items:center;
   flex-wrap:wrap;
   top:12px;
   & .night-mode-toggle {
      display: inline-block;
      height: 24px;
      left:5px;
      position: relative;
      width: 50px;
   }
   & .slider {
      background-color: #ccc;
      bottom: 0;
      cursor: pointer;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transition: .4s;
      &:before {
         background-color: #fff;
         bottom: 4px;
         content: "";
         height: 16px;
         left: 4px;
         position: absolute;
         transition: .4s;
         width: 16px;
      }
   }
   & #checkbox{
      position: relative;
      left:5px;
   }
   & #checkbox:checked + .slider {
      background-color: #db8722;
      &:before {
         transform: translateX(26px);
      }
   }
   .slider.round {
      border-radius: 34px;
      &:before {
         border-radius: 50%;
      }
   }

`
const StyledEM = styled.em`
   font-size: 1.1rem;
   margin-left: 20px;
   padding-top:6px;
   width:100%;
   position: relative;
   right:15px;
`

const ThemeToggleBtn = () => {
   const [ theme, setTheme ] = useState(true);
   // useEffect(() => updateThemeButton(), [])
   const toggleTheme = () => {
      if (theme === 'light') {
         setTheme('dark');
      }
      else {
         setTheme('light');
      }
   }

   // On page load, get previous theme selection and update button.
   // const updateThemeButton = () => {
   //    // if(currentTheme.mode === 'dark'){
   //    //    setChecked(true);
   //    // }
   //    // else {
   //    //    setChecked(false);
   //    // }
   // }
   // On button select, update theme.
   // const toggleTheme = ( ) => {
   //    console.log('testing');
   //    if(currentTheme.mode === 'dark'){

   //    }
   //    else {

   //    }
   // }

   return(
      <Wrapper>
         <label className="night-mode-toggle" for="checkbox">
            <input 
               // onChange={toggleTheme} 
               type="checkbox" 
               id="checkbox"
               // defaultChecked={checked}
            />
            <div className="slider round"></div>
         </label>
         <StyledEM>Dark Mode</StyledEM>

         {/* <button className="themeButton" onClick={toggleTheme}>switch theme</button> */}
      </Wrapper>
   )
}




export default ThemeToggleBtn;