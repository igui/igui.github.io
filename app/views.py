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

    jumbotron_image = random.choice([
        '/static/images/jumbotron-1.jpg',
        '/static/images/jumbotron-2.jpg',
        '/static/images/jumbotron-3.jpg',
        '/static/images/jumbotron-4.jpg'
    ])

    context = {
        'age': age,
        'jumbotron': jumbotron_image
    }

    return render(request, 'index.html', context)

