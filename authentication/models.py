from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class AuthUser(models.Model):
    #autoincrement id jest by default primary key
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'

    def __unicode__(self):
        return self.username



class ObservedCity(models.Model):
    city_id = models.IntegerField()
    widget_nr = models.IntegerField()
    user_id = models.ForeignKey(AuthUser, models.DO_NOTHING)
    
    class Meta:
        managed = False
        db_table = 'observed_city'

    def __unicode__(self):
        return self.city_id #nazwa miasta jest w city.list.json

