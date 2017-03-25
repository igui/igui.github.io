from django.conf.urls import include, url

import app.views

urlpatterns = [
    url(r'^$', app.views.index, name='index'),
]
