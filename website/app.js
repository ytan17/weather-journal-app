/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/weather?";
let OpenWeatherApiKey = "edc8da4ad2db633b4f4474a6434dfc6a";
let apiKey = `&appid=${OpenWeatherApiKey}`;

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

    // chain the promises
    getWeatherJournal(baseURL, newZipCode, apiKey)
        .then(function (weatherJournalData) {
            postWeatherJournal('/addData', {
                temperature: weatherJournalData.main['temp'],
                date: newDate,
                userResponse: userResponse
            });
        })
        .then(
            updateUI
        )
}

// get method
const getWeatherJournal = async(baseURL, zipCode, apiKey) => {
    const request = await fetch(baseURL+zipCode+apiKey);
    try{
        const weatherJournalData = await request.json();
        return weatherJournalData;
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
    const request = await fetch('/all');
    console.log('updateUIRequest', request);
    try{
        const allData = await request.json();
        const last = allData.length - 1;
        document.getElementById('date').innerHTML = allData[last].date;
        document.getElementById('temp').innerHTML = allData[last].temperature;
        document.getElementById('content').innerHTML = allData[last].userResponse;
    }catch (e) {
        console.log('error', e);
    }
};
