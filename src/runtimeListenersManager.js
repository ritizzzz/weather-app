function listenerToNavRow(allWeather) {
  for (let i = 0; i < allWeather.length; i += 1) {
    console.log(allWeather);
    document.getElementById(allWeather[i].id).addEventListener("click", () => {
      console.log("hello lol");
    });
  }
}

export default listenerToNavRow;
