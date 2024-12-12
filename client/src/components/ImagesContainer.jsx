import React, { useState, useContext } from 'react'
import "../styles/ImagesContainer.css"
import { PinnedContext } from '../App';
import Logo from "../assets/pin-icon.png"


const ImagesContainer = ({data, onClick, isHome}) => {
  const pinnedData = useContext(PinnedContext);
  const { pinned, setPinned } = pinnedData;
  
  const handlePin = async (e) => {
    console.log(e);
    fetch('http://localhost:3000/db/add_pictures', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pictureUrl: e,
      })
    })
    .then (response => {
      if (!response.ok){
        return;
      } else {
        response.json();
      }
    })
    .then (data => {
      setPinned(data);
      console.log('attempted to send to dbs');
    })
  }

  return (
    <div className='images-container'>
        {data.map((e, i) => {
          return <div className='image-card' key={i}>
            <img src={e} className='images' onClick={() => {navigator.clipboard.writeText(e)}}/>
            <img src = {Logo} className='pin-icon' onClick={() => {handlePin(e)}}/>
            
          </div>
        })}
    </div>
  )
}

export default ImagesContainer