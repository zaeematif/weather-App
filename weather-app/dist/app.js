function updateWeatherIcon() {
  let tempHTML = `
            <img class="h-40 w-40" src="../image/sun.png" />`;

  document.querySelector("#weather-temp").innerHTML = tempHTML;
}

//using async await
async function getWeatherInfo(city) {
  try {
    const apiKey = "dfaba6119984ace35374df5b117f29b9";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

    const res = await fetch(apiUrl + city + `&appid=${apiKey}`);

    const data = await res.json();

    temp = (data.main.temp / 10).toFixed(2);
    humidity = data.main.humidity;
    windSpeed = data.wind.speed;

    const weatherInfo = {
      temp,
      humidity,
      windSpeed,
    };

    console.log(
      "Before sending info:  " +
        weatherInfo.temp +
        " " +
        weatherInfo.humidity +
        " " +
        weatherInfo.windSpeed
    );
    return weatherInfo;
  } catch (err) {
    console.log(err);
  }
}

//get city input
function getCityName() {
  const input = document.querySelector("#city-name");
  const btn = document.querySelector("#search-btn");
  let city;

  btn.addEventListener("click", () => {
    console.log(input.value);

    city = input.value.toLowerCase();

    async function showInfo() {
      const weatherInfo = await getWeatherInfo(city);
      console.log(
        "After recieving info:  " +
          weatherInfo.temp +
          " " +
          weatherInfo.humidity +
          " " +
          weatherInfo.windSpeed
      );
      updateWeaterInfo(city, weatherInfo);
    }

    showInfo();
  });
}

function updateWeaterInfo(city, weatherInfo) {
  let weatherIcon = "";

  //decide which weather image to upload
  if (weatherInfo.temp >= 30) {
    if (weatherInfo.windSpeed > 3) {
      weatherIcon += "storm";
    } else {
      weatherIcon += "sun";
    }
  } else if (weatherInfo.temp < 30 && weatherInfo.windSpeed > 3) {
    weatherIcon += "cloudy";
  } else if (weatherInfo.temp >= 20 && weatherInfo.humidity > 25) {
    weatherIcon += "humidity";
  } else {
    weatherIcon += "cloudyrain";
  }

  let tempHTML = `
            <img class="h-40 w-40" src="../image/${weatherIcon}.png" />`;

  document.querySelector("#weather-temp").innerHTML = tempHTML;

  document.querySelector("#weather-city").innerText = city.toUpperCase();
  document.querySelector("#temperature").innerText = weatherInfo.temp;

  document.querySelector("#humidity-percent").innerText =
    weatherInfo.humidity + " %";
  document.querySelector("#windspeed").innerText =
    weatherInfo.windSpeed + " km/h";
}


updateWeatherIcon();
getCityName();
