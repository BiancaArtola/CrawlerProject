import json
from django.db import models
from django.utils import timezone

class ScrapyItem(models.Model):
    unique_id = models.CharField(max_length=100, null=True)
    data = models.TextField() # this stands for our crawled data
    date = models.DateTimeField(default=timezone.now)
    url = models.TextField()
    
    # This is for basic and custom serialisation to return it to client as a JSON.
    @property
    def to_dict(self):
        data = {
            'url':  self.url,
            'data': self.data
        }
        return data

    def __str__(self):
        return self.unique_id