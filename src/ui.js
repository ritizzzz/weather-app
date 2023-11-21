import { format } from "date-fns";
import { formatTimestamp } from "unixtimezone.js";

function toggleNav() {
  const nav = document.querySelector("nav");
  const toggleNavButton = document.querySelector(".toggleNav");
  if (nav.classList.contains("close")) {
    nav.style.right = "-100%";
    toggleNavButton.style.transform = "rotate(0deg)";
  } else {
    nav.style.right = "0%";
    toggleNavButton.style.transform = "rotate(45deg)";
  }
  nav.classList.toggle("close");
}

function updateUI(weather) {
  const cityWeather = weather;
  document.querySelector(".weatherDescription").innerText =
    cityWeather.weatherDescription;
  document.querySelector(
    ".feelsLike"
  ).innerText = `feels like ${cityWeather.feelsLike} `;
  document.querySelector(".temp").innerText = `${cityWeather.weather}°C`;
  document
    .querySelector(".weatherIcon")
    .setAttribute(
      "src",
      ` https://openweathermap.org/img/wn/${cityWeather.icon}@2x.png`
    );
  document.querySelector(".city").innerText = cityWeather.city;

  const dateString = formatTimestamp(cityWeather.time).split(" ")[0].split("-");
  const dateDate = new Date(
    Number(dateString[0]),
    Number(dateString[1] - 1),
    Number(dateString[2])
  );
  document.querySelector(".date").innerText = format(dateDate, "cccc do MMMM");
}

function updateNav(weatherArray) {
  if (weatherArray != null) {
    // delete all navigation rows
    document.querySelector(".savedLocations").innerText = "";
    // populate it back with the new changes
    for (let i = 0; i < weatherArray.length; i += 1) {
      const weatherLoop = weatherArray[i];

      const rowSavedLocations = document.createElement("div");
      rowSavedLocations.setAttribute("class", "rowSavedLocations");
      const locationName = document.createElement("h3");
      locationName.innerText = weatherLoop.city;
      rowSavedLocations.appendChild(locationName);
      const icon = document.createElement("img");
      icon.setAttribute("class", "icon");
      icon.setAttribute("src", "delete-empty.svg");
      icon.style.zIndex = "1";
      rowSavedLocations.appendChild(icon);
      rowSavedLocations.setAttribute("id", weatherLoop.id);
      document.querySelector(".savedLocations").appendChild(rowSavedLocations);
    }
  }
}

export { toggleNav, updateUI, updateNav };
