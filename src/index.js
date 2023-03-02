import grabWeather from "./apiCall";
import "./styles/main.css";
import { toggleNav } from "./ui";

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
eventEmit.subscribe("clickSearch", grabWeather);

document.querySelector(".toggleNav").addEventListener("click", () => {
  eventEmit.trigger("toggleNav");
});

document.querySelector(".searchButton").addEventListener("click", () => {
  eventEmit.trigger("clickSearch");
});
