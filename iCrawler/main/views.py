from uuid import uuid4
from urllib.parse import urlparse
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.views.decorators.http import require_POST, require_http_methods
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from scrapyd_api import ScrapydAPI
from main.models import Propiedad
from rest_framework import generics
import json

# Conectando Scrapyd
scrapyd = ScrapydAPI('http://localhost:6800')


def is_valid_url(url):
    validate = URLValidator()
    try:
        validate(url) 
    except ValidationError:
        return False

    return True


@csrf_exempt
@require_http_methods(['POST', 'GET']) 
def crawl(request):
    #POST: nueva tarea de crawling
    if request.method == 'POST':
        urlParaIrnos = request.POST.get('url', None) 
        urlRental = request.POST.get('url2', None)

        if not urlParaIrnos:
            return JsonResponse({'error': 'Missing  args'})
        
        if not is_valid_url(urlParaIrnos):
            return JsonResponse({'error': 'URL is invalid'})
        
        if not urlRental:
            return JsonResponse({'error': 'Missing  args'})
        
        if not is_valid_url(urlRental):
            return JsonResponse({'error': 'URL is invalid'})

        domainParaIrnos = urlparse(urlParaIrnos).netloc 
        domainRental = urlparse(urlRental).netloc

        unique_id = str(uuid4()) 
        
        settings = {
            'unique_id': unique_id, 
            'USER_AGENT': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
        
        #Lanzamos los dos procesos y guardamos sus id para chequear luego su estado

        task1 = scrapyd.schedule('default', 'parairnos', 
            settings=settings, url=urlParaIrnos, domain=domainParaIrnos)
        task2 = scrapyd.schedule('default', 'rentalugar', 
            settings=settings, url=urlRental, domain=domainRental)
        
        return JsonResponse({'task_id1': task1,'task_id2': task2, 'unique_id': unique_id, 'status': 'started' })
        #GET: chequear estado de arañas ya lanzadas
    elif request.method == 'GET':
        task_id1 = request.GET.get('task_id1', None)
        task_id2 = request.GET.get('task_id2', None)
        unique_id = request.GET.get('unique_id', None)

        if not task_id1 or not task_id2 or not unique_id:
            return JsonResponse({'error': 'Missing args'})

    
        status1 = scrapyd.job_status('default', task_id1)
        status2 = scrapyd.job_status('default', task_id2)
        if (status1 == 'finished') and (status2 == 'finished'):
            try:
                item = Propiedad.objects.filter(unique_id=unique_id)
                lista= list(item)
                defi=[]
                for i in lista:
                    defi.append(i.to_dict)
                resp= JsonResponse({'data': json.dumps(defi)})
                return resp
            except Exception as e:
                return JsonResponse({'error': str(e)})
        else:
            if (status1=='finished'):
                return JsonResponse({'status': status2})
            else:
                return JsonResponse({'status': status1})

