from rest_framework import serializers
from main.models import ScrapyItem
class ScrapyItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapyItem
        fields = '__all__'