// @ts-check
// console snippets:
// curCountry = document.getElementById("id_country").value
// anyCountry = document.getElementById("id_country")[1].value
// countries = document.getElementById("id_country").length
// document.getElementById("id_country").innerHTML = '' //empty countries selector
// document.getElementById("id_country").innerHTML += '<option value="CFG">CFG</option>' //add country to countries selector
// selectedCity - document.getElementById("id_city_id").value //to be changed to cityName once selector can be populated
var num = 1;
//fr = new FileReader();
//jsonfile = fr.readAsText("city_list_lite_for_tests.json")
import citiesJSON from './city_list_lite_for_tests.json';
console.log(citiesJSON);
