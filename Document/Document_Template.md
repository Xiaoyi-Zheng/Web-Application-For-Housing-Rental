# Document of User Authentication
- [Introduction](#intro)
- [Requirement](#req)
- [API](#api)
- [UI Design](#ui)


## <a name="intro">Introduction</a>
This is the document of `your content`. This module
implements `your content`. Please refer to this as a guideline. 

## <a name="req">Requirement</a>
### Functional Requirement
- User shall be able to `do something`


### Non-functional Requirement
- User shall be able to `do something`


## <a name="api">API</a>
### /api

#### Request Method
POST / GET / DELETE...

#### Function
`your content`

#### Parameter
| Attribute | Type     | Required | Description|
| ---       |  ------  |--------- |----------- |
| username|  string  | yes      |Username of the user|
| password |  string  | yes      |Password of the user|
| email |  string  | yes      |Email address of the user|
| groups |  string  | yes      |Either 'tenant' or 'landlord'|


#### Response Example
```
{
    'pk': 7,
    'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    'username': "rongzhigu",
    'email': "gurongzhi1997@gmail.com",
    'groups': {
                  {
                      'name': "landlord",
                  }
    }                               
}
```

#### Possible Error State
- 400 BAD REQUEST

---

### /token-auth/
#### Request Method
POST / GET / DELETE...

#### Function
`your content`

#### Parameter

| Attribute | Type     | Required | Description|
| ---       |  ------  |--------- |----------- |
| username|  string  | yes      |Username of the user|
| password |  string  | yes      |Password of the user|


#### Response Example
```
{
    'pk': 7,
    'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    'username': "rongzhigu",
    'email': "gurongzhi1997@gmail.com",
    'groups': {
                  {
                      'name': "landlord",
                  }
    }                               
}
```
#### Possible Error State
- 400 BAD REQUEST

## <a name="ui">UI Design</a>
### Something, make sure to upload the image to /Document directory
![alt text](CREATE_CUSTOMER_UI.png "CREATE_CUSTOMER_UI")

### Something
![alt text](CREATE_CUSTOMER_UI.png "CREATE_CUSTOMER_UI")

