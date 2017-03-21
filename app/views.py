from django.shortcuts import render
from django.http import HttpResponse
from django_pyscss import DjangoScssCompiler

# Create your views here.
def index(request):
    "Return the index file"
    return render(request, 'index.html')
