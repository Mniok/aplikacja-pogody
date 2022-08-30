"use strict";
//var v: integer = 1 //typescript type declaration btw
//console test:
async function fetchWeather(cityId) {
    var apicall = fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityId.toString() + '&lang=pl&appid=c2eb1330d5a3ce1a68cb382df5091a4b&units=metric');
    //po id miasta, jezyk polski, metric system (stopnie CSelsjusza)
    //z wraca promise bo jest async i czeka na odpowiedz
    var response = await apicall;
    //juz nie promise a konkretny obiekt
    var data = await response.json();
    //odczytuje json ze strumienia
    //console.log(data.name)
    //np. "Moskwa"
    //console.log(data.weather[0].description)
    //np. "zachmurzenie duze"
    //resultStr = data.name + ': ' + data.main.temp + "'C, " + data.main.pressure + "hPa, " + data.weather[0].description;
    //console.log(resultStr);
    //const elem = document.getElementById("result")
    //elem.innerHTML = resultStr
    return data;
}
/*
apicall = fetch('https://api.openweathermap.org/data/2.5/forecast?id=524901&lang=pl&appid=c2eb1330d5a3ce1a68cb382df5091a4b&units=metric')
//forecast - 40 pomiarów (5 dni co 3h)
*/
async function fetchForecast(cityId) {
    var params = 'id=' + cityId.toString() + '&lang=pl&appid=c2eb1330d5a3ce1a68cb382df5091a4b&units=metric';
    var apiLink = 'https://api.openweathermap.org/data/2.5/forecast?' + params;
    var apiCall = fetch(apiLink);
    var response = await apiCall;
    var data = await response.json();
    return data;
}
