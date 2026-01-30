const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '51b762834da80ab58a31c482684828a2';
const CITY_QUERY = "Benin City,NG";
const UNITS = 'imperial';

async function getWeatherData() {
    const weatherContainer = document.getElementById('current-weather');
    const forecastContainer = document.getElementById('forecast-container');

    if (!weatherContainer || !forecastContainer) return;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(`${CURRENT_WEATHER_URL}?q=${CITY_QUERY}&units=${UNITS}&appid=${API_KEY}`),
            fetch(`${FORECAST_URL}?q=${CITY_QUERY}&units=${UNITS}&appid=${API_KEY}`)
        ]);

        if (!currentRes.ok || !forecastRes.ok) throw new Error("Weather API failure");

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        displayCurrentWeather(currentData, weatherContainer);
        displayForecast(forecastData, forecastContainer);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherContainer.innerHTML = '<p>Weather service temporarily offline.</p>';
    }
}

function displayCurrentWeather(data, container) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Using @2x icon but setting display size to 50x50 to fix "low resolution" Lighthouse audit
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    container.innerHTML = `
        <div class="weather-info">
            <img src="${iconUrl}" 
                 alt="${desc}" 
                 width="50" 
                 height="50"
                 loading="lazy">
            <p><strong>${temp}°F</strong> - ${desc}</p>
        </div>
    `;
}

function displayForecast(data, container) {
    container.innerHTML = '<h3>3-Day Forecast</h3>';
    const forecastList = document.createElement('div');
    forecastList.classList.add('forecast-list');

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(forecast.main.temp);

        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `<span>${dayName}</span>: <strong>${temp}°F</strong>`;
        forecastList.appendChild(dayElement);
    });

    container.appendChild(forecastList);
}

getWeatherData();