from django.urls import path

import app.views

urlpatterns = [
    path(r'', app.views.index, name='index'),
]
