const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const login = require('./routes/login');
const signup = require('./routes/signup');
const vendors = require('./routes/vendors');
const buyers = require('./routes/buyers');

const DB_NAME = "zomato";

const app = express();
const PORT = 5000

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/" + DB_NAME, { useNewUrlParser: true })
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

app.use('/login', login);
app.use('/signup', signup);
app.use('/vendors', vendors);
app.use('/buyers', buyers);

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
})