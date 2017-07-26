"App Views"
import random
from datetime import datetime
from django.shortcuts import render
from django.template import loader, Context
from django.conf import settings
import os.path

skills = {
    'Python': 4,
    'Django': 3,
    'Unity': 4,
    'Photon Mapping': 4,
    'Javascript': 4,
    'React': 2,
    'Ruby': 2,
    'Angular': 1,
    'OpenGL': 3,
    'C#': 3,
    'Assembly': 2,
    'Game Development': 3,
    'CUDA': 3,
    'OptiX': 3
}

# Create your views here.
def index(request):
    "Return the index file"
    index_file_path = os.path.join(settings.BASE_DIR, 'index.html')

    response = render(request, 'index.html', { 'skills': skills })

    with open(index_file_path, 'w') as destination_file:
        destination_file.write(str(response.content, 'utf-8'))

    return response