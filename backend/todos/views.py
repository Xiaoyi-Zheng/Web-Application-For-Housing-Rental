from django.shortcuts import render

# Create your views here.
# todos/views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import *
from django.db.models import Q
from .serializers import *

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status, pagination
from rest_framework.views import APIView
from django.contrib.auth.models import Group

class ListTodo(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class DetailTodo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
@api_view(['GET', 'POST'])
def housing_list(request):
    if request.method == 'GET':
        housings = Housing.objects.all()
        data = []
        nextPage = 1
        previousPage = 1
        page = request.GET.get('page', 1)
        paginator = Paginator(housings, 6)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)
        serializer = HousingSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/housings/?page=' + str(nextPage), 'prevlink': '/api/housings/?page=' + str(previousPage)})
    elif request.method == 'POST':
        print("post: ",request.data)
        request.data['owner']=request.user.pk
        serializer = HousingCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'PUT', 'DELETE'])
def housing_detail(request, pk):
    """
 Retrieve, update or delete a customer by id/pk.
 """
    #print("data1!!!!!! ",request.user)
    #print("data1!!!!!! ",request.data)
    #print("data1!!!!!! ",type(request.data))
    request.data['owner']=request.user.pk
    try:
        housing = Housing.objects.get(pk=pk)
    except Housing.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HousingCreateSerializer(housing,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        #print("alow ha: ",request.data)
        serializer = HousingCreateSerializer(housing, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        housing.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['GET', 'POST'])
def customers_list(request):
    """
    List  customers, or create a new customer.
    """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        customers = Customer.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(customers, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CustomerSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/customers/?page=' + str(nextPage),
                         'prevlink': '/api/customers/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def customers_detail(request, pk):
    """
    Retrieve, update or delete a customer by id/pk.
    """
    try:
        customer = Customer.objects.get(pk=pk)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CustomerSerializer(customer, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CustomerSerializer(customer, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def customers_search(request, field, query):
    """
    Retrieve customers by query.
    """
    if request.method == 'GET':
        nextPage = 1
        previousPage = 1
        q_objects = Q()
        if field == "All":
            q_objects |= (Q(pk__contains=query) |
                          Q(first_name__contains=query) |
                          Q(last_name__contains=query) |
                          Q(email__contains=query) |
                          Q(phone__contains=query) |
                          Q(address__contains=query) |
                          Q(description__contains=query))
        elif field == "Name":
            q_objects |= (Q(first_name__contains=query) |
                          Q(last_name__contains=query))
        elif field == "Phone":
            q_objects |= Q(phone__contains=query)
        elif field == "Email":
            q_objects |= Q(email__contains=query)
        elif field == "Address":
            q_objects |= Q(address__contains=query)
        elif field == "Description":
            q_objects |= Q(description__contains=query)
        customers = Customer.objects.filter(q_objects)
        page = request.GET.get('page', 1)
        paginator = Paginator(customers, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CustomerSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/customers/s/' + field + '/' + query + '?page=' + str(nextPage),
                         'prevlink': '/api/customers/s/' + field + '/' + query + '?page=' + str(previousPage)})

@api_view(['GET'])
def housing_search(request, field, query):
    """
    Retrieve customers by query.
    """
    if request.method == 'GET':
        nextPage = 1
        previousPage = 1
        q_objects = Q()
        houses = None
        if field == "All":
            q1 = (Q() | Q(username__contains=query) | Q(email__contains=query))
            #h1 = Housing.objects.filter(owner__in=User.objects.filter(q1))
            q2 = (Q() | Q(rent__lte=float(query)) | Q(address__contains=query) | Q(owner__in=User.objects.filter(q1)))
            h2 = Housing.objects.filter(q2)
            houses =  h2
        elif field == "Landord":
            q_objects |= Q(username__contains=query) 
            houses = Housing.objects.filter(owner__in=User.objects.filter(q_objects))
        elif field == "Rent":
            q_objects |= Q(rent__lte=float(query))
            houses = Housing.objects.filter(q_objects)
        elif field == "Email":
            q_objects |= Q(email__contains=query)
            houses = Housing.objects.filter(owner__in=User.objects.filter(q_objects))
        elif field == "Address":
            q_objects |= Q(address__contains=query)
            houses = Housing.objects.filter(q_objects)

        page = request.GET.get('page', 1)
        paginator = Paginator(houses, 6)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = HousingSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/housings/s/' + field + '/' + query + '?page=' + str(nextPage),
                         'prevlink': '/api/housings/s/' + field + '/' + query + '?page=' + str(previousPage)})

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    #print(request)
    #print(request.user)
    #print(request.user.pk)
    #print(request.pk)

    serializer = UserSerializer(request.user)
    #print("current!!!!!!!:",request.user,serializer.data)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        #print("request data: ",request.data)
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            #print("serializer.data: ",type(serializer.data))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 5

    #prevlink ='/api/myhousing/?page='+str(self.page.previous_page_number())
    def get_paginated_response(self, data):
        if not self.page.has_next():
            nextlink = None
        else:
            nextlink = '/api/myhousing/?page='+str(self.page.next_page_number())
        if not self.page.has_previous():
            prevlink = None
        else:
            prevlink = '/api/myhousing/?page='+str(self.page.previous_page_number())
        return Response({
            'data': data,
            'count': self.page.paginator.count,
            'numpages' : self.page.paginator.num_pages,
            #"nextlink":self.get_next_link(),
            #"prevlink":self.get_previous_link(),
            "nextlink":nextlink,
            "prevlink":prevlink,
                   
        })

class MyhouseList(generics.ListCreateAPIView):
    serializer_class = HousingSerializer
    pagination_class = CustomPagination
    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        userid = self.request.user
        return Housing.objects.filter(owner=userid)

