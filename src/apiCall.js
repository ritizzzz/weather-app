import weatherClass from "./weatherClass";

async function grabWeather() {
  const searchInput = document.querySelector(".search").value;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=22baec14a2992148cccf002d980ee161&units=metric
  `,
    { mode: "cors" }
  );
  const rawWeather = await response.json();
  console.log(rawWeather);
  if (rawWeather.cod === 200) {
    const idR = rawWeather.id;
    const city = rawWeather.name;
    const iconR = rawWeather.weather[0].icon;
    const weatherDescription = rawWeather.weather[0].description;
    const countryR = rawWeather.sys.country;
    const dateTime = rawWeather.dt + rawWeather.timezone;
    const weather = rawWeather.main.temp;
    const feelsLike = rawWeather.main.feels_like;

    const weatherPack = weatherClass(
      idR,
      city,
      countryR,
      dateTime,
      weather,
      weatherDescription,
      feelsLike,
      iconR
    );

    if (localStorage.getItem("locationArray")) {
      const storedLocations = JSON.parse(localStorage.getItem("locationArray"));
      storedLocations.push(weatherPack);
      localStorage.setItem("locationArray", JSON.stringify(storedLocations));
    } else {
      const storedLocations = [];
      storedLocations.push(weatherPack);
      localStorage.setItem("locationArray", JSON.stringify(storedLocations));
    }
  } else {
    return Promise.reject(
      new Error(`${rawWeather.cod}. ${rawWeather.message}`)
    );
  }

  return Promise.resolve();
}

export default grabWeather;
