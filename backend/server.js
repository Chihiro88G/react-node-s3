import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { generateUploadUrl } from './s3.js';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('root accessed');
});

app.get('/s3-url', async (req, res) => {
  console.log('inside backend')
  const url = await generateUploadUrl();
  console.log(url);
  res.send({url});
});

app.listen(process.env.PORT, () => console.log('server running on: ' + process.env.PORT));