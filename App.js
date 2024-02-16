const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwtoken =require("jsonwebtoken");
const app = express();
const authenticate = require('./middleware/authenticate');
const path = require('path');

dotenv.config({ path: './config.env'});
require('./db/conn');
const User = require('./model/userSchema')
app.use(express.json());
// we make the router files to make our router easy
app.use(require('./router/auth'));
app.use(cookieParser());
app.use(authenticate);

const PORT = process.env.PORT || 5000;

// app.get('/about', (req, res) => {
//   res.send(`Hello about world from the server`);
// });

// app.get('/contact', (req, res) => {
//   res.cookie('test','shikha');
//   res.send(`Hello contact world from the server`);
// });

// app.get('/signin', (req, res) => {
//   res.send(`Hello login contact world from the server`);
// });
// app.get('/signup', (req, res) => {
//   res.send(`Hello registration contact world from the server`);
// });
//for deploy
  app.use(express.static(path.join(__dirname, "./client/build")))
  app.get ('*', function(res,req){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
  });

app.listen(PORT, () => {
  console.log(`Server is running on port no. ${PORT}`);

});
// const express = require('express');




