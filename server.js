const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('./db.js');


app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});
 