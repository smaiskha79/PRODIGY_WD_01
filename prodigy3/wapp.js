document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = '1d3bdedb8f46e279a9ca8b92fb31ad9c'; // Your OpenWeatherMap API key

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiUrl =' https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}';
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            // Handle HTTP errors
            throw new Error('HTTP error! Status: ${response.status}');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // For debugging
        // Handle API errors
        if (data.cod !== 200) {
            throw new Error('API error! Code: ${data.cod}, Message: ${data.message}');
        }
        document.getElementById('location').textContent = '${data.name}, ${data.sys.country}';
        document.getElementById('temperature').textContent = 'Temperature: ${data.main.temp}°C';
        document.getElementById('description').textContent =' Weather: ${data.weather[0].description}';
        document.getElementById('humidity').textContent =' Humidity: ${data.main.humidity}%';
        document.getElementById('wind').textContent =' Wind Speed: ${data.wind.speed} m/s';
    })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again.');
        });
});