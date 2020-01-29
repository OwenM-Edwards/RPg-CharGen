import React from 'react';
import ReactLoading from 'react-loading';
import './loadingIcons.css'
 
const LoadingIcons = ({ }) => (
   <ReactLoading className={"loadIcon"} type={'spin'} color="#4CAF50" />
);
 
export default LoadingIcons;