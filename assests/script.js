const apiKey = "c61b11c1c859847f4bcf6238374b88bc";
// let input = document.getElementById('city-search');
let input= "London";

function  getWeather() {
    let weatherURL =`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;

    console.log(weatherURL);
    fetch(weatherURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            console.log(data.coord);
            
            // displayRecipes(data);
            
          });
          //will run if it cant call the api
        } else {
          console.log('Error: Cannot reach API');
        }
      })
      //will run if it cant connect to the server
      .catch(function (error) {
        //console.log('error');
      });
    //console logs th user input
    console.log(input);
  }
  window.addEventListener('load', getWeather);
  console.log('what');

  