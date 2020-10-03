from django.urls import path

from . import views
from django.urls import path
from .views import *

urlpatterns = [
    path('users/', UserList.as_view()),
    path('', views.ListTodo.as_view()),
    path('<int:pk>/', views.DetailTodo.as_view()),
    path('myhousing/', MyhouseList.as_view()),
]