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
            <p class="form-label text-center container-fluid">Wykresy temperatury i wilgotności</p>
        </div>
        <div class="d-flex">
            <p class="form-label text-center container-fluid">dla {{cityName}}</p><br>
        </div>
    
        <div id="temp-chart-container" class="d-flex">
            <canvas id="temperatureChart"></canvas>
        </div><br>
        <div id="hum-chart-container" class="d-flex">
            <canvas id="humidityChart"></canvas>
        </div>
    </div>`,

    data() {
        return {
            cityName: String,
            temperatureList: [],
            humidityList: [],
            timeList: [],
            tChartHandle: {},
            hChartHandle: {},
            chartCurrentCity: Number,
            chartsDrawn: false
        }
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
        /*resetGraphs() {
            var tChContainer = document.getElementById("temperatureChart");
            var hChContainer = document.getElementById("humidityChart");

            tChContainer.innerHTML = ''
            tChContainer.innerHTML = '<canvas id="temperatureChart"></canvas>'
            hChContainer.innerHTML = ''
            hChContainer.innerHTML = '<canvas id="humidityChart"></canvas>'

        },*/
        drawGraphs() {
            if (this.chartsDrawn) {
                //make room for new charts
                this.tChartHandle.destroy();
                //console.log(this.tChartHandle);
                this.hChartHandle.destroy();
                //this.chartsDrawn = false;
            }
            //this.resetGraphs(); //to make room for new charts
            

            const tempGraphData = {
                labels: this.timeList,
                datasets: [{
                    label: 'Temperatura [°C]',
                    backgroundColor: "coral",
                    borderColor: "coral",
                    data: this.temperatureList
                }]
            };

            const humidityGraphData = {
                labels: this.timeList,
                datasets: [{
                    label: 'Wilgotność [%]',
                    backgroundColor: "dodgerblue",
                    borderColor: "dodgerblue",
                    color: "ivory",
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

            this.chartsDrawn = true;
            const tempCharCanvas = <HTMLCanvasElement>document.getElementById("temperatureChart");
            //tempCharCanvas.getContext('2d').clearRect(0, 0, tempCharCanvas.clientWidth, tempCharCanvas.clientHeight);
            //if (this.tChartHandle != {}) this.tChartHandle.destroy();
            const tempChart = new Chart(
                tempCharCanvas,
                tempGraphConfig
            );
            this.tChartHandle = tempChart;
            //console.log("tempchart handle:");
            //this.tChartHandle = tempChart;
            //console.log(this.tChartHandle);
            //tempChart.destroy();

            const humCharCanvas = <HTMLCanvasElement>document.getElementById("humidityChart");
            //humCharCanvas.getContext('2d').clearRect(0, 0, humCharCanvas.clientWidth, humCharCanvas.clientHeight);
            //if (this.hChartHandle != {}) this.hChartHandle.destroy();
            const humChart = new Chart(
                humCharCanvas,
                humGraphConfig
            );
            this.hChartHandle = humChart;
            //this.hChartHandle.destroy();
            //console.log(this.hChartHandle);

            //this.chartsDrawn = true;

            /*this.$nextTick(() => {
                this.$nextTick(() => {
                    tempChart.destroy();
                    humChart.destroy();
                });
            });*/
            
        }
    },

    async created() {
        console.log("created...");
        this.chartCurrentCity = this.cityId;
        await this.fetchData();
        //this.apiData = await fetchForecast(this.cityId);
        console.log(this.apiData);
        this.drawGraphs();
    },

    async beforeUpdate() {
        console.log("beforeUpdate... " + this.cityId + ' == ? != ' + this.chartCurrentCity)
        if(this.cityId != this.chartCurrentCity) {
            this.chartCurrentCity = this.cityId;
            await this.fetchData();
            this.drawGraphs();
        }
        else {console.log("update aborted.")}

        //console.log(this.apiData);
        //console.log(this.temperatureList);

        //var labels = ['january', 'february', 'march'];
        //console.log(labels);
        //console.log(Array(this.temperatureList));
        //console.log(Array(this.humidityList));
        //console.log(Array(this.timeList));
        
    },

    async updated() {
        console.log("updated...");
    },

    
  })
