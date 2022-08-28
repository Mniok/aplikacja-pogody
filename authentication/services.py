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
##print(countries) #tests



COUNTRIES_CHOICE = []
for i in countries:
    #flag = '<i class="flag flag-pl"></i><b>FLAG</b>'
    #COUNTRIES_CHOICE.append( (i, mark_safe(flag + "fl" + i)) )
    COUNTRIES_CHOICE.append((i, i))
if (continents): #re-include continents
    COUNTRIES_CHOICE.append(("", "Średnie dla kontynentów"))
COUNTRIES_CHOICE.append(("ALL", "Wszystkie kraje"))
##print(COUNTRIES_CHOICE) #test


ALL_CITIES_PRE_SORT = []
for i in cityData:
    #as array of tuples, with values ordered by sorting priority:
    ALL_CITIES_PRE_SORT.append(( 
            i['name'],
            i['country'],
            i['id']
    ))

ALL_IDS = []
for i in ALL_CITIES_PRE_SORT:
    #as array of arrays:
    ALL_IDS.append(i[2])

ALL_CITIES_PRE_SORT = sorted(ALL_CITIES_PRE_SORT)

ALL_CITIES = []
for i in ALL_CITIES_PRE_SORT:
    #as array of arrays, possible to {{inject}} into js
    ALL_CITIES.append([
            i[2],   #['id']
            i[0],   #['name']
            i[1]    #['country']
    ])


# _ _ _ archive

#ALL_CITIES = []
#for i in cityData:
    #as array of arrays:
    #ALL_CITIES.append([ 
    #        i['id'],
    #        i['name'],
    #        i['country']
    #])
    
    #as array of dicts:
    #dict = {       ##too large when read as js variable, process takes up hundreds of MB
    #    "id": i['id'],
    #    "name": i['name'],
    #    "country": i['country']
    #}
    #ALL_CITIES.append(dict)

    #as array:
    #ALL_CITIES.append(i['name'])
#ALL_CITIES = tuple(ALL_CITIES)

#ALL_IDS = []
#for i in ALL_CITIES:
#    #as array of arrays:
#    ALL_IDS.append(i[0])




def findIdOfCity(cityName):
    cityId = -1
    for i in cityData:
        if(i['name'] == cityName):
            cityId = i['id']
            break

    return cityId
    # id -1 ==> invalid city name passed (not found in json).

def findCitiesInCountry(country):
    cities = []
    for i in cityData:
        if(i['country'] == country):
            cities.append(i['name'])
    #for i in cities: #tests
    #    print(i['name'])
    cities.sort()
    return cities
