function formatSunrise(timestamp) {
  let date = new Date(timestamp);
  let suffix = "";

  let hours = date.getHours();

  if (hours > 11) {
    suffix += "PM";
  } else {
    suffix += "AM";
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  return `<em>Sunrise</em> = ${hours} : ${minutes} ${suffix}`;
}

function formatSunset(timestamp) {
  let date = new Date(timestamp);
  let suffix = "";

  let hours = date.getHours();

  if (hours > 11) {
    suffix += "PM";
  } else {
    suffix += "AM";
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  return `<em>Sunset</em> = ${hours} : ${minutes} ${suffix}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let today = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day} - ${month} ${today} `;
}

function displayTemp(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)} ˚C`;

  let descriptionElement = document.querySelector("#condition");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `<em>Wind </em>= ${Math.round(
    response.data.wind.speed
  )} m/h`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `<em>Humidity </em>= ${response.data.main.humidity} %`;
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formatSunrise(response.data.sys.sunrise * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatSunset(response.data.sys.sunset * 1000);
  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  let minElement = document.querySelector("#min");
  minElement.innerHTML = `${Math.round(response.data.main.temp_min)} ˚`;
  let feelElement = document.querySelector("#feel-like-temp");
  feelElement.innerHTML = `${Math.round(response.data.main.feels_like)} ˚`;
  let maxElement = document.querySelector("#max");
  maxElement.innerHTML = `${Math.round(response.data.main.temp_max)} ˚`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function getCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let formElement = document.querySelector("#form-input");
formElement.addEventListener("submit", getCity);
search("Genoa");
