import weatherClass from "./weatherClass";

async function grabWeather() {
  const searchInput = document.querySelector(".search").value;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=22baec14a2992148cccf002d980ee161
  `,
    { mode: "cors" }
  );
  const rawWeather = await response.json();
  if (rawWeather.cod === 200) {
    const city = rawWeather.name;
    const iconR = rawWeather.weather[0].icon;
    const weatherDescription = rawWeather.weather[0].description;
    const countryR = rawWeather.sys.country;
    const dateTime = rawWeather.dt + rawWeather.timezone;
    const weather = rawWeather.main.temp;
    const feelsLike = rawWeather.main.feels_like;
    const weatherPack = weatherClass(
      city,
      countryR,
      dateTime,
      weather,
      weatherDescription,
      feelsLike,
      iconR
    );
    localStorage.setItem(dateTime, JSON.stringify(weatherPack));
  }
}

export default grabWeather;
