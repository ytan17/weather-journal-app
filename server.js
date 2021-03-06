/**
 * Setup empty JS object to act as endpoint for all routes
 *
 */
projectData = [];


/**
 * set up environment
 *
 */
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


/**
 * set up server
 *
 */
const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};


/**
 * Get route
 *
 */

/**
 * problem: Unresolved function or method get()
 * solution: The problem is that these properties are not defined in Express module
 *           - they are added dynamically in runtime.
 *           Installing express typings (@types/express) should make things better:
 *           hit Alt+Enter on "express" in require('express'),
 *           choose Install Typescript definitions for better type information.
 */
app.get('/all', sendData);
function sendData(request, response) {
    // return the projectData object
    response.send(projectData);
}


/**
 * post route
 *
 */
app.post('/addData', addData);
function addData(request, response) {
    const newWeatherJournal = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    };
    projectData.push(newWeatherJournal);
    response.send(projectData);
}
