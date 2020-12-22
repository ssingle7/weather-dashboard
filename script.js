$(document).ready(function () {
  var searchCityArray = [];
  var newCitySearch = $("#city-name").val();
  searchCityArray.push(newCitySearch);
  localStorage.setItem("searchCityArray", searchCityArray);
  var cityName = newCitySearch;
  //functions definition
  for (var i = 0; i < searchCityArray.length; i++) {
    var button = $("<button>")
      .addClass("btn btn-search")
      .text(searchCityArray[i]);
    $(".btn btn-search").append(button);
  }
  var apiKey = "de9e8f2ea3d90fcbbef4dedd2ac9d04a";
  function citySearch(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $("#city-data").empty();
      console.log(response);
      var dateString = new Date(1608502800 * 1000).toLocaleDateString("en-US");

      var icon = $("<img>").attr(
        "src",
        `https://api.openweathermap.org/img/w/${response.weather[0].icon}.png`
      );
      var title = $("<h1>").text(cityName + " " + dateString);
      title.append(icon);

      var temperature = $("<p>").text(
        "Temperature " + response.main.temp + " F"
      );
      var humidity = $("<p>").text("Humidity " + response.main.humidity + " %");
      var windSpeed = $("<p>").text(
        "Wind Speed " + response.wind.speed + " MPH"
      );
      // title.attr("style", "float:left")
      $("#city-data").append(title);
      $("#city-data").append(temperature);
      $("#city-data").append(humidity);
      $("#city-data").append(windSpeed);
      console.log(response.coord.lat);
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          response.coord.lat +
          "&lon=" +
          response.coord.lon +
          "&appid=de9e8f2ea3d90fcbbef4dedd2ac9d04a",
        method: "GET",
      }).then(function (response) {
        console.log(response);
        console.log(response.value);

        var uvIndex = $("<p>").text("UV Index " + response.value);

        $("#city-data").append(uvIndex);
        dailyForecast(response.lat, response.lon)
        // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
      });
    });
  }
  $(".btn").on("click", function (e) {
    e.preventDefault();
    console.log("You've searched for something.");
    var input = $("#city-name").val();
    citySearch(input);
  });
});
function dailyForecast(lat, lon) {
  var queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${"de9e8f2ea3d90fcbbef4dedd2ac9d04a"}&units=imperial`;

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var fiveDayForecast = $("<h1>")
    fiveDayForecast.text("5-Day Forecast:");
    $(".col-12").append(fiveDayForecast);

    for (var i = 0; i < 5; i++) {
      var weatherForecast = $("<div>").addClass("card shadow-lg text-white bg-primary mx-auto mb-10 p-2 float-left")
      weatherForecast.attr("style", "width: 8.5rem; height: 11rem; background-color: blue; padding-right: 10px;");
      $(".col-12").append(weatherForecast);
      var dateString = new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US");
      var date = $("<h5>").text(dateString)
      weatherForecast.append(date)
      var icon = $("<img>").attr(
        "src",
        `https://api.openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png`
      );
      weatherForecast.append(icon)
      var temperature = $("<p>").text(
        "Temperature " + response.daily[i].temp.day + " F"
      );
      var humidity = $("<p>").text("Humidity " + response.daily[i].humidity + " %");
      weatherForecast.append(temperature)
      weatherForecast.append(humidity)
    }
  });
}

$(document).ready(function () {
  //DOM variables
  //Javascript variables
  //function calls
  // renderButtons();
  //event listener
});
