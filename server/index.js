import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';  // Import dotenv to load environment variables
import { MongoClient, ServerApiVersion, ObjectId} from 'mongodb';

dotenv.config();  // Load environment variables from .env file

const app = express();
app.use(cors())
app.use(express.json())
const port = 3000;

const apiKey = process.env.MY_SECRET_API_KEY;  // Replace with your Flickr API key from .env

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
await client.connect();

// Mongo
app.get('/db/saved_pictures', async (req, res) => {
  const { collection } = req.params;
  const result = await client.db('project_database').collection('saved_pictures').findOne({});
  res.send(result);
})

app.post('/db/add_pictures', async (req, res) => {
  const { pictureUrl } = req.body;
  const result = await client.db('project_database').collection('saved_pictures').updateOne({}, { $push: { saved: pictureUrl } });
  res.send(result);
});

app.post('/db/remove_pictures', async (req, res) => {
  const { pictureUrl } = req.body;
  const result = await client.db('project_database').collection('saved_pictures').updateOne({ $pull: { saved: pictureUrl } });  // Pull (remove) the picture URL from the 'saved' array
})


// MongoDB Snapshots (For url sharing)

app.post('/snapshots', async (req, res) => {
  const savedPictures = await client.db('project_database').collection('saved_pictures').findOne({});
  const snapshotData = {
    saved: savedPictures.saved
  };
  const result = await client.db('project_database').collection('snapshots').insertOne(snapshotData);
  res.send({ message: 'Snapshot created successfully', documentId: result.insertedId });
})

app.get('/snapshots/:id', async (req, res) => {
  const { id } = req.params;
  const objectId = new ObjectId(id);
  
  const document = await client.db('project_database').collection('snapshots').findOne({ _id: objectId });
  if (!document) {
    return res.status(404).send('Document not found');
  }
  return res.send(document);
})

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
          if (RETURNED_PHOTOS.length < 40) { // 40 Photos 
            RETURNED_PHOTOS.push(`https://farm${e.farm}.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`);
            return false;
          } else {
            return true;
          }
        });
      }

      res.json(RETURNED_PHOTOS);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
