/* eslint-disable no-underscore-dangle */

function weatherClass(
  city,
  country,
  time,
  weather,
  weatherDescription,
  feelsLike
) {
  const _city = city;
  const _country = country;
  const _time = time;
  const _weather = weather;
  const _weatherDescription = weatherDescription;
  const _feelsLike = feelsLike;

  const getCity = () => _city;
  const getCountry = () => _country;
  const getTime = () => _time;
  const getWeather = () => _weather;
  const getWeatherDescription = () => _weatherDescription;
  const getFeelsLike = () => _feelsLike;

  return {
    getCity,
    getCountry,
    getTime,
    getWeather,
    getWeatherDescription,
    getFeelsLike,
  };
}
export default weatherClass;
