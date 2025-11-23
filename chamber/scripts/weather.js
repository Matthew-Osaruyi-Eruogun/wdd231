const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'ee61a08b9d7f7f5fa7ead93a4bf181c7'; 
const CITY_ID = '2341257'; // Benin City ID (check OpenWeatherMap for accuracy)
const UNITS = 'imperial'; // Use 'imperial' for Fahrenheit

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Benin City,NG&units=imperial&appid=51b762834da80ab58a31c482684828a2';

async function getWeatherData() {
    try {
        // --- Fetch Current Weather ---
        const currentResponse = await fetch(`${CURRENT_WEATHER_URL}?id=${CITY_ID}&units=${UNITS}&appid=${API_KEY}`);
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        // --- Fetch 3-Day Forecast ---
        const forecastResponse = await fetch(`${FORECAST_URL}?id=${CITY_ID}&units=${UNITS}&appid=${API_KEY}`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const weatherContainer = document.getElementById('current-weather');
    // Current temperature and description
    const temp = data.main.temp.toFixed(0);
    const desc = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    weatherContainer.innerHTML = `
        <img src="${iconUrl}" alt="${desc}">
        <p>Current: ${temp}°F</p>
        <p>${desc}</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    const today = new Date();
    const threeDayForecast = [];

    // Filter the list to get one entry per day for the next 3 days
    // The OpenWeatherMap forecast provides data every 3 hours (8 entries per day)
    for (let i = 0; threeDayForecast.length < 3; i++) {
        const item = data.list[i * 8]; // Get the data at roughly the same time each day (i * 8 entries)
        if (item) {
            const date = new Date(item.dt * 1000);
            if (date.getDate() !== today.getDate() && !threeDayForecast.some(f => f.date.getDate() === date.getDate())) {
                threeDayForecast.push({
                    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: item.main.temp_max.toFixed(0)
                });
            }
        }
    }

    threeDayForecast.forEach(forecast => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `
            <p><strong>${forecast.day}</strong></p>
            <p>${forecast.temp}°F</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

getWeatherData();