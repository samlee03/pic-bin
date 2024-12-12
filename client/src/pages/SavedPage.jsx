import React, { useState, useEffect, useContext } from 'react'
import "../styles/SavedPage.css"

import { PinnedContext } from '../App';
import ImagesContainer from '../components/ImagesContainer';
const SavedPage = () => {
  const [data, setData] = useState([]);
  const [previewReady, setPreviewReady] = useState('');
  const pinnedData = useContext(PinnedContext);
  const { pinned, setPinned } = pinnedData;
  useEffect(() => {
    console.log("fetching from saved pictures");
    fetch(`http://localhost:3000/db/saved_pictures`)  // Assuming your Node.js API endpoint is /api/data
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => setData(data.saved))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [pinned])

  const handleDelete = async (e) => {
    const response = await fetch('http://localhost:3000/db/remove_pictures', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pictureUrl: e,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const updatedPinnedPictures = await response.json(); 
    setPinned(updatedPinnedPictures); 
    // rem.remove();
  }

  const handleShare = () => {
    fetch('http://localhost:3000/snapshots', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok'); 
      }
      return response.json(); 
    })
    .then(data => {
      if (data && data.documentId) {
        console.log('Document ID:', data.documentId); 
        setPreviewReady(data.documentId);
      } else {
        console.warn('No documentId found in the response.'); 
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }


  return (
    <div className='SavedPage'>
      {data.map((e, i) => {
        return <div key={i}>
         <img className='saved-image' src={e} onClick={() => handleDelete(e)}/>
        </div>
      })}
      <button onClick={() => handleShare()}>Share</button>
      {previewReady? <p>Here's your preview http://localhost:3001/preview/{previewReady}</p> : <></>}
    </div>
  )
}

export default SavedPage