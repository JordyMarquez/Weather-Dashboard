var userInput = $(".btn")
var apiKey = "0d8d1ba72bfabe1506400906cc34edad"
userInput.on('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    console.log("message") // button is listening
    var cityName = $("#userInput").val()


    var cityURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&exclude=hourly&units=imperial&appid=" + apiKey

    fetch(cityURL)
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            var lat = data.city.coord.lat
            var lon = data.city.coord.lon

            
            var geoURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey
            
            
            fetch(geoURL)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                var currentTemp = data.list[0].main.temp;
                console.log(currentTemp);
                var currentHumidity = data.list[0].main.humidity;
                console.log(currentHumidity);
                var currentWindspeed = data.list[0].wind.speed;
                console.log(currentWindspeed)
                
                console.log(cityURL)
                function displayWeather() {
                    
                    var sectionCurrentweather = $(".currentWeather");
                    
                    cityNameheader = $("<h3>")
                    sectionCurrentweather.append(cityNameheader)
                    cityNameheader.text(data.city.name)
                    cityTemp = $("<div>")
                    sectionCurrentweather.append(cityTemp)
                    cityTemp.text("Temp: " + currentTemp + " F")
                    
                    cityWindspeed = $("<div>")
                    sectionCurrentweather.append(cityWindspeed)
                    cityWindspeed.text("Windspeed: " + currentWindspeed + " MPH")
                    
                    cityHumidity = $("<div>")
                    sectionCurrentweather.append(cityHumidity)
                    cityHumidity.text("Humidity: " + currentHumidity + "%")
                    
                    for (let i = 1; i < 6; i++) {
                       var forecastDisplay= $(".futureForecast")
                        
                        dayHeader = $("<h2>")
                        forecastDisplay.append(dayHeader)
                        dayHeader.text(data.list[i].main.temp)
        
        
                    }
                }
                
                displayWeather()
                    
                    
                })
                
            })
            
            

}


//need temp, humiidty and wind speed