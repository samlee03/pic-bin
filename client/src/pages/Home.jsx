import React from 'react'
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SideNav from '../components/SideNav';
import ImagesContainer from '../components/ImagesContainer';
import "../styles/Home.css"
const Home = () => {

  const [data, setData] = useState([]);
  return (
    <div className='Home'>
      <SearchBar setData = {setData}/>
      {data.length == 0
      ? 
        <div className='loading'>
          <p className='loading-text'>Loading Images...</p> 

        </div>
      :
        <ImagesContainer data={data}/>
      }
    </div>
  )
}

export default Home