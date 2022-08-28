//"use strict";


// console scripts:
// document.getElementById("id_country").scrollTop
/* inter = setInterval(function () {
    console.log(document.getElementById("id_country").scrollTop)
    }, 1000)
*/



app.component('add-country-form', {
    template: '<slot v-bind="self"></slot>',
    
    data() {
        return {
            curCountry: String,
            interv: Number
        }
      },

    methods: {
        updateCitySelector() {
            console.log("updcitysel")
            var countrySelector = (<HTMLInputElement>document.getElementById("id_country"));
            var newCountry: string = countrySelector.value
            var newCities = [];

            console.log("newc vs curc: " + newCountry + " -- " + this.curCountry);
            console.log(cityData)

            if (newCountry == this.curCountry) {
                console.log("ret!")
                return;
            }
            else if (newCountry == "ALL") {
                console.log("n=c!")
                newCities = cityData;
            }
            else {
                console.log("for!2!")
                console.log(newCountry)
                console.log(cityData[5][2])
                for (let i in cityData) {
                    if(cityData[i][2] == newCountry) {
                        newCities.push([cityData[i][0], cityData[i][1]]);
                    }
                }
            }
            console.log("newCities:");
            console.log(newCities);
            this.curCountry = newCountry;

            var formField = document.getElementById("id_city_id");
            formField.innerHTML = ''; //empty cities selector

            var citySet = newCities.slice(0, 300); //temmp limiter
            
            for (let i in citySet){
                var newCityId = citySet[i][0];
                var newCityName = citySet[i][1];
                formField.innerHTML += '<option value="' + newCityId + '">' + newCityName + '</option>'; //add city to cities selector
            }

            (<HTMLInputElement>document.getElementById("submit-add-city-form")).disabled = false;
            //re-enable button after select field is populated with data
            
        },
    },

    mounted() {
        console.log("add-cons-form mounted");
        //var countrySelector = (<HTMLInputElement>document.getElementById("id_country"));
        //this.curCountry = countrySelector.value;

        (<HTMLInputElement>document.getElementById("id_city_id")).innerHTML = '<option value="NONE">Wybierz miasto...</option>';
        (<HTMLInputElement>document.getElementById("submit-add-city-form")).disabled = true;
            ////// placeholder text until form is updated
        
        this.updateCitySelector()
        //this.interv = setInterval(
        //    function () {
        //        this.updateCitySelector()
        //    }, 2000);
      },

    computed: {
        self() {
            return { ...this }
        }
    }
})
