import grabWeather from "./apiCall";
import "./styles/main.css";
import { toggleNav, updateNav, updateUI } from "./ui";

const eventEmit = (() => {
  const events = {};

  const subscribe = (type, callBack) => {
    if (events[type]) {
      events[type].push(callBack);
    } else {
      events[type] = [callBack];
    }
  };

  const trigger = (type, ...args) => {
    if (events[type]) {
      events[type].forEach((callback) => {
        callback(...args);
      });
    }
  };

  return { subscribe, trigger };
})();

eventEmit.subscribe("toggleNav", toggleNav);
eventEmit.subscribe("weatherGrabbed", toggleNav);
eventEmit.subscribe("weatherGrabbed", updateUI);
eventEmit.subscribe("weatherGrabbed", updateNav);

document.querySelector(".toggleNav").addEventListener("click", () => {
  eventEmit.trigger("toggleNav");
});

document.querySelector(".searchButton").addEventListener("click", () => {
  document.querySelector(".overlay").style.top = "0px";

  grabWeather()
    .then(() => {
      const allWeather = JSON.parse(localStorage.getItem("locationArray"));
      eventEmit.trigger("weatherGrabbed", [allWeather[allWeather.length - 1]]);
      document.querySelector(".overlay").style.top = "-120%";
    })
    .catch((err) => {
      console.log(err);
      document.querySelector(".overlay").style.top = "-120%";
    });
});
