import React from 'react'
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ImagesContainer from '../components/ImagesContainer';
const Home = () => {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('colorful');
  useEffect(() => {
    // Make the fetch request to your backend (you don't need to include localhost:3000)
    setData([]);
    console.log("Fetching");
    fetch(`http://localhost:3000/${searchTerm}`)  // Assuming your Node.js API endpoint is /api/data
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [searchTerm]);

  return (
    <>
      <SearchBar />
      <div>
        <p>Default: colorful. Press to Fetch nature</p> <button onClick={() => setSearchTerm('nature')}>Fetch</button>
      </div>
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