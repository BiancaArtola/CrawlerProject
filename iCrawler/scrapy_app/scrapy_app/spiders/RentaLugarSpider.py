import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
import scrapy
from scrapy.selector import Selector

class RentaLugarSpider(CrawlSpider):
    name = 'rentalugar'

    def __init__(self, *args, **kwargs):
        self.url = kwargs.get('url')
        self.domain = kwargs.get('domain')
        print()
        self.start_urls = [self.url]
        self.allowed_domains = [self.domain]

        RentaLugarSpider.rules = [
           Rule(LinkExtractor(allow = (), restrict_xpaths = ('//a[@class="product-image"]'))
            ,callback= 'parse_item', follow=False)
        ]
        super(RentaLugarSpider, self).__init__(*args, **kwargs)

    def parse_item(self, response):        
        imagen = response.xpath('//div[@class="product-img-box"]/div/div/div/a/@href').get()
        titulo = response.xpath('//div[@class="productName"]/h1/text()').get()
        direccion = response.xpath('(//div[@class="address"]/p/text())[2]').get()
        arreglo = {}
        #Guardamos informacion obtenida por el crawler en diccionario
        arreglo['imagen']=imagen
        arreglo['titulo']=titulo
        arreglo['url'] = response.url
        arreglo['direccion'] = direccion
        return arreglo