from django.shortcuts import render, redirect
from . forms import RegisterForm, cityIdTestForm
from . models import ObservedCity
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from .services import findIdOfCity, ALL_CITIES


# Create your views here.
@login_required(login_url='/login')
def home(request):
    if request.method == 'POST':
        #cityIdTestForm.errors['city_id'] = cityIdTestForm.['city_id'].error_class()
        form = cityIdTestForm(request.POST)
        if(True): #if (form.is_valid()):
            cleaned = form.customClean()
            #cityName = form.cleaned_data['city_id']
            #cityId = findIdOfCity()
            cityId = cleaned['city_id']
            
            obsCity = ObservedCity(city_id=cityId,
                                   widget_nr=1,
                                   user_id=request.user.id) #not user.id ! must be AuthUser instance
            duplicates = ObservedCity.objects.filter(user_id=obsCity.user_id, city_id=obsCity.city_id)
            if (len(duplicates) == 0): #prevents saving duplicates
                widgetNrs = ObservedCity.objects.filter(user_id=obsCity.user_id)
                widgetNrs = widgetNrs.values_list('widget_nr', flat=True)
                
                if (len(widgetNrs) > 0):
                    obsCity.widget_nr = max(widgetNrs) +1 #add last
                else:
                    obsCity.widget_nr = 1
                    
                obsCity.save()
            return redirect('/home')
    else:
        form = cityIdTestForm()

    cities = ObservedCity.objects.filter(user_id=request.user.id) \
    .order_by('widget_nr') \
    .values_list('city_id', flat=True).distinct() #prevents showing duplicates from being shown
    #print(cities)
        
    return render(request, 'home.html', {"form": form,
                                         "cities": cities,
                                         "allcities": ALL_CITIES
                                         })




def sign_up(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/home')
    else:
        form = RegisterForm()
    
    return render(request, 'signup.html', {"form":form})

