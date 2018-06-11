import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dbconf from './config/db'
import apiRouter from './app/routes'

const app = express();

const port = process.env.PORT || 8000;

const db = mongoose.connect(dbconf.localUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);
//require('./app/routes')(app, db);

app.listen(port, () => {
  console.log('We are live on ' + port);
});