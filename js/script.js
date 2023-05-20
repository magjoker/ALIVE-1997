// good evening variables

let WeatherKey = "f90c5ff077454a27acde7bac5d0c02cd";

let searchForm = document.getElementById('searchForm');
let searchInput = document.getElementById('searchInput');
let searchHistory = document.getElementById('searchHistory');
let currant = document.getElementById('current');
let forecast = document.getElementById('forecast');

let searchLog;

function showHistory () {
    searchHistory.textContent = "";

    for (let i = 0; i < searchLog.length; i++) {
        let searchHistoryBtn = document.createElement("button");
        searchHistoryBtn.innerHTML = searchLog[i];
        searchHistory.append(searchHistoryBtn);
    }
}

function getHistory () {
    searchLog = JSON.parse(localStorage.getItem("searches")) || [];
    showHistory();
}

getHistory();

// this function renders the weather data on to the webpage by creating dynamic HTML elements

    function renderPrimusCurrant (data) {
        currant.textContent = "";
        let name = document.createElement('div')
        name.innerHTML = data.name;
        currant.append(name);

        let date = document.createElement('div')
        date.innerHTML = new Date(data.dt * 1000).toLocaleTimeString("en-US", {weekday: "short", year: "numeric", month: "long", day: "numeric"});
        currant.append(date);

        let temp = document.createElement('div')
        temp.innerHTML = data.main.temp;
        currant.append(temp);

        let humidity = document.createElement('div')
        humidity.innerHTML = data.main.humidity;
        currant.append(humidity);

        let windSpeed = document.createElement('div')
        windSpeed.innerHTML = data.wind.speed;
        currant.append(windSpeed);

        let icon = document.createElement('img')
        icon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        currant.append(icon);
    }

    function displayPrimusCurrant(name) {
    let cityName = name;
    let cityQuery = 
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" +
    "&appid=" + WeatherKey;

    fetch(cityQuery)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            renderPrimusCurrant(data);
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    let forecastHigh = -75;

    let forecastLow = 165;

    let avgWindSpeed = 0;

    let avgHumidity = 0;

    // in this function 

    function renderForecast(data) {
        forecast.textContent = "";
        let infoIndex = [7, 15, 23, 31, 39];
        for (let i = 0; i < data.list.length; i++) {
            let pillarOfWeather = document.createElement("div");
            let forecastIcon = document.createElement("img");

            if(data.list[i].main.temp_max > forecastHigh) {
                forecastHigh =  data.list[i].main.temp_max;
            }
            if(data.list[i].main.temp_min > forecastLow) {
                forecastLow =  data.list[i].main.temp_min;
            }

            avgHumidity = avgHumidity + data.list[i].main.humidity;
            avgWindSpeed = avgWindSpeed + data.list[i].wind.speed;

            if(infoIndex.includes(i)) {
                hiTemp = document.createElement("div");
                hiTemp.innerHTML = "High: " + parseInt(forecastHigh);
                pillarOfWeather.append(hiTemp);
                forecastHigh = -75;

                lowTemp = document.createElement("div");
                lowTemp.innerHTML = "Low: " + parseInt(forecastLow);
                pillarOfWeather.append(lowTemp);
                forecastLow = 165;

                humidity = document.createElement("div");
                humidity.innerHTML = "Humidity: " + parseInt(avgHumidity / 8);
                pillarOfWeather.append(humidity);
                avgHumidity = 0;

                windSpeed = document.createElement("div");
                windSpeed.innerHTML = "Wind: " + parseInt(avgWindSpeed / 8);
                pillarOfWeather.append(windSpeed);
                forecastHigh = 0;

                forecastIcon.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                pillarOfWeather.append(forecastIcon);

                forecast.append(pillarOfWeather);
            }
        }
    }

    function displayForecast (name) {
        let cityName = name;
    let forecastQuery = 
    "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" +
    "&appid=" + WeatherKey;

    fetch(forecastQuery)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            renderForecast(data);
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    function searchCity(e) {
        e.preventDefault()
        if (searchInput.value !== "") {
            displayPrimusCurrant(searchInput.value);
            displayForecast(searchInput.value);
            storedSearches.push(searchInput.value);
            localStorage.setItem("searches", JSON.stringify(storedSearches));
            getHistory();
        }
    }

    function searchCityFromHistory(name) {
        displayPrimusCurrant(name);
        displayForecast(name);
    }

    searchHistory.addEventListener("click", function (e) {
        searchCityFromHistory(e.target.innerHTML);
    });
    

searchForm.addEventListener("submit", searchCity);



