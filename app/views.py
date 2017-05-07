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
    index_file_path = os.path.join(settings.BASE_DIR, 'index.html')

    response = render(request, 'index.html', {})

    with open(index_file_path, 'w') as destination_file:
        destination_file.write(str(response.content, 'utf-8'))

    return response