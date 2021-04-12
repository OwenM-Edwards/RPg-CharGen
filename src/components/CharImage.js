import React from 'react';
import { connect } from "react-redux";
import Tilt from 'react-parallax-tilt';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   justify-content:center;
   border:3px solid black;
   border-radius:5px;
   align-content:center;
`

const CharImage = ({ newCharImage }) => {
   
   return(
      <Wrapper>
         <Tilt>
            <img src={newCharImage}/>
         </Tilt>
      </Wrapper>
   )
}
const mapStateToProps = (state) => ({ newCharImage: state.newChar.newChar.data[0][0].url });
export default connect(mapStateToProps)(CharImage);