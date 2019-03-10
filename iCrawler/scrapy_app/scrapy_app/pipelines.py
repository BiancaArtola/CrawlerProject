from main.models import ScrapyItem
import json

class ScrapyAppPipeline(object):
    def __init__(self, unique_id, *args, **kwargs):
        self.unique_id = unique_id
        self.urls=[]
        self.datas=[]
        #self.items['url']=""
        #self.items['data']=""

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            unique_id=crawler.settings.get('unique_id'), # this will be passed from django view
        )

    def close_spider(self, spider):
        # And here we are saving our crawled data with django models.
        print("La longitud es "+str(len(self.urls)))
        for d,u in zip(self.datas,self.urls):
            print("estoy en el close "+d)
            print("estoy en el close "+u)
            item = ScrapyItem()
            item.unique_id = self.unique_id
            item.url = u
            item.data= d
            print(item.data)
            print(item.url)
            item.save()
            print("guardado")

    def process_item(self, item, spider):
        #self.items['url']=self.items['url']+item['url']
        #self.items['data']=self.items['data']+item['data']
        #print("antes es "+str(len(self.urls)))
        self.urls.append(item['url'])
        #print("despues de "+item['url']+"es "+str(len(self.urls)))
        self.datas.append(item['data'])
        return item