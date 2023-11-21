import grabWeather from "./apiCall";
import "./styles/main.css";
import { toggleNav, updateNav, updateUI } from "./ui";
import eventEmit from "./eventEmit";
import listenerToNavRow from "./runtimeListenersManager";
import { storeLocation } from "./storage";

eventEmit.subscribe("init", updateNav); // update the navigation with previously saved locations upon start up
eventEmit.subscribe("init", listenerToNavRow); // add a listener to the nav rows

// Set initial city
grabWeather("London").then((location) => {
  updateUI(location);
});

// triggering init upon the website loading
// saved locations retrived from local storage
eventEmit.trigger("init", JSON.parse(localStorage.getItem("locationArray")));

eventEmit.subscribe("toggleNav", toggleNav);
// stage 1 and stage 2 use different parameters
// stage 1 needs the retreived weather info of the location
// while stage 2 needs all stored location and weather info
eventEmit.subscribe("weatherGrabbedStage1", toggleNav); // close the nav
eventEmit.subscribe("weatherGrabbedStage1", storeLocation); // Store the location to local storage
eventEmit.subscribe("weatherGrabbedStage1", updateUI); // update the main interface with the information

eventEmit.subscribe("weatherGrabbedStage2", updateNav); // update the navigation
eventEmit.subscribe("weatherGrabbedStage2", listenerToNavRow); // add a listener to the nav rows, show the buttons for each button

document.querySelector(".toggleNav").addEventListener("click", () => {
  eventEmit.trigger("toggleNav");
});

document.querySelector(".searchButton").addEventListener("click", () => {
  // set the loading overlay as on when the search button is clicked
  document.querySelector(".overlay").style.top = "0px";
  const searchValue = document.querySelector(".search").value;
  document.querySelector(".search").value = "";
  grabWeather(searchValue)
    // after the grab weather function has resolved successfully, trigger the weather grabbed event
    .then((location) => {
      eventEmit.trigger("weatherGrabbedStage1", location);
      const allWeather = JSON.parse(localStorage.getItem("locationArray"));
      eventEmit.trigger("weatherGrabbedStage2", allWeather);
      document.querySelector(".overlay").style.top = "-120%";
    })
    // if something goes wrong, output the error
    .catch((err) => {
      console.log(err);
      document.querySelector(".overlay").style.top = "-120%";
    });
});
