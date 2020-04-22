/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/weather?";
let OpenWeatherApiKey = "edc8da4ad2db633b4f4474a6434dfc6a";
let apiKey = `&appid=${OpenWeatherApiKey}`;
// data that get from OpenWeather API
let weatherJournalData;
// temperature that get from data object
let temp;

// Click Event handler for generate button
document.getElementById('generate').addEventListener('click', performAction);

// action performed when generate button clicked
async function performAction(e) {
    // get zip code that user entered
    let zipEntered = document.querySelector('#zip').value;
    let newZipCode = `zip=${zipEntered},us`;
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    // get user response of "How are you feeling today?"
    const userResponse = document.getElementById("feelings").value;

    // console.log('newZipCode', newZipCode);
    // console.log('newDate', newDate);
    // console.log('url', baseURL + newZipCode + apiKey);

    // chain the promises
    getWeatherJournal(baseURL, newZipCode, apiKey)
        .then(
            await postWeatherJournal('/addData', {
                temperature: temp,
                date: newDate,
                userResponse: userResponse
            })
        )
        .then(
            updateUI
        )
}

// get method
const getWeatherJournal = async(baseURL, zipCode, apiKey) => {
    const request = await fetch(baseURL+zipCode+apiKey);
    try{
        weatherJournalData = await request.json();
        temp = weatherJournalData.main['temp'];
        // console.log('url', baseURL+zipCode+apiKey)
        // console.log('data',weatherJournalData);
        // console.log('temp', temp);
    }catch (e) {
        console.log('error', e);
    }
};

// post method
const postWeatherJournal = async(url = '', data = {}) => {
    console.log('postData', data);
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
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};


// update UI method
const updateUI = async() =>{
    const request = await fetch('/data');
    try{
        const allData = await request.json();
        document.getElementById('data').innerHTML = allData[-1].date;
        document.getElementById('temp').innerHTML = allData[-1].temperature;
        document.getElementById('content').innerHTML = allData[-1].userResponse;
    }catch (e) {
        console.log('error', e);
    }
}
