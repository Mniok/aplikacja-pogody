"use strict";
//import { defineComponent } from 'vue'
app.component('weather-widget', {
    props: {
        "city-id": {
            type: Number,
            required: true
        }
    },
    template: 
    /*html*/
    `<div class="container-flex widget-block weather-widget" v-on:click="selectForGraph">
        <h1>{{cityId}}</h1>
    </div>`,
    data() {
        return {
            weather: Object,
            main: Object,
            wind: Object,
            clouds: Object,
            sys: Object,
            name: String,
            highlighted: false
        };
    },
    methods: {
        update() {
            //this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        selectForGraph() {
            this.$emit('selected', this.cityId);
        },
    },
    computed: {
        iconPath() {
            return 0; //this.weather.icon
        }
    }
});
