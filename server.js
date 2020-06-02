// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{
    // console.log(server);
    console.log(`running on localhost: ${port}`);
});



app.get('/weather', sendData);
function sendData (request, response) {
    console.log('get', projectData)
    response.json(projectData);
};


app.post('/weather', saveData)
function saveData (request,response){
    console.log('post', request.body)
    projectData.date = request.body.date;
    projectData.temp = request.body.temp;
    projectData.content = request.body.content;
    response.send('POST received');
}