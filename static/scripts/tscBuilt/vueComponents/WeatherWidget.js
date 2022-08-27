"use strict";
app.component('weather-widget', {
    props: {
        cityId: {
            type: Number,
            required: true
        }
    },
    template: 
    /*html*/
    `<div class="weather-widget">
        <h1>{{cityId}}</h1>
    </div>`,
    data() {
        return {
            weather: Object,
            main: Object,
            wind: Object,
            clouds: Object,
            sys: Object,
            name: String
        };
    },
    methods: {
        update() {
            //this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        }
    },
    computed: {
        iconPath() {
            return 0; //this.weather.icon
        }
    }
});
