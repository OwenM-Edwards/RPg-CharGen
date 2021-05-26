import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { LoadingIcon, CharImage, CharDesc, CharIntrigue, CharRoleplay, Sidebar} from '../components';
import { generateCharacter } from "../redux/actions/index";
import Select from 'react-select';
import {optionsRace, optionsGender} from "../constants/index";


const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   color:#f3f3f3;

   & .main {
      background-color:${props => props.backgroundLgtColor};
      transition: background-color 5s ease-out;
      transition: color 5s linear;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 0.9fr 1.1fr;
      gap: 10px 10px;
      grid-template-areas:
         "desc desc desc image"
         "role role intrigue intrigue";
   }

   & .output {
      overflow: hidden;
      background-color:#2f3438;

   }

   & .titleContainer {
      width:100%;
      padding-left:20px;
      margin-bottom:10px;
      color:#01a4f6;
      font-size:1.5rem;
      margin-bottom:20px;
   }
   & .buttonContainer {
      display:flex;
      flex-direction:row;
      padding-left:20px;
      gap:10px;
      max-width:600px;

      & .select {
         width:30%;
      }

      & .generateButton {
         background-color: #FF3E58;
         border:0;
         width:33%;
         height:40px;
         border-radius:5px;
         color:white;
         transition: all 0.2s ease-out;
         cursor: pointer;
         
         &:hover {
            background-color:#FB677B;
         }
      }
   }


`
const OutputDesc = styled.div`
   grid-area: desc;
   border-radius:20px 0 0 0;
`
const OutputImage = styled.div`
   grid-area: image;
   border-radius: 0 20px 0 0;
`
const OutputRoleplay = styled.div`
   grid-area: role;
   border-radius: 0 0 0 20px;
`
const OutputIntrigue = styled.div`
   grid-area: intrigue;
   border-radius: 0 0 20px 0;
`
const customStyles = {
   option: (provided, state) => ({
     ...provided,
     color: state.isSelected ? 'red' : 'blue',
   }),
 }
 
 

const Generator = ({generateCharacter, newChar, isFetching}) => {
   const [ selectedGender, setSelectedGender] = useState('random');
   const [ selectedRace, setSelectedRace] = useState('random');
   const handleGender = (event) => {
      setSelectedGender(event.value)
   }
   const handleRace = (event) => {
      setSelectedRace(event.value)
   }
   useEffect(()=>{
      if(!newChar){
         generateCharacter({ gender:'random', race:'random' })
      }
   },[])

   if(isFetching === false){
      return(
         <Wrapper>
            <div className="titleContainer">
               <h1>Generator</h1>
            </div>


            <div className="buttonContainer">
               <button className="generateButton" onClick={()=> generateCharacter({ gender:selectedGender, race:selectedRace })}>Generate</button>
               <Select
                  defaultValue={optionsRace[0]}
                  options={optionsRace}
                  onChange={handleRace}
                  isSearchable={false}
                  className="select"
                  styles={customStyles}
               />
               <Select
                  defaultValue={optionsGender[0]}
                  options={optionsGender}
                  onChange={handleGender}
                  isSearchable={false}
                  className="select"
               />
               
            </div>

            <div className="main">
               {(newChar !== false) 
                  ? (   
                     <React.Fragment>
                        <OutputImage  className="output">
                           <CharImage/>
                        </OutputImage>

                        <OutputDesc  className="output">
                           <CharDesc/>
                        </OutputDesc>

                        <OutputRoleplay  className="output">
                           <CharRoleplay/>
                        </OutputRoleplay>

                        <OutputIntrigue  className="output">
                           <CharIntrigue/>
                        </OutputIntrigue>
                     </React.Fragment>
                  ) 
                  : <div></div>
               }
            </div>
         </Wrapper>
         )
      }
   else{
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
}

const mapStateToProps = (state) => ({ newChar: state.newChar.newChar, isFetching:state.newChar.isFetching });

export default connect(mapStateToProps, {generateCharacter})(Generator);