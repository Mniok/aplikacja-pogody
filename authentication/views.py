from django.shortcuts import render, redirect
from . forms import RegisterForm, cityIdTestForm
from . models import ObservedCity
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from .services import findIdOfCity


# Create your views here.
@login_required(login_url='/login')
def home(request):
    if request.method == 'POST':
        form = cityIdTestForm(request.POST)
        if form.is_valid():
            obsCity = ObservedCity(city_id=form.cleaned_data['city_id'],
                                   widget_nr=1,
                                   user_id=request.user.id) #not user.id ! must be AuthUser instance
            obsCity.save()
            return redirect('/home')
    else:
        form = cityIdTestForm()
        cities = ObservedCity.objects.filter(user_id=request.user.id)
        cities = cities.values_list('city_id', flat=True).distinct() #prevents duplicates from being shown
        
    return render(request, 'home.html', {"form":form, "cities":cities})




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

