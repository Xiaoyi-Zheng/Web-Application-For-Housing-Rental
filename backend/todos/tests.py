from django.test import TestCase
from .models import *
from rest_framework import status
from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from django.contrib.auth.models import User
from rest_framework.test import force_authenticate
from rest_framework.test import APIClient
from .serializers import *


class CustomerTests(APITestCase):

    def setUp(self):
        self.u=User.objects.create_user(username='user', email='user@foo.com', password='pass')
        self.u.is_active = True
        self.u.save()
        Customer.objects.create(first_name="baozi",last_name="emperor",email="middle_south_sea@china.cn",phone="10086")
        #Customer.objects.create(first_name="user2",last_name="last",email="student@uwaterloo.cn",phone="10086")
    def test_get_all_customer(self):
        url = reverse('customers_list')
        self.client.force_authenticate(user=self.u)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), 1)
        self.assertEqual(response.data['data'][0]['first_name'], "baozi")

    def test_create_customer(self):
        """
        Ensure we can create a new account object.
        """
        #print("hello")
        self.assertEqual(Customer.objects.count(), 1)
        url = reverse('customers_list')
        self.client.force_authenticate(user=self.u)
        data = {'first_name': 'Tom','last_name':'Smith', 'email':'user@foo.com','phone':"10086"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 2)

    def test_create_customer_failure(self):
        """
        Ensure we can create a new account object.
        """
        #print("hello")
        self.assertEqual(Customer.objects.count(), 1)
        url = reverse('customers_list')
        self.client.force_authenticate(user=self.u)
        data = {'first_name': None,'last_name':'Smith', 'email':'user@foo.com','phone':"hellow!"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_customer_detail_test(self):
        #print("hello!!")
        self.client.force_authenticate(user=self.u)
        url =reverse('customers_detail', kwargs={'pk': 1})
        response = self.client.get(url, format='json')
        customers =  Customer.objects.get(pk=1)
        #print(customers)
        serializer = CustomerSerializer(customers, many=False)
        self.assertEqual(response.data, serializer.data)

    def test_put_customer_detail_test(self):
        #print("hello!!!")
        self.client.force_authenticate(user=self.u)
        url =reverse('customers_detail', kwargs={'pk': 1})
        data = {'pk':'1','first_name': 'Tom','last_name':'Smith', 'email':'user@foo.com','phone':"10086", 'address': None, 'description': None}
        response = self.client.put(url,data ,format='json')
        #print(response.data)
        self.assertEqual(response.data['first_name'], data['first_name'])

    def test_delete_customer_detail_test(self):
        self.client.force_authenticate(user=self.u)
        url =reverse('customers_detail', kwargs={'pk': 1})
        response = self.client.delete(url ,format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_customer_detail_failure(self):
        self.client.force_authenticate(user=self.u)
        url =reverse('customers_detail', kwargs={'pk': 10})
        response = self.client.delete(url ,format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_search_customer(self):
        self.client.force_authenticate(user=self.u)
        url =reverse('customers_search', kwargs={'field':'Name','query':'baozi'})
        response = self.client.get(url, format='json')
        #print(response.data)
        customers =  Customer.objects.get(first_name="baozi")
        serializer = CustomerSerializer(customers, many=False)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['data'][0]['first_name'],  serializer.data['first_name'])
        self.assertEqual(response.data['data'][0]['last_name'],  serializer.data['last_name'])

class HousingTests(APITestCase):

    def setUp(self):
        self.u=User.objects.create_user(username='user', email='user@foo.com', password='pass')
        self.u.is_active = True
        self.u.save()
        Housing.objects.create(owner=self.u,rent='500',address='random')

    def test_get_all_housings(self):
        url = reverse('housing_list')
        self.client.force_authenticate(user=self.u)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), 1)
        self.assertEqual(response.data['data'][0]['owner']['email'], self.u.email)

    def test_create_housing(self):
        self.assertEqual(Housing.objects.count(), 1)
        url = reverse('housing_list')
        self.client.force_authenticate(user=self.u)
        data = {'rent':'501','address':'random'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Housing.objects.count(), 2)

    def test_create_housing_failure(self):
        self.assertEqual(Housing.objects.count(), 1)
        url = reverse('housing_list')
        self.client.force_authenticate(user=self.u)
        data = {'rent':None,'address':'random'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Housing.objects.count(), 1)

    def test_get_housing_detail_test(self):
        self.client.force_authenticate(user=self.u)
        url =reverse('housing_detail', kwargs={'pk': 1})
        response = self.client.get(url, format='json')
        h =  Housing.objects.get(pk=1)
        #print(customers)
        serializer = HousingCreateSerializer(h, many=False)
        self.assertEqual(response.data, serializer.data)

    def test_put_housing_detail_test(self):
        self.client.force_authenticate(user=self.u)
        url =reverse('housing_detail', kwargs={'pk': 1})
        data = {'rent':'501','address':'canada'}
        response = self.client.put(url,data ,format='json')
        #print(response.data)
        self.assertEqual(response.data['address'], data['address'])

    def test_delete_housing_detail_test(self):
        self.client.force_authenticate(user=self.u)
        url =reverse('housing_detail', kwargs={'pk': 1})
        response = self.client.delete(url ,format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_housing_detail_failure(self):
        self.client.force_authenticate(user=self.u)
        url =reverse('housing_detail', kwargs={'pk': 10})
        response = self.client.delete(url ,format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_search_housing(self):
        self.client.force_authenticate(user=self.u)
        url =reverse('housing_search', kwargs={'field':'Address','query':'random'})
        response = self.client.get(url, format='json')
        print("hellow!: ",response.data)
        h =  Housing.objects.get(pk=1)
        serializer = HousingSerializer(h, many=False)
        self.assertEqual(response.data['data'][0]['address'],  serializer.data['address'])
        self.assertEqual(response.data['data'][0]['rent'],  serializer.data['rent'])

class UserAuthTests(APITestCase):
    def setUp(self):
        self.u=User.objects.create_user(username='user', email='user@foo.com', password='pass')
        self.u.is_active = True
        self.u.save()
    def test_current_user(self):
        self.client.force_authenticate(user=self.u)
        url =reverse('cur_user')
        response = self.client.get(url, format='json')
        serializer = UserSerializer(self.u, many=False)
        self.assertEqual(response.data, serializer.data)

class TodoModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Todo.objects.create(title='first todo')
        Todo.objects.create(description='a description here')

    def test_title_content(self):
        todo = Todo.objects.get(id=1)
        expected_object_name = f'{todo.title}'
        self.assertEquals(expected_object_name, 'first todo')

    def test_description_content(self):
        todo = Todo.objects.get(id=2)
        expected_object_name = f'{todo.description}'
        self.assertEquals(expected_object_name, 'a description here')
