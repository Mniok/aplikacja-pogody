// @ts-check
"use strict";

// console snippets:
// curCountry = document.getElementById("id_country").value
// anyCountry = document.getElementById("id_country")[1].value
// countries = document.getElementById("id_country").length
// document.getElementById("id_country").innerHTML = '' //empty countries selector
// document.getElementById("id_country").innerHTML += '<option value="CFG">CFG</option>' //add country to countries selector
// selectedCity - document.getElementById("id_city_id").value //to be changed to cityName once selector can be populated

var num : number = 1;
//fr = new FileReader();
//jsonfile = fr.readAsText("city_list_lite_for_tests.json")

//require('./city_list_lite_for_tests.json');
//import city_list_lite_for_tests from './city_list_lite_for_tests.json';
import citiesJSON from './city_list_lite_for_tests.json' assert {type: 'json'};
//Uncaught SyntaxError: Cannot use import statement outside a module (at jsonCityParse.js:12:1)
//console.log(city_list_lite_for_tests)
console.log(citiesJSON);
//import require as require from './require.mjs';
//require('./city_list_lite_for_tests.json');


export { num, citiesJSON }