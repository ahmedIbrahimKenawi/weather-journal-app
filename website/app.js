/* Global Variables */
const apiKey = "b01150814fff58b5fd0a587d40b0d53f";

// Create a new date instance dynamically with JS
function newDate (){
    let d = new Date();
    let date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    return date
}

// get zipcode from user entery
function getZipCode(){
    const code =  document.getElementById('zip').value;
    if(code === ''){
        alert('Please, Enter Zipcode.')
        throw Error('no zipCode')
    }
    return code;     
}

// // get content from user entery
function getContent(){
    const content = document.getElementById('feelings').value; 
    if(content === ''){
        alert('Please, Enter content.')
        throw Error('no content')
    }
    return content; 
}

const btn = document.getElementById("generate");

btn.addEventListener('click', callback)

async function callback(e){
    e.preventDefault();

    try {
        const date = newDate();
        const zipCode = getZipCode();
        const content = getContent();

        // get temperature from OpenWeather website.
        const temp = await getTempFromOpenWeather(apiKey, zipCode);

        // then post data to server.
        await  postWeather('/weather', {date, temp, content});
        
        // then get data from server.
        const data = await getWeather('/weather');

        // update ui with new data.
        updateUI(data);

        
    } catch (error) {
        console.log(error)
    }    
}

async function getTempFromOpenWeather(key, zipCode){

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}&units=metric`);
    const data = await response.json();  

    if(data.cod === '404'){
        alert(data.message)
        throw Error('Invalid zipCode')
    }
    
    const temp = data.main.temp;
    return temp
}


async function postWeather(url, data){
    let response = await fetch( url , {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( data ),  
    });

    let resData = await response.text();
    return resData
}

async function getWeather(url){
    let response = await fetch(url)
    let data = await response.json();
    return data
}




function updateUI({date, temp, content}){
    let div = document.getElementById('data');
    div.classList.remove('hide');

    div.insertAdjacentHTML('beforeend', `
    <div class = "entryHolder">
       <div>Date : ${date}</div> 
       <div>Temperature : ${temp}</div>
       <div>Content : ${content}</div>
    </div>`)
}