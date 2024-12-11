import React from 'react';
import '../styles/SearchBar.css'
import { useEffect, useState } from 'react';

const SearchBar = ({setData}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  useEffect(() => {
    console.log(searchTerm);
    console.log("Fetching");
    fetch(`http://localhost:3000/${searchTerm}`)  // Assuming your Node.js API endpoint is /api/data
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [searchTerm, setData]);

  return (
    <div className = "input-wrapper">
    <input placeholder = "Search Image Here..." 
      value = {tempSearchTerm} 
      onChange = {(e) => setTempSearchTerm(e.target.value)}
      onKeyDown = {(e) => {
          if(e.key === "Enter"){
            setSearchTerm(tempSearchTerm);
          }
        }
      }
    />
    </div>
  )
};

export default SearchBar