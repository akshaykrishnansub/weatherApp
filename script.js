document.addEventListener("DOMContentLoaded",()=>{
    const cityInput=document.getElementById("cityName");
    const getWeatherBtn=document.getElementById("getWeatherData");
    const weatherInfo=document.getElementById("weather-info");
    const cityNameDisplay=document.getElementById("city-name");
    const temperatureDisplay=document.getElementById("temperature");
    const descriptionDisplay=document.getElementById("description");
    const errorMessageDisplay=document.getElementById("error-message");

    const API_KEY="4d9ddfa660d5a23c33f013e93bf579b9"; //env variables

    getWeatherBtn.addEventListener("click",async()=>{
        const city=cityInput.value.trim(); //removes space if any in the entered text
        if(!city) return;

        //It may throw an error
        //server or database is always in a different continent
        try {
           const weatherData= await fetchWeatherData(city);
           displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }


    })
    async function fetchWeatherData(city){
        //get the weather data
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const response=await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);

        if(!response.ok){
            throw new Error("City Not Found");
        }
        const data=await response.json();
        return data;
    }
    function displayWeatherData(weatherData){
        //display the weather data
        console.log(weatherData);
        const {name,main,weather}=weatherData;
        const celcius=main.temp-273.15; //temperature conversion to celcius
        cityNameDisplay.textContent=name;
        temperatureDisplay.textContent=`Temperature: ${celcius.toFixed(1)} degree celcius`;
        descriptionDisplay.textContent=`Weather: ${weather[0].description}`;

        //unhide the display
        weatherInfo.classList.remove("hidden");
        errorMessageDisplay.classList.add("hidden");
    }
    function showError(){
        weatherInfo.classList.remove("hidden"); //removes hidden property when incorrect data is entered
        errorMessageDisplay.classList.remove("hidden"); //removes the hidden property while wrong data is entered
    }
});