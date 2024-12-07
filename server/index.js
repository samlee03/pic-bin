import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';  // Import dotenv to load environment variables

dotenv.config();  // Load environment variables from .env file

const app = express();
app.use(cors())
app.use(express.json())
const port = 3000;

const apiKey = process.env.MY_SECRET_API_KEY;  // Replace with your Flickr API key from .env
const searchText = 'sunset';  // Search term

const RETURNED_PHOTOS = [];

// Define a route
app.get('/:searchText', (req, res) => {
  const { searchText } = req.params;  // Extract 'searchText' from the URL
  
  // Initialize the returned photos array for each request
  let RETURNED_PHOTOS = [];

  // Fetch data from the Flickr API
  fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(searchText)}&format=json&nojsoncallback=1`)
    .then(response => response.json())  // Parse the response to JSON
    .then(data => {
      if (data.photos && data.photos.photo) {
        data.photos.photo.some((e) => {
          if (RETURNED_PHOTOS.length < 40) {
            RETURNED_PHOTOS.push(`https://farm${e.farm}.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`);
            return false;  // Continue the loop until 40 photos are collected
          } else {
            return true;  // Stop after 40 photos
          }
        });
      }

      res.json(RETURNED_PHOTOS);  // Send the array of photos as the response
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');  // Return an error if the fetch fails
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
