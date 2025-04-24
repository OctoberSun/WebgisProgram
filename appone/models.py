from django.db import models

class Testdb(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'testdb'


class Argoheader(models.Model):
    platformnumber = models.IntegerField(primary_key=True)
    cyclenumber = models.SmallIntegerField()
    sampledirection = models.CharField(max_length=1, blank=True, null=True)
    datamode = models.CharField(max_length=1, blank=True, null=True)
    sampledate = models.CharField(max_length=10, blank=True, null=True)
    latitude = models.DecimalField(max_digits=5, decimal_places=3, blank=True, null=True)
    longitude = models.DecimalField(max_digits=6, decimal_places=3, blank=True, null=True)
    dataclass = models.CharField(max_length=4, blank=True, null=True)
    geom = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'argoheader'
        unique_together = (('platformnumber', 'cyclenumber'),)

class Argometa(models.Model):
    platformnumber = models.CharField(primary_key=True, max_length=7)
    transmissionsystem = models.CharField(max_length=16, blank=True, null=True)
    positionsystem = models.CharField(max_length=16, blank=True, null=True)
    platformmodel = models.CharField(max_length=16, blank=True, null=True)
    platformmaker = models.CharField(max_length=3, blank=True, null=True)
    floatserialnumber = models.SmallIntegerField(blank=True, null=True)
    wmoinstrumenttype = models.SmallIntegerField(blank=True, null=True)
    projectname = models.CharField(max_length=64, blank=True, null=True)
    datacenter = models.CharField(max_length=2, blank=True, null=True)
    piname = models.CharField(max_length=60, blank=True, null=True)
    startupdateoffloat = models.DateTimeField(blank=True, null=True)
    launchdate = models.DateTimeField(blank=True, null=True)
    launchlat = models.DecimalField(max_digits=5, decimal_places=3, blank=True, null=True)
    launchlon = models.DecimalField(max_digits=6, decimal_places=3, blank=True, null=True)
    cycletime = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    parkpressure = models.SmallIntegerField(blank=True, null=True)
    profilepressure = models.SmallIntegerField(blank=True, null=True)
    geom = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'argometa'

class Argocore(models.Model):
    platformnumber = models.CharField(max_length=7)
    cyclenumber = models.SmallIntegerField()
    pressure = models.DecimalField(max_digits=6, decimal_places=1, blank=True, null=True)
    temperature = models.DecimalField(max_digits=5, decimal_places=3, blank=True, null=True)
    salinity = models.DecimalField(max_digits=5, decimal_places=3, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'argocore'