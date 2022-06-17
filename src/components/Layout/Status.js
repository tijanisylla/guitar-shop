import React from 'react';
import axios from 'axios';

  async  function onlineStatus(id){
    const response = await axios.patch(`http://localhost:8000/online/${id}`)
    console.log(response)
}

async  function offlineStatus(id){
    const response = await axios.patch(`http://localhost:8000/offline/${id}`)
    console.log(response)
};


export {
    onlineStatus,
    offlineStatus
};