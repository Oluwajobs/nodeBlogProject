//jshint esversion: 6
const express = require("express");  // simple form of node js
const request = require("request");  // used to get http request
const bodyParser = require("body-parser");  // used to access the data in the html body

// setting up our env
const port = 3000;
const app = express();
app.use(express.static("public")); // allows us to use static files in our app
app.use(bodyParser.urlencoded({extended:true}));

// Setting up routes
app.get('/', function(req, res) {
    res.sendFile(__dirname +"/signup.html");
});

app.post('/', function(req,res){
    console.log(req.body.fname);
    console.log(req.body.lname);
    console.log(req.body.email);
    res.send("<h3>Thank you for signing up </h3>" + req.body.fname);
});

app.listen(`${port}`, () => 
    console.log(`Server is running on port ${port}`));