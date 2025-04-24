from django.urls import path
from . import views
from . import apps

# app_name = 'app_index'
app_name = apps.AppIndexConfig.name
urlpatterns = [

    path('',views.index,name='index'),
    path('dbcreate',views.dbcreate,name='dbcreate'),
    path('dbupdate',views.dbupdate,name='dbupdate'),
    path('dbselect',views.dbselect,name='dbselect'),
    path('dbdelete',views.dbdelete,name='dbdelete'),
    path('get_track/',views.get_track,name='get_track'),
    path('get_argometa',views.get_argometa,name='get_argometa'),
    path('get_temp_sal',views.get_temp_sal,name='get_temp_sal'),

]
