from django.shortcuts import render, redirect
from . forms import RegisterForm, cityIdTestForm
from . models import ObservedCity
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate


# Create your views here.
@login_required(login_url='/login')
def home(request):
    if request.method == 'POST':
        form = cityIdTestForm(request.POST)
        if form.is_valid():
            obsCity = ObservedCity(city_id=1,
                                   widget_nr=1,
                                   user_id=request.user.id) #not user.id ! must be AuthUser instance
            obsCity.save()
            return redirect('/home')
    else:
        form = cityIdTestForm()
        
    return render(request, 'home.html', {"form":form})




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

