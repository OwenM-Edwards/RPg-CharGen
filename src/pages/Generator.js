import React, {useEffect} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { LoadingIcon, CharImage, CharDesc, CharIntrigue, CharRoleplay, Sidebar} from '../components';
import { generateCharacter } from "../redux/actions/index";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;

   & .main {

      background-color:${props => props.backgroundLgtColor};
      color:${props => props.fontColor};
      transition: background-color 5s ease-out;
      transition: color 5s linear;
      min-height:100%;
      min-width:80%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: 0px;
      grid-row-gap: 0px; 
   }
`
const OutputDesc = styled.div`
   grid-area: 1 / 1 / 2 / 2;
   overflow: hidden;
`
const OutputImage = styled.div`
   grid-area: 1 / 2 / 2 / 3;
   overflow: hidden;
`
const OutputRoleplay = styled.div`
   grid-area: 2 / 1 / 3 / 2;
   overflow: hidden;
`
const OutputIntrigue = styled.div`
   grid-area: 2 / 2 / 3 / 3;
   overflow: hidden;
`

const Generator = ({generateCharacter, newChar, isFetching}) => {

   useEffect(()=>{
      console.log(newChar)
      if(!newChar){
         generateCharacter({ gender:'random', race:'random' })
      }
   },[])

   if(isFetching === false){
      return(
         <Wrapper>
            <Sidebar page={'generator'}/>
            

            <div className="main">
               {(newChar !== false) 
                  ? (   
                     <React.Fragment>
                        <OutputImage>
                           <CharImage/>
                        </OutputImage>

                        <OutputDesc>
                           <CharDesc/>
                        </OutputDesc>

                        <OutputRoleplay>
                           <CharRoleplay/>
                        </OutputRoleplay>

                        <OutputIntrigue>
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
            <Sidebar page={'generator'}/>
            <LoadingIcon/>
         </Wrapper>
      )
   }
}

const mapStateToProps = (state) => ({ newChar: state.newChar.newChar, isFetching:state.newChar.isFetching });

export default connect(mapStateToProps, {generateCharacter})(Generator);