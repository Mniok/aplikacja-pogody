"use strict";
//import { defineComponent } from 'vue'
app.component('add-country-widget', {
    template: 
    /*html*/
    `<div class="d-flex" @:click="add-city">
      <div class="widget-margins widget-size">
        <div id="add-widget-container">
            <div class="d-flex justify-content-center align-items-center h-100 w-100 bg-light bg-gradient rounded">
                <div class="text-dark">Dodaj miasto do obserwowanych</div>
            </div>
        </div>
      </div>
    </div>`,
    methods: {
        addCity() {
            this.$emit('open-add-city-form');
        },
    }
});
