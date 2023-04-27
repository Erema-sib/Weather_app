const apiKey = "6e6243636881dd40c732683e79df997b";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherIcon = document.querySelector(".weather-image i");

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&lang=ru&appid=${apiKey}`);
    if (response.status == 404) {
        error.style.display = "block";
        weather.style.display = "none";
    }
    const data = await response.json();
    // console.log(data, "data");

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " " + "&#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "км/ч";
   
    switch (data.weather[0].main) {
        case "Clear":
            weatherIcon.className = "fa-solid fa-sun";
            break;
          case "Rain":
            weatherIcon.className = "fa-solid fa-cloud-rain";
            break;
          case "Mist":
            weatherIcon.className = "fas fa-smog";
            break;
          case "Drizzle":
            weatherIcon.className = "fas fa-cloud-sun-rain";
            break;
            case "Thunderstorm":
            weatherIcon.className = "fa-solid fa-cloud-bolt";
            break;
            case "Snow":
            weatherIcon.className = "fa-regular fa-snowflake";
            break;
            case "Clouds":
            weatherIcon.className = "fa-solid fa-cloud";
            break;
        }

       weather.style.display = "block";
       error.style.display = "none";
}

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", handleSearch);

function handleSearch(event) {
    if (event.key === "Enter" || event.type === "click") {
        checkWeather(searchInput.value);
        searchInput.value = "";
    }
}

