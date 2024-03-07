const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-img");
const temprature = document.querySelector(".temprature");
const description = document.querySelector(".description");
const humadity = document.getElementById("humadity");
const windSpeed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const APIkey = "99d0947f1fab432f1608484b603bcced";
  const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
  const weatherData = await fetch(`${Url}`).then((response) => response.json());
  if (weatherData.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";

  temprature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  humadity.innerHTML = `${Math.round(weatherData.main.humidity)}%`;
  windSpeed.innerHTML = `${Math.round(weatherData.wind.speed)}km/h`;
  description.innerHTML = `${weatherData.weather[0].description}`;

  switch (weatherData.weather[0].main) {
    case "Clouds": {
      weatherImg.src = "cloud.png";
      break;
    }
    case "Clear": {
      weatherImg.src = "clear.png";
      break;
    }
    case "Mist": {
      weatherImg.src = "mist.png";
      break;
    }
    case "Rain": {
      weatherImg.src = "rain.png";
      break;
    }
    case "Snow": {
      weatherImg.src = "snow.png";
      break;
    }
  }
}
searchBtn.addEventListener("click", (event) => {
  checkWeather(inputBox.value);
  inputBox.value = "";
});
