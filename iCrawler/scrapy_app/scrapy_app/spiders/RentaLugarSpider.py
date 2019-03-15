import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
import scrapy
from scrapy.selector import Selector

class RentaLugarSpider(CrawlSpider):
    name = 'rentalugar'

    def __init__(self, *args, **kwargs):
        # We are going to pass these args from our django view.
        # To make everything dynamic, we need to override them inside __init__ method
        self.url = kwargs.get('url')
        self.domain = kwargs.get('domain')
        print()
        self.start_urls = [self.url]
        self.allowed_domains = [self.domain]

        RentaLugarSpider.rules = [
           #Rule(LinkExtractor(allow =(), restrict_xpaths = ('//ul[@class="pagination"]/li[last()]/a'))),
           Rule(LinkExtractor(allow = (), restrict_xpaths = ('//a[@class="product-image"]'))
            ,callback= 'parse_item', follow=False)
        ]
        super(RentaLugarSpider, self).__init__(*args, **kwargs)

    def parse_item(self, response):
        # You can tweak each crawled page here
        # Don't forget to return an object.
        
        imagen = response.xpath('//div[@class="product-img-box"]/div/div/div/a/@href').get()
        print("RENT "+imagen)
        arreglo = {}
        arreglo['url'] = response.url
        arreglo['data'] = "hola"
        return arreglo