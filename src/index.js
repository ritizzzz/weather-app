import "./styles/main.css";

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

eventEmit.subscribe("toggleNav", toggleNav);

document.querySelector(".toggleNav").addEventListener("click", () => {
  eventEmit.trigger("toggleNav");
});
