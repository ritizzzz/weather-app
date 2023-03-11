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

function updateUI() {
  const weather = JSON.parse(
    localStorage.getItem(localStorage.key(localStorage.length - 1))
  );
  console.log(formatTimestamp(weather.time));
}
export { toggleNav, updateUI };
