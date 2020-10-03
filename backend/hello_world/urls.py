"""hello_world URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.urls import re_path
from todos import views
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('todos.urls'),name="todos"),
    path('api/current_user/', views.current_user,name="cur_user"),
    path('api/customers/',views.customers_list,name="customers_list"),
    path('api/customers/<int:pk>',views.customers_detail,name="customers_detail"),
    path('api/housings/',views.housing_list,name="housing_list"),
    path('api/housings/<int:pk>',views.housing_detail,name="housing_detail"),
    path('api/housings/s/<str:field>/<str:query>',views.housing_search,name="housing_search"),
    path('api/customers/s/<str:field>/<str:query>', views.customers_search, name="customers_search"),
    #url(r'^api/customers/$', views.customers_list),
    #url(r'^api/customers/(?P<pk>[0-9]+)$', views.customers_detail),
    #re_path(".*", TemplateView.as_view(template_name="index.html")),
    path('token-auth/', obtain_jwt_token),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

