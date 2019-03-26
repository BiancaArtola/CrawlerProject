import json
from django.db import models

class Propiedad(models.Model):
    unique_id = models.CharField(max_length=100, null=True)
    imagen = models.TextField()
    titulo = models.TextField()
    direccion = models.TextField()
    url = models.TextField()

    @property
    def to_dict(self):
        data = {
            'unique_id':  self.unique_id,
            'imagen':  self.imagen,
            'titulo':  self.titulo,
            'direccion':  self.direccion,
            'url':  self.url
        }
        return data

    def __str__(self):
        return self.unique_id