import grabWeather from "./apiCall";
import "./styles/main.css";
import { toggleNav, updateUI } from "./ui";

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

document.querySelector(".toggleNav").addEventListener("click", () => {
  eventEmit.trigger("toggleNav");
});

document.querySelector(".searchButton").addEventListener("click", () => {
  grabWeather().then(() => {
    eventEmit.trigger("weatherGrabbed");
  });
});
