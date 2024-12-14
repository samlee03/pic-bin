import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import "../styles/Preview.css"
function Preview() {
  const [data, setData] = useState(null); // Initialize with null
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/snapshots/${id}`); // Include protocol (http or https)

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setData(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Re-fetch data only when 'id' changes

  return (
    <div className="Preview">
      {data ? ( 
  <div>
    <h2>Snapshot Data</h2>
    <p>Saved Pictures:</p> 
    {data.saved && data.saved.length > 0 ? ( 
      data.saved.map((e, i) => (
        <img className='preview-img' key={i} src={e} /> 
      ))
      ) : (
        <p>No saved pictures found.</p> 
      )}
      </div>
      ) : (
        <p>Loading snapshot data...</p> 
      )}
    </div>
  );
}

export default Preview;