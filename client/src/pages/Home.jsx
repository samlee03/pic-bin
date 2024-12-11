import React from 'react'
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SideNav from '../components/SideNav';
import ImagesContainer from '../components/ImagesContainer';
import "../styles/Home.css"
const Home = () => {

  const [data, setData] = useState([]);
  return (
    <>
      <SearchBar setData = {setData}/>
      <SideNav/>
      {data.length == 0
      ? 
        <p className = "loading">Loading...</p> // Maybe add some type of loading content here.
      :
        <ImagesContainer data={data}/>
      }
    </>
  )
}

export default Home