const API_KEY = "f91d1a6e5c9498e2e6f34603336c6e7e";
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherInfo = document.querySelector("#weatherInfo");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherIcon = document.querySelector("#weatherIcon");
if (!cityInput ||
    !searchBtn ||
    !weatherInfo ||
    !cityName ||
    !temperature ||
    !humidity ||
    !wind ||
    !weatherIcon) {
    throw new Error("One or more DOM elements not found");
}
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});
async function fetchWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            const text = await response.text().catch(() => response.statusText || "");
            throw new Error(`API error ${response.status}: ${text || response.statusText}`);
        }
        const data = (await response.json());
        displayWeather(data);
    }
    catch (error) {
        console.error("fetchWeather error:", error);
        const msg = error instanceof Error ? error.message : String(error);
        alert(`Unable to fetch weather data: ${msg}`);
    }
}
function displayWeather(data) {
    if (!weatherInfo ||
        !cityName ||
        !temperature ||
        !humidity ||
        !wind ||
        !weatherIcon) {
        throw new Error("One or more DOM elements not found");
    }
    weatherInfo.style.display = "block";
    cityName.textContent = data.name;
    temperature.textContent = `🌡 Temperature: ${data.main.temp} °C`;
    humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
    wind.textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
//# sourceMappingURL=app.js.map