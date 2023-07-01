const apiKey = "c61b11c1c859847f4bcf6238374b88bc";
let input = document.getElementById('city-search');
let searchBtn = document.getElementById('searchbtn');
let searchContainer = document.getElementById('search-container');
let cityData = document.getElementById('city-info');
let cityName = document.getElementById('city-name');
let cityWeather = document.getElementById('city-weather');
let forecastContainer = document.getElementById('forecast-container');
let forecastTitle = document.getElementById('forecast-title');
let currentDate = dayjs().format('MMMM, DD YYYY');

let city1 = document.getElementById('city1');
let city2 = document.getElementById('city2');
let city3 = document.getElementById('city3');
let city4 = document.getElementById('city4');
let city5 = document.getElementById('city5');
let city6 = document.getElementById('city6');
let city7 = document.getElementById('city7');

const emojiUnicode = {
  "01d": "☀️",  // Clear sky (sun)
  "01n": "🌕",  // Clear sky (moon)
  "02d": "\uD83C\uDF24",  // Few clouds
  "02n": "\uD83C\uDF25",  // Few clouds
  "03d": "\uD83C\uDF25",  // Scattered clouds
  "03n": "\uD83C\uDF25",  // Scattered clouds
  "04d": "\uD83C\uDF27",  // Broken clouds
  "04n": "\uD83C\uDF27",  // Broken clouds
  "09d": "\uD83C\uDF27",  // Shower rain
  "09n": "\uD83C\uDF27",  // Shower rain
  "10d": "\uD83C\uDF26",  // Rain
  "10n": "\uD83C\uDF26",  // Rain
  "11d": "\u26C8",  // Thunderstorm
  "11n": "\u26C8",  // Thunderstorm
  "13d": "\uD83C\uDF28",  // Snow
  "13n": "\uD83C\uDF28",  // Snow
  "50d": "\uD83C\uDF2B",  // Mist
  "50n": "\uD83C\uDF2B"  // Mist
};

//let input= "London";

let displaymessage = function (){
  //if theres a message their it will delete it first 
  let existingMessage = document.getElementById('error-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  //creates a button to display error message
  let message = document.createElement('button');
  message.id = 'error-message';
  message.textContent = `No result for "${input.value}" try again`;
  searchBtn.parentNode.insertBefore(message, searchBtn.nextSibling);
  dataInfo.append(message);

}
function getWeather() {
    let weatherURL =`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=imperial`;

    fetch(weatherURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayWeather(data);
            getForecast(data);
            
          })
          //will run if it cant call the api
        } else {
          console.log('Error: Cannot reach API');
          displaymessage();
        }
      })
      //will run if it cant connect to the server
      .catch(function (error) {
        console.log('error');
      });
    //console logs th user input
  }

  //will display the name of the city and current weather
  let displayWeather = data => {
    //grabs the data needed to display the weather
    let city = data.name;
    let temp = data.main.temp;
    let wind = data.wind.speed;
    let humidity = data.main.humidity;
    let iconCode = data.weather[0].icon;
    let emoji = emojiUnicode[iconCode];

    //display weather in div
    cityName.textContent = `${city} (${currentDate}) ${emoji}`;
    cityWeather.innerHTML = `Temperature: ${temp}°F<br> Wind: ${wind}MPH<br> Humidity: ${humidity}%<br>`;
  }

  let getWeatherForecast = data =>{
    forecastContainer.innerHTML = '';
  let dateindex = 0;
    //will run through the loop 40 times
    for (let i = 0; i < data.cnt; i++) {
      if (i % 8 === 0) { //will only get 5 day worth of forecast
        //console.log(city,temp,wind,humidity,emoji);
        //get the data need to add to HTML
        let temp = data.list[i].main.temp;
        let wind = data.list[i].wind.speed;
        let humidity = data.list[i].main.humidity;
        let iconCode = data.list[i].weather[0].icon;
        let emoji = emojiUnicode[iconCode];

        let forecast = document.createElement('div');
        forecast.id = 'forecast';

        let date = document.createElement('h3');
        date.id = `date${dateindex}`;
        dateindex++;

        let weather = document.createElement('p');
        weather.id = 'weather';

        weather.innerHTML = `${emoji}<br>Temperature: ${temp}°F<br> Wind: ${wind}MPH<br> Humidity: ${humidity}%<br>`;

        forecast.appendChild(date);
        forecast.appendChild(weather);
        forecastContainer.append(forecast);
        continue; // Skip the current iteration when i is divisible by 8
      }
    }
       for (let j = 0 ; j < 5 ; j++) {
        let date = document.getElementById(`date${j}`);
        console.log(date);
         futureDate = dayjs().add(j,'day').format('MMMM, DD YYYY');
         console.log(futureDate);
         console.log(`date${j}`);
         // get the next line to work 
         date.innerHTML = futureDate;
    }
  }
  //get the forecast information
  let getForecast = function(data){
    let lon = data.coord.lon.toFixed(2);
    let lat = data.coord.lat.toFixed(2);
    let forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      fetch(forecastWeatherURL)
      .then(function(response){
        if (response.ok){
          response.json().then(function(data){
            getWeatherForecast(data);

          })
        } else {
          console.log('Error: Cannot reach API');
        }
      })
        .catch(function (error) {
          console.log('error');
        });
      }
    
  searchBtn.addEventListener("click", function() {
  getWeather();
  });

  window.addEventListener('load', function() {
    input.value = "San Francisco";
    getWeather(input.value);
  });


  city1.addEventListener('click', function (){
    input.value = "Los Angeles";
    getWeather(input.value);
  });
  city2.addEventListener('click', function (){
    input.value = "Atlanta";
    getWeather(input.value);
  });
  city3.addEventListener('click', function (){
    input.value = "New York";
    getWeather(input.value);
  });
  city4.addEventListener('click', function (){
    input.value = "London";
    getWeather(input.value);
  });
  city5.addEventListener('click', function (){
    input.value = "Paris";
    getWeather(input.value);
  });
  city6.addEventListener('click', function (){
    input.value = "Austin";
    getWeather(input.value);
  });
  city7.addEventListener('click', function (){
    input.value = "Miami";
    getWeather(input.value);
  });