import grabWeather from "./apiCall";
import eventEmit from "./eventEmit";
import { toggleNav, updateNav, updateUI } from "./ui";
import { storeLocation, deleteLocation } from "./storage";

eventEmit.subscribe("fetchWhenClicked", toggleNav); // close the nav
eventEmit.subscribe("fetchWhenClicked", storeLocation); // Store the location to local storage
eventEmit.subscribe("fetchWhenClicked", updateUI); // update the main interface with the information

eventEmit.subscribe("locationDeleted", toggleNav);
eventEmit.subscribe("locationDeleted", updateNav);
// eslint-disable-next-line no-use-before-define
eventEmit.subscribe("locationDeleted", listenerToNavRow);

function loadWeatherInfo(event) {
  document.querySelector(".overlay").style.top = "0px";
  const searchValue = event.target.querySelector("h3").innerText;
  grabWeather(searchValue)
    // after the grab weather function has resolved successfully, trigger the weather grabbed event
    .then((location) => {
      eventEmit.trigger("fetchWhenClicked", location);
      document.querySelector(".overlay").style.top = "-120%";
    })
    // if something goes wrong, output the error
    .catch((err) => {
      console.log(err);
      document.querySelector(".overlay").style.top = "-120%";
    });
}

function deleteLocationCallback(event) {
  const locationId = event.target.parentNode.id;
  deleteLocation(locationId);
  eventEmit.trigger(
    "locationDeleted",
    JSON.parse(localStorage.getItem("locationArray"))
  );
}

function listenerToNavRow(allWeather) {
  if (allWeather != null) {
    for (let i = 0; i < allWeather.length; i += 1) {
      const row = document.getElementById(allWeather[i].id);
      row.addEventListener("click", (event) => {
        if (event.target.classList.contains("icon")) {
          deleteLocationCallback(event);
        } else {
          loadWeatherInfo(event);
        }
      });
    }
  }
}

export default listenerToNavRow;
