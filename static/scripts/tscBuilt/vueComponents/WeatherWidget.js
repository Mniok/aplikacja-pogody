"use strict";
//import { defineComponent } from 'vue'
app.component('weather-widget', {
    props: {
        cityId: {
            type: Number,
            required: true
        }
    },
    template: 
    /*html*/
    `<div v-on:click="selectForGraph">
      <div :id="containerId" :key="cityId"></div>
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
            window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
            //init parameters for API call
            window.myWidgetParam.push({
                id: 5,
                cityid: this.cityId,
                appid: 'c2eb1330d5a3ce1a68cb382df5091a4b',
                units: 'metric',
                lang: 'pl',
                containerid: this.containerId,
            });
            //API call is made through widget generator
            (function (cityId) {
                var script = document.createElement('script');
                script.async = true;
                script.charset = "utf-8";
                script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(script, s);
                //console.log("widget for city with id " + this.cityId.toString() + " updated."); //out of scope, function canot access this.cityId
                console.log("widget for city with id " + cityId.toString() + " updated.");
            })(this.cityId);
        },
        selectForGraph() {
            this.$emit('selected', this.cityId);
        },
    },
    mounted() {
        console.log("weather-widget for city id " + this.cityId.toString() + " mounted.");
        this.update();
        //lifecycle hook
    },
    computed: {
        iconPath() {
            return 0; //this.weather.icon
        },
        containerId() {
            return 'openweathermap-widget-5-' + this.cityId.toString();
        }
    }
});
