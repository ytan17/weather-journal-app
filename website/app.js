/**
 * Define Global Variables
 *
 */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const OpenWeatherApiKey = "edc8da4ad2db633b4f4474a6434dfc6a";
const apiKey = `&appid=${OpenWeatherApiKey}`;


/**
 * Define Global Variables - End
 * Helper functions - Start
 *
 */

/** async helper function */
// get method
const getWeatherJournal = async(baseURL, zipCode, apiKey) => {
    console.log('baseURLandAPIkey_getWeatherJournal', baseURL+zipCode+apiKey);
    const request = await fetch(baseURL+zipCode+apiKey);
    try{
        const weatherJournalData = await request.json();
        console.log('weatherJournalData_getWeatherJournal', weatherJournalData);
        console.log('temperature_getWeatherJournal', weatherJournalData.main['temp']);
        return weatherJournalData;
    }catch (e) {
        console.log('error', e);
    }
};

// post method
const postWeatherJournal = async(url = '', data = {}) => {
    console.log('postData_postWeatherJournal', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        console.log('newData_postWeatherJournal', newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};


// update UI method
const updateUI = async() =>{
    const request = await fetch('/all');
    console.log('updateUIRequest_updateUI', request);
    try{
        const allData = await request.json();
        const last = allData.length - 1;
        document.getElementById('date').innerHTML = allData[last].date;
        document.getElementById('temp').innerHTML = allData[last].temperature+' &#8457;';
        document.getElementById('content').innerHTML = "Today's feeling: " + allData[last].userResponse;
    }catch (e) {
        console.log('error', e);
    }
};

/** other helper function*/
// convert temperature in kelvin to Fahrenheits
function kelvinToFahrenheit(k){
    const f = ((k-273.15)*1.8)+32;
    return f.toFixed(2);
}

/**
 * Helper functions - End
 * Click Event handler for generate button - Start
 *
 */

document.getElementById('generate').addEventListener('click', performAction);

/**
 * main function
 * async function of action performed when generate button clicked
 */
async function performAction(e) {
    // get zip code that user entered
    let zipEntered = document.querySelector('#zip').value;
    let newZipCode = `zip=${zipEntered},us`;
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.toDateString();
    // let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    // get user response of "How are you feeling today?"
    const userResponse = document.getElementById("feelings").value;

    // chain the promises
    getWeatherJournal(baseURL, newZipCode, apiKey)
        .then(function (weatherJournalData) {
            postWeatherJournal('/addData', {
                temperature: kelvinToFahrenheit(weatherJournalData.main['temp']),
                date: newDate,
                userResponse: userResponse
            });
        })
        .then(
            updateUI
        )
}

/**
 * async function of action performed when generate button clicked -End
 * Click Event handler for generate button - End
 */


