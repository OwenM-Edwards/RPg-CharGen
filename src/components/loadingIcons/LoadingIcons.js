import React from 'react';
import ReactLoading from 'react-loading';
import './loadingIcons.css'
 
const LoadingIcons = ({ type, color }) => (
   <ReactLoading className={"loadIcon"} type={'spin'} color="#fcba03" />
);
 
export default LoadingIcons;