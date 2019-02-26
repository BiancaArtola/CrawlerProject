from django.urls import path
from . import views

urlpatterns = [
    path('api/scrap/', views.CrawListCreate.as_view() ),
]