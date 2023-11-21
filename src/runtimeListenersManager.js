function listenerToNavRow(allWeather) {
  if (allWeather != null) {
    for (let i = 0; i < allWeather.length; i += 1) {
      document
        .getElementById(allWeather[i].id)
        .addEventListener("click", () => {
          console.log(" work");
        });
    }
  }
}

export { listenerToNavRow };
