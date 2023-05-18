// good evening variables

let WeatherKey = "f90c5ff077454a27acde7bac5d0c02cd";

let searchForm = document.getElementById('searchForm');
let searchInput = document.getElementById('searchInput');
let searchHistory = document.getElementById('searchHistory');
let current = document.getElementById('current');
let forecast = document.getElementById('forecast');


// 
let cityName = "Charlotte";
let cityQuery = 
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +
    "&appid=" + WeatherKey;

let forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName +
    "&appid=" + WeatherKey;

fetch(forecastQuery)
    .then(function (res) {
    return res.json();
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.log(err)
    });





