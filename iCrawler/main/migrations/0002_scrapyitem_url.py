# Generated by Django 2.1.4 on 2019-03-08 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='scrapyitem',
            name='url',
            field=models.TextField(default='test.com'),
            preserve_default=False,
        ),
    ]
