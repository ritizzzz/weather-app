async function grabWeather() {
  const searchInput = document.querySelector(".search").value;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=22baec14a2992148cccf002d980ee161
  `,
    { mode: "cors" }
  );
  const weather = await response.json();
  console.log(weather);
}

export default grabWeather;
