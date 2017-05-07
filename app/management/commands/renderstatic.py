import os.path
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from app.views import index 

class Command(BaseCommand):
    help = 'Generates a nice index.html rendering the content'

    index_file_path = os.path.join(settings.BASE_DIR, 'index.html')

    def handle(self, *args, **options):
    	with open(self.index_file_path, 'w') as destination_file:
    		destination_file.write(str(index(None).content, 'utf-8'))
    	print("Generated file in {0}".format(self.index_file_path))