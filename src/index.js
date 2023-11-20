import grabWeather from "./apiCall";
import "./styles/main.css";
import { toggleNav, updateNav, updateUI } from "./ui";
import eventEmit from "./eventEmit";
import { listenerToNavRow } from "./runtimeListenersManager";

eventEmit.subscribe("toggleNav", toggleNav);
eventEmit.subscribe("weatherGrabbed", toggleNav); // close the nav
eventEmit.subscribe("weatherGrabbed", updateUI); // update the main interface with the information
eventEmit.subscribe("weatherGrabbed", updateNav); // update the navigation
eventEmit.subscribe("weatherGrabbed", listenerToNavRow); // add a listener to the nav rows, show the buttons for each button

document.querySelector(".toggleNav").addEventListener("click", () => {
  eventEmit.trigger("toggleNav");
});

document.querySelector(".searchButton").addEventListener("click", () => {
  // set the loading overlay as on when the search button is clicked
  document.querySelector(".overlay").style.top = "0px";

  grabWeather()
    // after the grab weather function has resolved successfully, trigger the weather grabbed event
    .then(() => {
      const allWeather = JSON.parse(localStorage.getItem("locationArray"));
      eventEmit.trigger("weatherGrabbed", [allWeather[allWeather.length - 1]]);
      document.querySelector(".overlay").style.top = "-120%";
    })
    // if something goes wrong, output the error
    .catch((err) => {
      console.log(err);
      document.querySelector(".overlay").style.top = "-120%";
    });
});
