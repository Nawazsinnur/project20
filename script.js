
    function getWeather() {
        const city = document.getElementById('city').value.trim();
        const apiKey = '6e78d819ca75c231efbb6006934fbf7b'; // Replace with your API key

        if (city === '') {
            alert('Please enter a city name');
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Debugging: Check API response in console
                if (data.cod == 200) {
                    let rainVolume = data.rain && data.rain["1h"] ? data.rain["1h"] : 0;
                    let rainStatus = rainVolume > 0 ? "Yes, it is raining ☔" : "No, there is no rain ☀";

                    document.getElementById('weather-info').innerHTML = `
                        <h3>${data.name}, ${data.sys.country}</h3>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Weather: ${data.weather[0].description}</p>
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
                        <p class="rain-status">Rain Status: ${rainStatus}</p>
                    `;
                } else {
                    document.getElementById('weather-info').innerHTML = `<p>Error: ${data.message}</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather-info').innerHTML = `<p>Could not fetch weather data. Try again later.</p>`;
            });
    }
