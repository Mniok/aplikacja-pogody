//"use strict";


// console scripts:
// document.getElementById("id_country").scrollTop
/* inter = setInterval(function () {
    console.log(document.getElementById("id_country").scrollTop)
    }, 1000)
*/
//document.getElementById("id_country").value = "PL"
//typeof(document.getElementById("id_city_id").value)   //string, ale:
//document.getElementById("id_city_id").value > 0       //true
//document.getElementById("id_city_id").value > 999999999999999 //false
//gdy value jest 'NONE' -> porównania liczbowe zwracają false

const pageSize : number = 200;

app.component('add-city-form', {
    template: '<slot v-bind="self"></slot>',
    
    data() {
        return {
            curCountry: String,
            citiesList: [],
            pageNr: Number
        }
      },

    methods: {
        paginate() {
            var formField = (<HTMLInputElement>document.getElementById("id_city_id"));
            
            if (formField.value == "PREV" && this.pageNr > 0) {
                this.pageNr--;
                console.log("pagenr: " + this.pageNr.toString());
                formField.value = "NONE";
                this.updateCities();
            }
            else if (formField.value == "NEXT") {
                this.pageNr++;
                console.log("pagenr: " + this.pageNr.toString());
                formField.value = "NONE";
                this.updateCities();
            }
        },

        buttonSafety() {
            var formField = (<HTMLInputElement>document.getElementById("id_city_id"));
            var button = (<HTMLInputElement>document.getElementById("submit-add-city-form"));

            if (formField.value == "NONE" || formField.value == "PREV" || formField.value == "NEXT") {
                button.disabled = true;
            }
            else if (!isNaN(Number(formField.value)) && Number(formField.value) > 0) {
                button.disabled = false;
            }
        },

        updateCities() {
            var formField = document.getElementById("id_city_id");
            formField.innerHTML = ''; //empty cities selector
            formField.innerHTML += '<option value="NONE">Wybierz miasto...</option>';

            if (this.pageNr > 0) {
                formField.innerHTML += '<option value="PREV">Poprzednia strona...</option>';
            }
            //get cities for current page only (limited page size to prevent crashes)
            var citySet = this.citiesList.slice(this.pageNr*pageSize, (this.pageNr+1)*pageSize);
            
            for (let i in citySet){
                var newCityId = citySet[i][0];
                var newCityName = citySet[i][1];
                formField.innerHTML += '<option value="' + newCityId + '">' + newCityName + '</option>'; //add city to cities selector
            }

            if ((this.pageNr+1)*pageSize < this.citiesList.length) {
                formField.innerHTML += '<option value="NEXT">Następna strona...</option>'
            }

            this.buttonSafety()
            //re-enable button if a valid value is selected
        },

        updateCitySelectorLogic() {
            console.log("updcitysel")
            var countrySelector = (<HTMLInputElement>document.getElementById("id_country"));
            var newCountry: string = countrySelector.value
            var newCities = [];

            //console.log("newc vs curc: " + newCountry + " -- " + this.curCountry);
            //console.log(cityData)
            this.buttonSafety(); //disable submit button if non-city value selected

            if (newCountry == this.curCountry) {
                //console.log("ret!")
                this.paginate();
                return;
            }
            else if (newCountry == "ALL") {
                //console.log("n=c!")
                newCities = cityData;
                this.pageNr = 0;
            }
            else {
                //console.log("for!")
                //console.log(newCountry)
                //console.log(cityData[5][2])
                for (let i in cityData) {
                    if(cityData[i][2] == newCountry) {
                        newCities.push([cityData[i][0], cityData[i][1]]);
                    }
                }
                this.pageNr = 0;
            }
            //console.log("newCities:");
            //console.log(newCities);
            this.curCountry = newCountry;
            this.citiesList = newCities;
            
            this.updateCities();
            
        },
    },

    mounted() {
        console.log("add-city-form mounted");
        //var countrySelector = (<HTMLInputElement>document.getElementById("id_country"));
        //this.curCountry = countrySelector.value;

        document.getElementById("id_city_id").innerHTML = '<option value="NONE">Wybierz miasto...</option>';
        (<HTMLInputElement>document.getElementById("submit-add-city-form")).disabled = true;
            ////// placeholder text until form is updated
        
        this.updateCitySelectorLogic()
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
