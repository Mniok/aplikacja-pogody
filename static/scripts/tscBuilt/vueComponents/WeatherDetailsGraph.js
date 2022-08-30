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
    `<div id="graphs-container" class="d-flex">
      <p>Wykresy dla id: {{cityId}}</p>
    </div>`,
    methods: {
        async fetchData() {
            console.log("fetchdata...");
            this.apiData = await fetchForecast(this.cityId);
        }
    },
    async created() {
        console.log("created...");
        await this.fetchData();
        //this.apiData = await fetchForecast(this.cityId);
        console.log(this.apiData);
    },
    async beforeMount() {
        console.log("beforemount...");
    },
    async mounted() {
        console.log("mounted...");
        //console.log(data);
    },
    async beforeUpdate() {
        console.log("beforeUPD..." + this.cityId);
        await this.fetchData();
        console.log(this.apiData);
    },
    async updated() {
        console.log("updated...");
    },
});
