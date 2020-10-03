# todos/serializers.py
from rest_framework import serializers
from .models import *
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from django.contrib.auth.models import Group


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'description',
        )
        model = Todo
class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer 
        fields = ('pk','first_name', 'last_name', 'email', 'phone','address','description')

class GroupSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Group
        fields = ('name',)

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    class Meta:
        model = User
        fields = ('pk','username','groups')
class UseremailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email')
class HousingSerializer(serializers.ModelSerializer):
    owner =  UseremailSerializer(many=False)
    #    landord = serializers.ReadOnlyField(source='owner.username')
    #    email = serializers.ReadOnlyField(source='owner.email')
    #    rent = serializers.IntegerField(required=True)
    #    address = serializers.CharField(required=False, allow_blank=True, max_length=100)
    class Meta:
        model = Housing
        fields = ['pk','owner','rent','address','image']
        #fields = ('landord','email','rent','address')

class HousingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Housing
        fields = ['pk','owner','rent','address','image']

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    groups = serializers.CharField(required=True)
    def validate_groups(self, value):
        return value
    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token
    #def get_groups(self, obj):
    #    print("object",obj)
    #    #my_group = Group.objects.get(name=obj)
    #    return obj

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        groups = validated_data.pop('groups',None)
        #print("validdata:!!!!! ",validated_data)
        #print("groups: ",groups) 
        my_group = Group.objects.get(name=groups)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        my_group.user_set.add(instance)
        return instance

    class Meta:
        model = User
        fields = ('pk','token', 'username', 'password', 'email', 'groups')