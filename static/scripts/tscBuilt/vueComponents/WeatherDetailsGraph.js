"use strict";
//data = await fetchForecast(cityId);
app.component('weather-details-graph', {
    props: {
        cityId: {
            type: Number,
            required: true
        }
    },
    template: 
    /*html*/
    `<div id="graphs-container" class="d-flex flex-column">
      <div class="d-flex">
        <p class="form-label text-center">Wykresy temperatury i wilgotności<br>dla {{cityName}}</p><br>
      </div>
    
      <div class="d-flex">
        <canvas id="temperatureChart"></canvas>
      </div><br>
      <div class="d-flex">
        <canvas id="humidityChart"></canvas>
      </div>
    </div>`,
    data() {
        return {
            cityName: String,
            temperatureList: [],
            humidityList: [],
            timeList: []
        };
    },
    methods: {
        async fetchData() {
            console.log("fetchdata...");
            var apiData = await fetchForecast(this.cityId);
            var temp = [];
            var hum = [];
            var time = [];
            this.cityName = apiData.city.name;
            for (let i in apiData.list) {
                temp.push(apiData.list[i].main.temp);
                hum.push(apiData.list[i].main.humidity);
                time.push(apiData.list[i].dt_txt);
            }
            this.temperatureList = temp;
            this.humidityList = hum;
            this.timeList = time;
        },
        drawGraphs() {
            const tempGraphData = {
                labels: this.timeList,
                datasets: [{
                        label: 'Temperatura',
                        backgroundColor: "coral",
                        borderColor: "coral",
                        data: this.temperatureList
                    }]
            };
            const humidityGraphData = {
                labels: this.timeList,
                datasets: [{
                        label: 'Wilgotność',
                        backgroundColor: "dodgerblue",
                        borderColor: "dodgerblue",
                        data: this.humidityList
                    }]
            };
            const tempGraphConfig = {
                type: "line",
                data: tempGraphData,
                options: {}
            };
            const humGraphConfig = {
                type: "line",
                data: humidityGraphData,
                options: {}
            };
            const tempChart = new Chart(document.getElementById("temperatureChart"), tempGraphConfig);
            const humChart = new Chart(document.getElementById("humidityChart"), humGraphConfig);
        }
    },
    async created() {
        console.log("created...");
        await this.fetchData();
        //this.apiData = await fetchForecast(this.cityId);
        console.log(this.apiData);
        this.drawGraphs();
    },
    async beforeUpdate() {
        console.log("beforeUpdate... " + this.cityId);
        await this.fetchData();
        //console.log(this.apiData);
        //console.log(this.temperatureList);
        //var labels = ['january', 'february', 'march'];
        //console.log(labels);
        //console.log(Array(this.temperatureList));
        //console.log(Array(this.humidityList));
        //console.log(Array(this.timeList));
        this.drawGraphs();
    },
    async updated() {
        console.log("updated...");
    },
});
