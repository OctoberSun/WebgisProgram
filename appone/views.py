from django.shortcuts import render
from django.db.models import Q
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from . import models

# Create your views here.
def index(request):
    pagetitle = 'Hello World + '
    return render(request, 'index.html', locals())


# def test(request):
#     id = request.GET.get('id')
#     pagetitle = 'Hello World + '
#     # return render(request, 'index.html', locals())
#     result = id
#     return HttpResponse(result)
#
# def dbcreate(request):
#     # 增加数据
#     print(request.method)
#     print(request.path)
#     id = request.GET.get('id')
#     result = {'error': '请联系管理员'}
#
#     if id:
#         record = models.Testdb.objects
#         #select * from argometa
#         try:
#             record.create(id=id,name="test01")
#             return JsonResponse({'result':True})
#         except:
#             return JsonResponse({'result':False})
#
#
# def dbupdate(request):
#     # 修改数据
#
#     id = request.GET.get('id')
#     newName = request.GET.get('newname')
#     result = {'error': '请联系管理员'}
#
#     if id:
#         record = models.Testdb.objects
#         try:
#             record = record.get(id=id)
#             record.name = newName
#             record.save()
#
#             result={'result':True}
#             return JsonResponse(result)
#         except:
#             result={'result':False}
#             return JsonResponse(result)
#
#
# def dbselect(request):
#     # 查询数据
#     record = models.Testdb.objects
#     record = record.filter()
#
#     sort = request.GET.get('sort')
#     sort_filed = request.GET.get('sort_filed')
#
#     if sort:
#         if sort=="True":
#             # 排序，升序
#             record = record.order_by(sort_filed)
#         else:
#             # 降序
#             record = record.order_by('-'+sort_filed)
#
#     id = request.GET.get('id')
#     name = request.GET.get('name')
#     if id and name:
#             # 查询数据
#             # Q()|Q()代表或   ，代表与
#             record = record.filter(Q(id=id)|Q(name=name))
#
#     record = record.values()
#     record = list(record)
#     result = {'result': record}
#
#     return JsonResponse(result)
#
#
# def dbdelete(request):
#     record = models.Testdb.objects
#
#     id = request.GET.get('id')
#     record = record.filter(id=id)
#
#
#     record.delete()
#     result = {'result': True}
#
#     return JsonResponse(result)


def get_track(request):
    # 查询数据
    record = models.Argoheader.objects

    pid = request.GET.get('pid')
    #
    if pid:
        record = record.filter(platformnumber=pid)
        # 升序
        record = record.order_by('cyclenumber')
        record = record.values('platformnumber','cyclenumber','longitude','latitude')

    record = list(record)
    result = {'result': record}

    return JsonResponse(result)


def get_argometa(request):
    # 查询数据
    record = models.Argometa.objects

    pid = request.GET.get('pid')

    if pid:
        record = record.filter(platformnumber=pid)

        record = record.values()

    record = list(record)
    result = {'result': record}

    return JsonResponse(result)

def get_argoheader(request):
    # 查询数据
    record = models.Argoheader.objects

    pid = request.GET.get('pid')
    #
    if pid:
        record = record.filter(platformnumber=pid)
        # 降序
        record = record.order_by("-"+'cyclenumber')
        record = record.values('platformnumber','cyclenumber','longitude','latitude')

    record = list(record)
    result = {'result': record}

    return JsonResponse(result)

# def get_temp_sal(request):
#     # # 查询数据
#     record = models.Argocore.objects
#     #
#     pid = request.GET.get('pid')
#     cyclenum = request.GET.get('cyclenum')
#
#     if pid and cyclenum:
#         record = record.filter(platformnumber=pid,cyclenumber=cyclenum)
#         record = record.order_by('pressure')
#         record = record.values('temperature','salinity')
#
#         #排序
#     record = list(record)
#     result = {'result': record}
#
#     return JsonResponse(result)

    # id = request.GET.get('id')
    # pagetitle = 'Hello World + '
    # # return render(request, 'index.html', locals())
    # result = id+'asdasd '
    # return HttpResponse(result)