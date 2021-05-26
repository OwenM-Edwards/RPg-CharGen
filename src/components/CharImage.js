import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import imageBG from "../img/bg.png";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   justify-content:center;
   align-content:center;

`

const CharImage = ({ newCharImage }) => {
   
   return(
      <Wrapper>
         <img src={newCharImage}/>
      </Wrapper>
   )
}
const mapStateToProps = (state) => ({ newCharImage: state.newChar.newChar.data[0][0].url });
export default connect(mapStateToProps)(CharImage);