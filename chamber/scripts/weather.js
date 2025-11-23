const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '51b762834da80ab58a31c482684828a2';
const CITY_QUERY = "Benin City,NG"; // Correct query parameter value
const UNITS = 'imperial';

// The static apiUrl defined here is now redundant, but harmless if left as a comment.
// const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Benin%20City,NG&units=imperial&appid=51b762834da80ab58a31c482684828a2';

async function getWeatherData() {
    try {
        
        const currentResponse = await fetch(`${CURRENT_WEATHER_URL}?q=${CITY_QUERY}&units=${UNITS}&appid=${API_KEY}`);

        if (!currentResponse.ok) {
            throw new Error(`Current Weather API request failed with status: ${currentResponse.status}`);
        }

        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        // --- Fetch 3-Day Forecast (FIX 1 applied here too) ---
        const forecastResponse = await fetch(`${FORECAST_URL}?q=${CITY_QUERY}&units=${UNITS}&appid=${API_KEY}`);

        // --- FIX 2 applied here too ---
        if (!forecastResponse.ok) {
            throw new Error(`Forecast API request failed with status: ${forecastResponse.status}`);
        }

        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Add user-facing message here if needed
    }
}

function displayCurrentWeather(data) {
    const weatherContainer = document.getElementById('current-weather');

   
    if (!data || data.cod !== 200 || !data.main || !data.weather || data.weather.length === 0) {
        console.error("Invalid or incomplete current weather data received:", data);
        weatherContainer.innerHTML = `<p>Weather data currently unavailable.</p>`;
        return;
    }

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
    // --- FIX 3: Add safety check for forecast data ---
    if (!data || data.cod !== "200" || !data.list) {
        console.error("Invalid or incomplete forecast data received:", data);
        return;
    }

    // Clear previous forecast elements
    forecastContainer.innerHTML = '';

    const today = new Date();
    const threeDayForecast = [];

    // Filter the list to get one entry per day for the next 3 days
    // The OpenWeatherMap forecast provides data every 3 hours (8 entries per day)
    // NOTE: This logic is still prone to missing days if the first entry is too late in the day.
    for (let i = 0; threeDayForecast.length < 3; i++) {
        // We'll use list[i] and check the date, rather than skipping 8 entries at once, 
        // to more reliably grab the next three distinct days.
        const item = data.list[i];

        if (item) {
            const date = new Date(item.dt * 1000);
            // Check if the date is not today and the day hasn't been added yet
            if (date.getDate() !== today.getDate() && !threeDayForecast.some(f => f.date.getDate() === date.getDate())) {
                threeDayForecast.push({
                    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: item.main.temp_max.toFixed(0),
                    date: date // store the date object to check against
                });
            }
        }
        // If the loop runs too long without finding 3 days, break to prevent infinite loop. 
        if (i > data.list.length) break;
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