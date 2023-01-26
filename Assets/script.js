var userInput = $(".btn")
var apiKey = "0d8d1ba72bfabe1506400906cc34edad"

//creates click event on button 
userInput.on('click', handleSubmit);

//creates function of button clicked
function handleSubmit(event) {

    event.preventDefault();

    console.log("message") // button is listening
    var cityName = $("#userInput").val()

    //use API URL with imperial units
    var cityURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey

    //creates fetch for URL above using city name user provided
    fetch(cityURL)
        .then(function (response) {
            console.log("daily response", response)
            return response.json();
        })
        .then((data) => {
            console.log(data);
            var lat = data.city.coord.lat
            var lon = data.city.coord.lon

            //use API URL with imperial units
            var geoURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey

            //creates fetch for URL above using lat and long
            fetch(geoURL)
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);

                    //tests data using console log to check for current temp, humidity and wind speed
                    var currentTemp = data.list[0].main.temp;
                    console.log(currentTemp);
                    var currentHumidity = data.list[0].main.humidity;
                    console.log(currentHumidity);
                    var currentWindspeed = data.list[0].wind.speed;
                    console.log(currentWindspeed)

                    console.log(cityURL)

                    //creates a function to display current weather for a single day
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

                        //creates a function to create a future 5 day forecast 
                        var forecastDisplay = $(".futureForecast")
                        var index = 7
                        for (let i = 1; i < 6; i++) {


                            var dayCard = $("<div>").addClass("card")

                            var dayTemp = $("<div>").text("Temp: " + data.list[index].main.temp + " F")
                            dayCard.append(dayTemp)

                            var dayWindspeed = $("<div>").text("Windspeed: " + data.list[index].wind.speed + " MPH")
                            dayCard.append(dayWindspeed)

                            var dayHumidity = $("<div>").text("Humidity: " + data.list[index].main.humidity + "%")
                            dayCard.append(dayHumidity)

                            forecastDisplay.append(dayCard)

                            index += 8
                        }
                    }

                    displayWeather()


                })

        })



}
