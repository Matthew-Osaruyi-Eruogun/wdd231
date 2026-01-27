const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '51b762834da80ab58a31c482684828a2';
const CITY_QUERY = "Benin City,NG";
const UNITS = 'imperial';

async function getWeatherData() {
    try {
        const currentResponse = await fetch(`${CURRENT_WEATHER_URL}?q=${CITY_QUERY}&units=${UNITS}&appid=${API_KEY}`);

        if (!currentResponse.ok) {
            throw new Error(`Current Weather API request failed: ${currentResponse.status}`);
        }

        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        const forecastResponse = await fetch(`${FORECAST_URL}?q=${CITY_QUERY}&units=${UNITS}&appid=${API_KEY}`);

        if (!forecastResponse.ok) {
            throw new Error(`Forecast API request failed: ${forecastResponse.status}`);
        }

        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const weatherContainer = document.getElementById('current-weather');
    if (!data || data.cod !== 200) return;

    const temp = data.main.temp.toFixed(0);
    const desc = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherContainer.innerHTML = `
        <img src="${iconUrl}" alt="${desc}">
        <p>Current: ${temp}°F</p>
        <p>${desc}</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    if (!data || data.cod !== "200" || !data.list) return;

    forecastContainer.innerHTML = '<h3>3-Day Forecast</h3>';

    const today = new Date().getDate();
    const threeDayForecast = [];

    for (let i = 0; i < data.list.length && threeDayForecast.length < 3; i++) {
        const item = data.list[i];
        const date = new Date(item.dt * 1000);

        if (date.getDate() !== today && !threeDayForecast.some(f => f.date.getDate() === date.getDate())) {
            threeDayForecast.push({
                day: date.toLocaleDateString('en-US', { weekday: 'long' }),
                temp: Math.round(item.main.temp),
                date: date
            });
        }
    }

    threeDayForecast.forEach(forecast => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `<p>${forecast.day}: <strong>${forecast.temp}°F</strong></p>`;
        forecastContainer.appendChild(dayElement);
    });
}
getWeatherData();