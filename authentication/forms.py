#from socket import fromshare
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import ObservedCity
from django.utils.safestring import mark_safe
from .services import COUNTRIES_CHOICE, ALL_IDS

from django.forms import ValidationError


class RegisterForm(UserCreationForm):
    username = forms.CharField(label="Nazwa użytkownika", required=True,
                               help_text="Pole wymagane. Do 150 znaków. Tylko litery, cyfry, i znaki @.+-_")
    email = forms.EmailField(label="E-mail", required=True)
    email2 = forms.EmailField(label="Potwierdź E-mail", required=True,
                              help_text='Powtórz ten sam adres E-mail co wcześniej, dla weryfikacji.')
    pass1HelpText = """<ul>
        <li>Hasło nie może być zbyt podobne do pozostałych informacji osobowych.</li>
        <li>Hasło musi mieć conajmniej 8 znaków.</li>
        <li>Hasło nie może znajdować się na liście najpopularniejszych haseł.</li>
        <li>Hasło nie może składać się z samych cyfr.</li>
    </ul>"""
    password1 = forms.CharField(label="Hasło", required=True, widget=forms.PasswordInput,
                                help_text=mark_safe(pass1HelpText))
    #       Your password can’t be too similar to your other personal information.
    #       Your password must contain at least 8 characters.
    #       Your password can’t be a commonly used password.
    #       Your password can’t be entirely numeric.
    password2 = forms.CharField(label="Potwierdź hasło", required=True, widget=forms.PasswordInput,
                                help_text="Powtórz to samo hasło co wcześniej, dla weryfikacji.")
    tos_accepted = forms.BooleanField(label=mark_safe('Akceptuję <a href="/tos">regulamin serwisu</a>'),
                        required=True) #nie da się zarejestrować bez akceptacji
    
    def clean_email2(self):
        email = self.cleaned_data.get('email')
        email2 = self.cleaned_data.get('email2')


        if email and email2 and email != email2:
            raise ValidationError("Podane adresy E-mail różnią się od siebie.")

        return email2

    class Meta:
        model = User
        fields = ["username", "email", "email2", "password1", "password2", "tos_accepted"]






class cityIdTestForm(forms.Form):
    #print(countries)
    country = forms.ChoiceField(label="Kraj:",
                                choices = COUNTRIES_CHOICE,
                                initial='PL',
                                required=False)
    #print(this)
    #city_id = forms.IntegerField(label="Id miasta", required=True)
    #city_name = forms.CharField(label="Nazwa miasta:", required=True)

    city_id = forms.ChoiceField(label="Miasto:",
                                choices = (
                                    ("1", "1"),
                                    ("2", "2")
                                ), #required to render, replaced at runtime according to selected country
                                required=True)

    def customClean(self):
        #used in place of form.is_valid(),
        #because form.is_valid calls built-in validator for city_id (ChoiceField),
        #which raises errors when the value submitted is not in the "choices" field.

        #the dataset is too large to fit it in a select field in it's entirety,
        #and crashes the site if passed to the choices field,
        #so the contents of the select field are changed at runtime
        #in <add-country-form> widget (AddCountryForm.ts).

        #this method makes it possible to retrieve data submitted through the form.
        
        ##cleaned_data = self.cleaned_data
        ##print("clean() city_id: " + str(self.city_id))
        custom_cleaned_data = {
            "country": self.data['country'],
            "city_id": self.data['city_id']
        }
        print("custom_cleaned_data: " + str(custom_cleaned_data))
        return custom_cleaned_data

    def clean_city_id(self):
        city_id = self.cleaned_data['city_id']


        if (city_id not in ALL_IDS):
            raise ValidationError("Wystąpił błąd. Nie znaleziono takiego miasta.")

        return city_id
    
    
    class Meta:
        #model = ObservedCity
        fields = ["country", "city_id"]
        #fields = ["city_name"]

