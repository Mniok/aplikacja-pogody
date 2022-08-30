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
    `<div id="graphs-container" class="d-flex" @click="dummy">
      <p>Wykresy dla id: {{cityId}}</p>
    </div>`,

    methods: {
        dummy() {
            console.log("dummy...");
        }
    },

    async created() {
        console.log("created...");
        this.apiData = await fetchForecast(this.cityId);
        console.log(this.apiData);
    },

    async beforeMount() {
        console.log("beforemount...");
    },

    async mounted() {
        console.log("mounted...");
        //console.log(data);
    },

    async updated() {
        console.log("updated...");
    },

    
  })
