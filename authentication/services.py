import json


#f = open("city_list.json", "r", encoding="utf8")
f = open("city_list_lite_for_tests.json", "r", encoding="utf8")
cityData = json.load(f)
f.close()

##tests:
for i in cityData:
    print(i['country'])


def findIdOfCity(cityName):
    return 0
