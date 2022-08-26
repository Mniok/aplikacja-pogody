//var v: integer = 1 //typescript type declaration btw


//console test:
async function fetchWeather(cityId: number) {
    var apicall = fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityId.toString() + '&lang=pl&appid=c2eb1330d5a3ce1a68cb382df5091a4b&units=metric')
    //po id miasta, jezyk polski, metric system (stopnie CSelsjusza)
    //z wraca promise bo jest async i czeka na odpowiedz

    var response = await apicall
    //juz nie promise a konkretny obiekt

    var data = await response.json()
    //odczytuje json ze strumienia

    //console.log(data.name)
    //np. "Moskwa"
    //console.log(data.weather[0].description)
    //np. "zachmurzenie duze"

    //resultStr = data.name + ': ' + data.main.temp + "'C, " + data.main.pressure + "hPa, " + data.weather[0].description;
    //console.log(resultStr);
    //const elem = document.getElementById("result")
    //elem.innerHTML = resultStr
}

/*
apicall = fetch('https://api.openweathermap.org/data/2.5/forecast?id=524901&lang=pl&appid=c2eb1330d5a3ce1a68cb382df5091a4b&units=metric')
//forecast - 40 pomiarów (5 dni co 3h)
*/



/*interface apiResponse{
    coord: {
        lon: number,
        lat: number
      },
      weather: [
        {
          id: number,
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }
      ],
      base: "stations",
      main: {
        temp: number,
        feels_like: 281.86,
        temp_min: 280.37,
        temp_max: 284.26,
        pressure: 1023,
        humidity: 100
      },
      visibility: 10000,
      wind: {
        speed: 1.5,
        deg: 350
      },
      clouds: {
        all: 1
      },
      dt: 1560350645,
      sys: {
        type: 1,
        id: 5122,
        message: 0.0139,
        country: "US",
        sunrise: 1560343627,
        sunset: 1560396563
      },
      timezone: -25200,
      id: 420006353,
      name: "Mountain View",
      cod: 200
}*/