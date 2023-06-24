const apiKey = "c61b11c1c859847f4bcf6238374b88bc";
let input = document.getElementById('city-search');
let searchBtn = document.getElementById('searchbtn');
let searchContainer = document.getElementById('search-container');
let cityData = document.getElementById('city-info');
let cityName = document.getElementById('city-name');
let cityWeather = document.getElementById('city-weather');
let forecastContainer = document.getElementById('forecast-container');
//let currentDate = dayjs().format('dddd MMMM, DD HH');

const emojiUnicode = {
  "01d": "\u2600",  // Clear sky (sun)
  "01n": "\uD83C\uDF11",  // Clear sky (moon)
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
  //if theres a message ther it will delete it forst 
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
            console.log(data);
            displayWeather(data);
            getForecast(data);
            
          })
          //will run if it cant call the api
        } else {
          console.log('Error: Cannot reach API');
          displaymessage ();
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
    cityName.textContent = `${city} ${currentDate} ${emoji}`;
    cityWeather.innerHTML = `Temperature: ${temp}°F<br> Wind: ${wind}MPH<br> Humidity: ${humidity}%<br>`;
  }

  let getWeatherForecast = data =>{
    //will run throught the loop 40 times
    for (let i = 0; i < data.cnt; i++) {
      if (i % 8 === 0) { //will only get 5 day worth of forecast
        
        continue; // Skip the current iteration when i is divisible by 8
      }
    
    }
    console.log(data);
  }
  let getForecast = function(data){
    let lon = data.coord.lon.toFixed(2);
    let lat = data.coord.lat.toFixed(2);
    let forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let city = data.name;
    let temp = data.main.temp;
    let wind = data.wind.speed;
    let humidity = data.main.humidity;

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

  