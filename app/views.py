"App Views"
import random
from datetime import datetime
from django.shortcuts import render

# Create your views here.
def index(request):
    "Return the index file"
    days_per_year = 365.2425
    birth = datetime(1987, 6, 15)
    age = int((datetime.now() - birth).days / days_per_year)

    context = {
        'age': age
    }

    return render(request, 'index.html', context)

