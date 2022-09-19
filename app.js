//jshint esversion: 6
const express = require("express");  // simple form of node js
const request = require("request");  // used to get http request
const https = require("https");
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
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https://us13.api.mailchimp.com/3.0/lists/a76fe3a98f";
    const options = {
            auth: "oluwajoba_a:fe1367bf84a5cc56f4ddf5bc28f8563e-us13",
            method: "POST"
    };

    const request = https.request(url, options, function(response) {

        response.on("data", function(data){
                    console.log(JSON.parse(data));
                });
           

        if (response.statusCode === 200 ) {
            res.sendFile(__dirname + "/success.html");
            console.log(response);
        } else {
            res.sendFile(__dirname + "/failure.html");
        } 
         });           
            
    request.write(jsonData);
    request.end();
            
            // console.log(fname, lname);
            // res.send("<h3>Thank you for signing up </h3>" + req.body.fname);
        });

app.post('/failure', function(req, res) {
    res.redirect('/');
});
        
app.listen(`${port}`, () => 
        console.log(`Server is running on port ${port}`));