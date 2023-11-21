function alreadyStored(location) {
  const storedLocations = JSON.parse(localStorage.getItem("locationArray"));
  for (let i = 0; i < storedLocations.length; i += 1) {
    if (location.id === storedLocations[i].id) {
      return true;
    }
  }
  return false;
}

function determineIndex(location) {
  const storedLocations = JSON.parse(localStorage.getItem("locationArray"));
  for (let i = 0; i < storedLocations.length; i += 1) {
    if (location.id === storedLocations[i].id) {
      console.log(i);
      return i;
    }
  }
  return 0;
}

function storeLocation(location) {
  if (localStorage.getItem("locationArray")) {
    const storedLocations = JSON.parse(localStorage.getItem("locationArray"));
    // set another local storage item that sets the order of which the different cities are displayed, that way there will be no need for a new api call
    const orderArray = JSON.parse(localStorage.getItem("orderArray"));

    if (alreadyStored(location)) {
      storedLocations.splice(determineIndex(location), 1, location);
    } else {
      storedLocations.push(location);
      orderArray.push(storedLocations.length - 1);
    }

    localStorage.setItem("locationArray", JSON.stringify(storedLocations));
    localStorage.setItem("orderArray", JSON.stringify(orderArray));
  } else {
    const storedLocations = [];
    const orderArray = [];

    storedLocations.push(location);
    orderArray.push(0);
    localStorage.setItem("locationArray", JSON.stringify(storedLocations));
    localStorage.setItem("orderArray", JSON.stringify(orderArray));
  }
}
export { storeLocation };
