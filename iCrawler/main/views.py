from uuid import uuid4
from urllib.parse import urlparse
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.views.decorators.http import require_POST, require_http_methods
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from scrapyd_api import ScrapydAPI
#from main.utils import URLUtil
from main.models import ScrapyItem
from main.models import Propiedad
from main.serializers import ScrapyItemSerializer
from rest_framework import generics
import json

# connect scrapyd service
scrapyd = ScrapydAPI('http://localhost:6800')


def is_valid_url(url):
    validate = URLValidator()
    try:
        validate(url) # check if url format is valid
    except ValidationError:
        return False

    return True


@csrf_exempt
@require_http_methods(['POST', 'GET']) # only get and post
def crawl(request):
    # Post requests are for new crawling tasks
    if request.method == 'POST':


        url = request.POST.get('url', None) # take url comes from client. (From an input may be?)
        print("la 2 es "+request.POST.get('url2',None))
        if not url:
            return JsonResponse({'error': 'Missing  args'})
        
        if not is_valid_url(url):
            return JsonResponse({'error': 'URL is invalid'})
        
        domain = urlparse(url).netloc # parse the url and extract the domain
        unique_id = str(uuid4()) # create a unique ID. 
        print(domain)
        print(url)
        
        # This is the custom settings for scrapy spider. 
        # We can send anything we want to use it inside spiders and pipelines. 
        # I mean, anything
        settings = {
            'unique_id': unique_id, # unique ID for each record for DB
            'USER_AGENT': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
        
        # Here we schedule a new crawling task from scrapyd. 
        # Notice that settings is a special argument name. 
        # But we can pass other arguments, though.
        # This returns a ID which belongs and will be belong to this task
        # We are goint to use that to check task's status.

        task1 = scrapyd.schedule('default', 'rentalugar', 
            settings=settings, url=url, domain=domain)
        task2 = scrapyd.schedule('default', 'parairnos', 
            settings=settings, url='https://www.parairnos.com/alquileres-en-monte-hermoso', domain='www.parairnos.com')
        
        return JsonResponse({'task_id1': task1,'task_id2': task2, 'unique_id': unique_id, 'status': 'started' })

    # Get requests are for getting result of a specific crawling task
    elif request.method == 'GET':
        # We were passed these from past request above. Remember ?
        # They were trying to survive in client side.
        # Now they are here again, thankfully. <3
        # We passed them back to here to check the status of crawling
        # And if crawling is completed, we respond back with a crawled data.
        task_id1 = request.GET.get('task_id1', None)
        task_id2 = request.GET.get('task_id2', None)
        unique_id = request.GET.get('unique_id', None)

        if not task_id1 or not task_id2 or not unique_id:
            return JsonResponse({'error': 'Missing args'})

        # Here we check status of crawling that just started a few seconds ago.
        # If it is finished, we can query from database and get results
        # If it is not finished we can return active status
        # Possible results are -> pending, running, finished
        status1 = scrapyd.job_status('default', task_id1)
        status2 = scrapyd.job_status('default', task_id2)
        if (status1 == 'finished') and (status2 == 'finished'):
            try:
                # this is the unique_id that we created even before crawling started.
                item = Propiedad.objects.filter(unique_id=unique_id)
                lista= list(item)
                defi=[]
                for i in lista:
                    defi.append(i.to_dict)
                resp= JsonResponse({'data': json.dumps(defi)})
                #print(resp)
                return resp
            except Exception as e:
                return JsonResponse({'error': str(e)})
        else:
            if (status1=='finished'):
                return JsonResponse({'status': status2})
            else:
                return JsonResponse({'status': status1})

class CrawListCreate(generics.ListCreateAPIView):
    queryset = ScrapyItem.objects.all()
    serializer_class = ScrapyItemSerializer