"use strict";
const app = Vue.createApp({
    data() {
        return {
            cities: [],
            apiCallDelay: 60 //aplikacja łączy się z API co 60 sekund
        };
    },
    methods: {
        showDetailsGraph(cityId) {
            return 0;
        }
    },
    computed: {
    //        canAddMoreCities() {
    //            return (this.cities.length < this.citiesMax)
    //        }
    }
});
