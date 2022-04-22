import React from 'react';
import {Bars} from 'react-loader-spinner';
import './Layout/Style/Loading.css';
const Loading = () => {
  return (
    <div className="loading">
      <Bars className="loading-spinner" color="#00BFFF" height={100} width={100}/>
    </div>
  );
};

export default Loading;