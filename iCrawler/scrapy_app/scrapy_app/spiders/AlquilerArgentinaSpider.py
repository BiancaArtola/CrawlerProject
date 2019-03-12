import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
import scrapy
from scrapy.selector import Selector

class AlquilerArgentinaSpider(CrawlSpider):
    name = 'alquilerargentina'

    def __init__(self, *args, **kwargs):
        # We are going to pass these args from our django view.
        # To make everything dynamic, we need to override them inside __init__ method
        self.url = kwargs.get('url')
        self.domain = kwargs.get('domain')
        print()
        self.start_urls = [self.url]
        self.allowed_domains = [self.domain]

        AlquilerArgentinaSpider.rules = [
           #Rule(LinkExtractor(allow =(), restrict_xpaths = ('//ul[@class="pagination"]/li[last()]/a'))),
           Rule(LinkExtractor(allow = (), restrict_xpaths = ('//a[@class="product-image"]'))
            ,callback= 'parse_item', follow=False)
        ]
        super(AlquilerArgentinaSpider, self).__init__(*args, **kwargs)

    def parse_item(self, response):
        # You can tweak each crawled page here
        # Don't forget to return an object.
        #informacion = response.xpath('//ul[@class="pagination pagination-blue pagination-lg"]/li[last()]/a/@href').get()
        arreglo = {}
        arreglo['url'] = response.url
        print(response.url)
        arreglo['data'] = "hola"
        return arreglo