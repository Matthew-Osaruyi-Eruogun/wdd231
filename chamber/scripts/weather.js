const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '51b762834da80ab58a31c482684828a2';
const CITY_QUERY = "Benin City,NG";
const UNITS = 'imperial';

async function getWeatherData() {
    try {
        // Fetch Current Weather
        const currentResponse = await fetch(`${CURRENT_WEATHER_URL}?q=${CITY_QUERY}&units=${UNITS}&appid=${API_KEY}`);
        if (!currentResponse.ok) throw new Error(`Current Weather failed: ${currentResponse.status}`);
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        // Fetch 5-Day Forecast
        const forecastResponse = await fetch(`${FORECAST_URL}?q=${CITY_QUERY}&units=${UNITS}&appid=${API_KEY}`);
        if (!forecastResponse.ok) throw new Error(`Forecast failed: ${forecastResponse.status}`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const weatherContainer = document.getElementById('current-weather');
    if (!data) return;

    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Added @2x for better resolution

    weatherContainer.innerHTML = `
        <div class="weather-info">
            <img src="${iconUrl}" alt="${desc}">
            <p><strong>${temp}°F</strong> - ${desc}</p>
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    if (!data || !data.list) return;

    forecastContainer.innerHTML = '<h3>3-Day Forecast</h3>';

    // Filter to get one forecast per day (targeting ~12:00 PM)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(forecast.main.temp);

        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `<p>${dayName}: <strong>${temp}°F</strong></p>`;
        forecastContainer.appendChild(dayElement);
    });
}

getWeatherData();