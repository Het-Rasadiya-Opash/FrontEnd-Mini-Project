export {};
const API_KEY: string = process.env.API_KEY || "";

const cityInput = document.querySelector<HTMLInputElement>("#cityInput");
const searchBtn = document.querySelector<HTMLButtonElement>("#searchBtn");

const weatherInfo = document.querySelector<HTMLDivElement>("#weatherInfo");
const cityName = document.querySelector<HTMLElement>("#cityName");
const temperature =
  document.querySelector<HTMLParagraphElement>("#temperature");
const humidity = document.querySelector<HTMLParagraphElement>("#humidity");
const wind = document.querySelector<HTMLParagraphElement>("#wind");
const weatherIcon = document.querySelector<HTMLImageElement>("#weatherIcon");

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

if (
  !cityInput ||
  !searchBtn ||
  !weatherInfo ||
  !cityName ||
  !temperature ||
  !humidity ||
  !wind ||
  !weatherIcon
) {
  throw new Error("One or more DOM elements not found");
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city: string): Promise<void> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text().catch(() => response.statusText || "");
      throw new Error(
        `API error ${response.status}: ${text || response.statusText}`
      );
    }

    const data = (await response.json()) as WeatherResponse;
    displayWeather(data);
  } catch (error) {
    console.error("fetchWeather error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    alert(`Unable to fetch weather data: ${msg}`);
  }
}

function displayWeather(data: WeatherResponse): void {
  if (
    !weatherInfo ||
    !cityName ||
    !temperature ||
    !humidity ||
    !wind ||
    !weatherIcon
  ) {
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
