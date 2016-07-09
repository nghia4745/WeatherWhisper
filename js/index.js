$(document).ready(function () {
  var lat, lon, city, country, tempVersion, tempF, tempC, description, humid, windDirection, windMPH, windKMH, sunR, sunS, icon;

  function degToCompass(deg) {
    var com = parseInt((deg/22.5) + 0.5);
    var comArray = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
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
  lat = 31.9686;
  lon = 99.9018;


  var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&appid=c2ded55aa9309075528cf63c7e2474d0";

  console.log(api);
  $.getJSON (api, function(data) {
    city = data.name;
    country = data.sys.country;
    tempF = Math.round(data.main.temp * 9/5 - 459.67);
    tempC = Math.round(data.main.temp - 273.15);
    description = (data.weather[0].description).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    humid = data.main.humidity;
    windDirection = degToCompass(data.wind.deg);
    windMPH = Math.round(data.wind.speed / 0.44704);
    windKMH = Math.round(data.wind.speed * 3.6);
    sunR = unixToStandard(data.sys.sunrise);
    sunS = unixToStandard(data.sys.sunset);
    icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    $(".location").html(city +", " + country);
    $(".temp").html(tempF + " &deg;F");
    //$(".temp").html(tempC + " &deg;C");
    $(".descript").html(description);
    $(".humid").html("Humidity: " + humid + "%");
    $(".wind").html("Wind: " + windMPH + " MPH " + windDirection);
    //$(".wind").html(windKMH + " KMH " + windDirection);
    $(".sunR").html("Sunrise: " + sunR);
    $(".sunS").html("Sunset: " + sunS);
    $(".icon").attr("src", icon);
  });
});
