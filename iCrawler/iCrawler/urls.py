from django.conf import settings
from django.conf.urls import url,static
from django.views.generic import TemplateView
from main import views
from django.urls import path, include

urlpatterns = [
    path('', include('main.urls')),
    path('', include('frontend.urls')),
    url(r'^api/crawl/', views.crawl, name='crawl'),

] +  static.static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# This is required for static files while in development mode. (DEBUG=TRUE)
# No, not relevant to scrapy or crawling :)
#if settings.DEBUG:
 #   urlpatterns += static.static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
  #  urlpatterns += static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


  #url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),