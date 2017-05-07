"App Views"
import random
from datetime import datetime
from django.shortcuts import render
from django.template import loader, Context
from django.conf import settings
import os.path

# Create your views here.
def index(request):
    "Return the index file"
    days_per_year = 365.2425
    birth = datetime(1987, 6, 15)
    age = int((datetime.now() - birth).days / days_per_year)

    cv_url = 'https://www.dropbox.com/s/l2a7xfibomb4a59/CV%20Ignacio%20Avas.pdf?dl=1'

    index_file_path = os.path.join(settings.BASE_DIR, 'index.html')

    # TODO calculate Age in Browser, using JS
    context = {
        'age': age,
        'cv_url': cv_url
    }

    response = render(request, 'index.html', context)

    with open(index_file_path, 'w') as destination_file:
        destination_file.write(str(response.content, 'utf-8'))

    return response