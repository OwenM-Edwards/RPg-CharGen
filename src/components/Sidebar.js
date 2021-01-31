import React, { useState } from 'react';
import { connect } from "react-redux";
import {optionsRace, optionsGender} from "../constants/index";
import Select from 'react-select';
import { generateCharacter } from "../redux/actions/index";
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   display:flex;
   flex-direction:column;
`
const GenerateButton = styled.button`
   background-color: #4CAF50;
   padding:10px;
   border:0;
   width:100%;
   margin-top:10px;
`
const Sidebar = ({ page, generateCharacter }) => {
   let sidebarContent;
   const [ selectedGender, setSelectedGender] = useState('random');
   const [ selectedRace, setSelectedRace] = useState('random');
   const handleGender = (event) => {
      setSelectedGender(event.value)
   }
   const handleRace = (event) => {
      setSelectedRace(event.value)
   }
   switch(page){
      case 'generator':
         sidebarContent = 
         <Wrapper>
            <Select
               defaultValue={optionsRace[0]}
               options={optionsRace}
               onChange={handleRace}
               isSearchable={false}
            />
            <Select
               defaultValue={optionsGender[0]}
               options={optionsGender}
               onChange={handleGender}
               isSearchable={false}
            />
            <GenerateButton onClick={()=> generateCharacter({ gender:selectedGender, race:selectedRace })}>Generate</GenerateButton>
         </Wrapper>
         break;
      default:
         sidebarContent = <div>test2</div>
   }
   return(
      <div>
         {sidebarContent}
      </div> 
   )
}
const mapStateToProps = () => ({});
export default connect(mapStateToProps, { generateCharacter })(Sidebar);