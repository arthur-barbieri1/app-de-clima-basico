const apiKey = "e67c776df83402a95722f1d8168e8cce"; // pegei a chave no openweathermap.org
const button = document.getElementById("search");

button.addEventListener("click", () => {
    const city = document.getElementById("city").value;
    getWeather(city);
});


function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`)
    .then(response => response.json ())
    .then(data => showWeather(data))
    .catch(error => console.log("Erro:", error));
}


function showWeather(data) {
    if (data.cod === "404") {
        document.getElementById("result").innerHTML = "Cidade não encontrada";
        return;
    }


    document.getElementById("result").innerHTML = `
    <h2>${data.name}</h2>
    <p>🌡️ Temperatura: ${data.main.temp}°C</p>
    <p>💨 Vento: ${data.wind.speed} m/s</p>
    <p>☁️ Clima: ${data.weather[0].description}</p>
  `;
}