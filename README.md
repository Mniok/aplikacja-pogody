# aplikacja-pogody
przed uruchomieniem programu należy zainstalować kilka rzeczy z wiersza poleceń (upewnij się, że znajdujesz się w folderze ./aplikacja-pogody, w którym znajduje się manage.py):
1. pip install django
2. pip install install crispy-bootstrap5
3. pip install psycopg2
4. pip install django-js-variable-injector
5. npm install -g typescript
6. npm install -g vue-tsc

przed uruchomieniem programu należy uruchomić następujące komendy:
1. vue-tsc --noEmit
2. python manage.py collectstatic

program uruchamia się komendą python manage.py runserver