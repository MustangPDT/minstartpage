const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const weatherKey= '1df6cc34f5003b23725c7a8b4fd89541';
const weatherIcons = 'Dark'; // 'Nord', 'Dark', 'White'
const weatherUnit = 'F';
const weatherLatitude = '34.73';
const weatherLongitude = '-92.24';

// App data
const weather = {};
weather.temperature = {
  unit: 'celsius',
};

// Change to 'F' for Fahrenheit
var tempUnit = weatherUnit;

const KELVIN = 273.15;
// Use your own key for the Weather, Get it here: https://openweathermap.org/
const key = `${weatherKey}`;

// Set Position function
setPosition();

function setPosition(position) {

  getWeather(weatherLatitude, weatherLongitude);
}

// Get the Weather data
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  console.log(api);

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      let celsius = Math.floor(data.main.temp - KELVIN);
      weather.temperature.value =
        tempUnit == 'C' ? celsius : (celsius * 9) / 5 + 32;
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
    })
    .then(function () {
      displayWeather();
    });
}

// Display Weather info
function displayWeather() {
  iconElement.innerHTML = `<img src="assets/icons/${weatherIcons}/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span class="darkfg">${tempUnit}</span>`;
  descElement.innerHTML = weather.description;
}
