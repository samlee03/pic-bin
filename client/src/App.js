import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('colorful');
  useEffect(() => {
    // Make the fetch request to your backend (you don't need to include localhost:3000)
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
    <div className="App">
      <SearchBar />
      <div>
        <p>Default: colorful. Press to Fetch nature</p> <button onClick={() => setSearchTerm('nature')}>Fetch</button>
      </div>
      <div>
        {data.map((e, i) => {
          return <img src={e}/>
        })}
      </div>
    </div>
  );
}

export default App;
