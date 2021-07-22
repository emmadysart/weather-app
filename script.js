const axios = require("axios");

const apiKey = "b5ca422e4ad0584fd802b1fdcffc7375";
const units = "metric";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

const now = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDay = days[now.getDay()];
const currentHour = now.getHours();
const currentMinutes = now.getMinutes();

// HTML Elements
const dateEl = document.querySelector("#today_date");
const locationEl = document.querySelector("#location");
const formEl = document.querySelector("#query");
const temperatureEl = document.querySelector("#temperature");
const descriptionEl = document.querySelector("#weather_description");
const searchFieldEl = document.querySelector("#search_bar");
const currentLocationButtonEl = document.querySelector("button");

// Set current date/time
dateEl.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

// Event Listeners
currentLocationButtonEl.addEventListener("click", getCurrentlocation);
formEl.addEventListener("submit", searchCity);

// Functions
function getCurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function updateWeatherPanel(response) {
  searchFieldEl.value = ``;
  temperatureEl.innerHTML = `${Math.round(response.data.main.temp)}`;
  descriptionEl.innerHTML = response.data.weather[0].description;
  locationEl.innerHTML = response.data.name;
}

function searchCurrentLocation(currentLocation) {
  let lat = currentLocation.coords.latitude;
  let lon = currentLocation.coords.longitude;
  let apiUrl = `${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeatherPanel);
}

function searchCity(event) {
  event.preventDefault();
  let city = searchFieldEl.value;
  let apiUrl = `${baseUrl}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeatherPanel);
}
