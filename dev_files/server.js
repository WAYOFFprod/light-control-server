import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import apiRouter from './app/routes'

const configFile = dotenv.config();

const app = express();

const port = process.env.PORT || 8000; 
const db = mongoose.connect(process.env.DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.get('/', (req, res) => res.send('Welcome to the light control interface!..!'))

app.listen(port, () => {
  console.log('We are live on ' + port);
});
