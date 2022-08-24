import json
from django.utils.safestring import mark_safe
#zmienne: countries, COUNTRIES_CHOICE

f = open("city_list.json", "r", encoding="utf8")
#f = open("city_list_lite_for_tests.json", "r", encoding="utf8")
cityData = json.load(f)
f.close()

countries = {cityData[0]['country']} #set
continents = False #czy JSON zawiera "country": "", oznaczające kontynenty ogółem
for i in cityData:
    countries.add(i['country'])
if ('' in countries): #exclude continents
    continents = True
    countries.remove('')
    #country '' - zawiera całe kontynenty np. name: Europe
    #ogólnie ten json zawiera nie tylko miasta, ale np. województwa i powiaty
countries = list(countries)
countries.sort()
#print(countries) #tests



COUNTRIES_CHOICE = []
for i in countries:
    #flag = '<i class="flag flag-pl"></i><b>FLAG</b>'
    #COUNTRIES_CHOICE.append( (i, mark_safe(flag + "fl" + i)) )
    COUNTRIES_CHOICE.append((i, i))
if (continents): #re-include continents
    COUNTRIES_CHOICE.append(("CONTINENTS", "Średnie dla kontynentów"))
COUNTRIES_CHOICE.append(("ALL", "Wszystkie kraje"))
print(COUNTRIES_CHOICE) #test




def findIdOfCity(cityName):
    cityId = -1
    for i in cityData:
        if(i['name'] == cityName):
            cityId = i['id']
            break

    return cityId
    # id -1 ==> invalid city name passed (not found in json). should probably make it an exception later

def findCitiesInCountry(country):
    cities = []
    for i in cityData:
        if(i['country'] == country):
            cities.append(i['name'])
    #for i in cities: #tests
    #    print(i['name'])
    cities.sort()
    return cities
