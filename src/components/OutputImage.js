import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";

const OutputImage = ({currentRace, changeRace}) => {

}

const mapStateToProps = (state) => ({ currentRace: state.changeRace.race.label });

export default connect(mapStateToProps, { changeRace })(OutputImage);