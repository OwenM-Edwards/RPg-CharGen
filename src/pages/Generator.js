import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { CharImage, CharDesc, CharIntrigue, CharRoleplay, Sidebar} from '../components/Index';
import Loader from 'react-loader-spinner';
const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;

   & .sidebar {
      background-color:red;
      height:100%;
      min-width:10%;
   }
   & .main {
      background-color:green;
      min-height:100%;
      min-width:90%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: 0px;
      grid-row-gap: 0px; 
   }
`
const OutputDesc = styled.div`
   background-color:white;
   grid-area: 1 / 1 / 2 / 2;
   overflow: hidden;
`
const OutputImage = styled.div`
   background-color:grey;
   grid-area: 1 / 2 / 2 / 3;
   overflow: hidden;
`
const OutputRoleplay = styled.div`
   background-color:blue;
   grid-area: 2 / 1 / 3 / 2;
   overflow: hidden;
`
const OutputIntrigue = styled.div`
   background-color:purple;
   grid-area: 2 / 2 / 3 / 3;
   overflow: hidden;
`
const SpinnerContainer = styled.div`
   margin:0 auto;
   align-self:center;
`


const Generator = ({newChar}) => {

   if(newChar.isFetching == false){
      return(
         <Wrapper>
            <div className="sidebar"> 
               <Sidebar page={'generator'}/>
            </div>

            <div className="main">
               {(newChar.newChar != false) 
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
            <div className="sidebar"> 
               <Sidebar page={'generator'}/>
            </div>
            <SpinnerContainer>
               <Loader type="BallTriangle" color="red" height={100} width={100} />
            </SpinnerContainer>
         </Wrapper>
      )
   }
}

const mapStateToProps = (state) => ({ newChar: state.newChar });

export default connect(mapStateToProps)(Generator);