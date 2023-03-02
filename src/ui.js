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

export { toggleNav };
