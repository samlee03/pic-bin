import React from 'react'
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ImagesContainer from '../components/ImagesContainer';
const Home = () => {

  const [data, setData] = useState([]);
  return (
    <>
      <SearchBar setData = {setData}/>
      {/* <div>
        <p>Default: colorful. Press to Fetch nature</p> <button onClick={() => setSearchTerm('nature')}>Fetch</button>
        <p>Default: colorful. Press to Fetch colorful</p> <button onClick={() => setSearchTerm('colorful')}>Fetch</button>
      </div> */}
      {data.length == 0
      ? 
        <p>Loading..</p> // Maybe add some type of loading content here.
      :
        <ImagesContainer data={data}/>
      }
    </>
  )
}

export default Home