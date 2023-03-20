/* eslint-disable no-underscore-dangle */

function weatherClass(
  id,
  city,
  country,
  time,
  weather,
  weatherDescription,
  feelsLike,
  icon
) {
  return {
    id,
    city,
    country,
    time,
    weather,
    weatherDescription,
    feelsLike,
    icon,
  };
}
export default weatherClass;
