"App Views"
import random
from datetime import datetime
from django.shortcuts import render
from django.template import loader, Context
import os.path

# Create your views here.
def index(request):
    "Return the index file"
    days_per_year = 365.2425
    birth = datetime(1987, 6, 15)
    age = int((datetime.now() - birth).days / days_per_year)

    cv_url = 'https://www.dropbox.com/s/l2a7xfibomb4a59/CV%20Ignacio%20Avas.pdf?dl=1'

    context = {
        'age': age,
        'cv_url': cv_url
    }

    return render(request, 'index.html', context)

