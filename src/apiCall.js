import weatherClass from "./weatherClass";

async function grabWeather(searchInput) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=22baec14a2992148cccf002d980ee161&units=metric
  `,
    { mode: "cors" }
  );
  const rawWeather = await response.json();
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
    return Promise.resolve(weatherPack);
  }
  return Promise.reject(new Error(`${rawWeather.cod}. ${rawWeather.message}`));
}

export default grabWeather;
