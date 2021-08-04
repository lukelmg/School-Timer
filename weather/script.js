const api = {
    key: '',
    base: "http://api.openweathermap.org/data/2.5/",
    city: "Allentown"
}

getWeatherData();

async function getWeatherData() {

  let getWeather = fetch(
    `${api.base}weather?q=${api.city}&units=imperial&APPID=${api.key}`
  );

  getWeather
    .then((response) => {
      return response.json();
    })
    .then((resData) => {
      let weatherNum = Math.round(`${resData.main.temp}`);
      let desc = `${resData.weather[0].main}`;

      switch (desc) {
        case "Clouds":
            document.getElementById("weather-icon").className = "fas fa-cloud";
            break;

        case "Thunderstorm":
            document.getElementById("weather-icon").className = "fas fa-bolt";
            break;

        case "Drizzle":
            document.getElementById("weather-icon").className = "fas fa-cloud-rain";
          break;

        case "Rain":
            document.getElementById("weather-icon").className = "fas fa-cloud-showers-heavy";
            break;

        case "Snow":
            document.getElementById("weather-icon").className = "far fa-snowflake";
            break;

        case "Clear":
            document.getElementById("weather-icon").className = "fas fa-sun";
            break;

        default:
            document.getElementById("weather-icon").className = "fas fa-sun";
      }

      let weather = `Temp: ${weatherNum} °F`;
      document.getElementById("weather").innerHTML = weather;

      let currentWeather = `${weatherNum} °F`;
      document.getElementById("currentTemp").innerHTML = currentWeather;

      let realfeelNum = Math.round(`${resData.main.feels_like}`);
      let realfeel = `${realfeelNum} °F`;
      document.getElementById("realfeel").innerHTML = realfeel;

      let windspeedNum = Math.round(`${resData.wind.speed}`);
      let windspeed = `${windspeedNum} mph`;
      document.getElementById("windspeed").innerHTML = windspeed;

      let humidityNum = Math.round(`${resData.main.humidity}`);
      let humidity = `${humidityNum}%`;
      document.getElementById("humidity").innerHTML = humidity;

      let condition = `${resData.weather[0].description}`;
      document.getElementById("condition").innerHTML = condition;
    })
    .catch((error) => {
      document.getElementById("weather").innerHTML = "Error";
      document.getElementById("weather-icon").className = "fas fa-times";
      console.log("error");
      console.log(error);
    });
}

setInterval(getWeatherData, 900000); //refreshes the weather every 15 mins