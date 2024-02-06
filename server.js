// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
// MongoDB connection string
const url = 'mongodb+srv://hristo:214023@cluster0.odf8ikz.mongodb.net/TASKSDB?retryWrites=true&w=majority';

const app = express();// Initialize an Express application
// Connect to MongoDB
mongoose.connect(url)
const con = mongoose.connection

// Event listener for MongoDB connection open event
con.on('open',function(){
    console.log('Database: Connected...')
});

app.use(express.json());// To parse JSON bodies
app.use(express.urlencoded({extended:false}));// To parse URL-encoded bodies
app.set('view engine','ejs');// Set EJS as the template engine
app.use(morgan('dev'));// Use morgan in development mode for logging HTTP requests

// Serve static files from the "public" directory
app.use('/public', express.static("public"));

// Import and use router from the project's routes
const projectRoute = require('../CRUD_SOLENT/routes/router');
app.use('/',projectRoute);

// Start the server on port 3000
app.listen(3000,(req,res)=>{
    console.log('Server is alive...')
})





