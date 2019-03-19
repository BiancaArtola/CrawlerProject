from main.models import ScrapyItem
from main.models import Propiedad
import json

"""
class ScrapyAppPipeline(object):
    def __init__(self, unique_id, *args, **kwargs):
        self.unique_id = unique_id
        self.urls=[]
        self.datas=[]

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            unique_id=crawler.settings.get('unique_id'), # this will be passed from django view
        )

    def close_spider(self, spider):
        # And here we are saving our crawled data with django models.
        print("la longitud es"+str(len(self.urls)))
        for data,url in zip(self.datas,self.urls):
            item = ScrapyItem()
            item.unique_id = self.unique_id
            item.url = url
            item.data= data
            item.save()

    def process_item(self, item, spider):
        self.urls.append(item['url'])
        self.datas.append(item['data'])
        return item
        """

class ScrapyAppPipeline(object):
    def __init__(self, unique_id, *args, **kwargs):
        self.unique_id = unique_id
        self.urls=[]
        self.imagenes=[]
        self.titulos=[]
        self.direcciones=[]

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            unique_id=crawler.settings.get('unique_id'), # this will be passed from django view
        )

    def close_spider(self, spider):
        # And here we are saving our crawled data with django models.
        
        for imagen,url,titulo,direccion in zip(self.imagenes,self.urls,self.titulos,self.direcciones):
            item = Propiedad()
            item.unique_id = self.unique_id
            item.url = url
            if imagen == None:
                item.imagen= "http://textiletrends.in/gallery/1547020644No_Image_Available.jpg"
            else:
                item.imagen= imagen
            item.titulo = titulo
            if direccion == None:
                item.direccion= "Sin dirección"
            else:
                item.direccion= direccion
            item.save()

    def process_item(self, item, spider):
        self.urls.append(item['url'])
        self.imagenes.append(item['imagen'])
        self.titulos.append(item['titulo'])
        self.direcciones.append(item['direccion'])
        return item