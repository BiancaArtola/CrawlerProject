# Generated by Django 2.1.4 on 2019-03-15 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_scrapyitem_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Propiedad',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unique_id', models.CharField(max_length=100, null=True)),
                ('imagen', models.TextField()),
                ('titulo', models.TextField()),
                ('direccion', models.TextField()),
                ('url', models.TextField()),
            ],
        ),
    ]
