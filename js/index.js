var array, input, city, country, tempVersion, tempF, tempC, description, humid, windDirection, windMPH, windMS, sunR, sunS, icon;
var cityInput = "Houston";
var countryInput = "US";
var api = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "," + countryInput + "&appid=c2ded55aa9309075528cf63c7e2474d0";

$(document).ready(function() {
  jsonFunction();
  $(".tempC").show();
  $(".windMPH").show();
  $(".tempC").hide();
  $(".windMS").hide();
  $(".alert").hide();

  $(".closeBtn").click(function () {
    $(".alert").hide();
  });

  $("[data-toggle='toolTip']").tooltip({
    placement: "bottom",
    animation: true
  });

  $(".textInput").keydown(function (e){
    if(e.keyCode == 13){ //Pressed Enter Key
        getInput();
    }
  });

  $(".enterBtn").click(function() {
    getInput();
  });

  function getInput() {
    input = $(".textInput").val();
    if(input != "") {
      array = input.split(", ");
      cityInput = array[0];
      countryInput = array[1];
      newAPI(cityInput, countryInput);
    } else {
      $(".alert").toggle();
    }
  }

  function newAPI(cityInput, countryInput) {
    api = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "," + countryInput + "&appid=c2ded55aa9309075528cf63c7e2474d0";
    console.log(api);
    jsonFunction();
  }

  $(".toggleBtn").click(function() {
    $(".tempC").toggle();
    $(".tempF").toggle();
    $(".windMPH").toggle();
    $(".windMS").toggle();
  });

  function jsonFunction() {
    $.getJSON(api, function(data) {
      city = data.name;
      country = data.sys.country;
      tempF = Math.round(data.main.temp * 9 / 5 - 459.67);
      tempC = Math.round(data.main.temp - 273.15);
      description = (data.weather[0].description).replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      humid = data.main.humidity;
      windDirection = degToCompass(data.wind.deg);
      windMPH = Math.round(data.wind.speed / 0.44704);
      windMS = Math.round(data.wind.speed);
      sunR = unixToStandard(data.sys.sunrise);
      sunS = unixToStandard(data.sys.sunset);
      icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      $(".location").html(city + ", " + country);
      $(".tempF").html(tempF + " &deg;F");
      $(".tempC").html(tempC + " &deg;C");
      $(".descript").html(description);
      $(".humid").html(humid + "%");
      $(".windMPH").html(windMPH + " MPH " + windDirection);
      $(".windMS").html(windMS + " M/S " + windDirection);
      $(".sunRS").html(sunR + " / "  + sunS);
      $(".icon").attr("src", icon);
    });
  }

  function degToCompass(deg) {
    var com = parseInt((deg / 22.5) + 0.5);
    var comArray = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return comArray[(com % 16)];
  }

  function unixToStandard(timestamp) {
    var date = new Date(timestamp * 1000),
      h = date.getHours(),
      hour = h,
      min = ("0" + date.getMinutes()).slice(-2),
      ampm = "AM",
      time;
    if (h > 12) {
      hour = h - 12;
      ampm = "PM";
    } else if (h === 12) {
      hour = 12;
      ampm = "PM";
    } else if (h == 0) {
      hour = 12;
    }
    time = hour + ":" + min + " " + ampm;
    return time;
  }
});
