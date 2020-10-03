# Document of Search Profile
- [Introduction](#intro)
- [Requirement](#req)
- [API](#api)
- [UI Design](#ui)

## <a name="intro">Introduction</a>
This is the document of search profile module. This module
implements the function of search. Please refer to this as a guideline. 

## <a name="req">Requirement</a>
### Functional Requirement
- User shall be able to search the content of the housing/request list. 
- The search field should change based on the current state of the page.
- The content of the displayed housing/request list should change based on user search.

### Non-functional Requirement
- The result should be returned in less than 1 seconds.

## <a name="api">API</a>
### /api/housings/s/&lt;str:field&gt;/&lt;str:query&gt;

#### Request Method
GET

#### Function
Retrieve housings by query.

#### Parameter
| Attribute | Type     | Required | Description|
| ---       |  ------  |--------- |----------- |
| field|  string  | yes      |Only return rows that contain query content in a specific column(s)|
| query |  string  | yes      |Content of search|


#### Response Example
```
{
    'data': {
                {
                    'pk': 1,
                    'owner': {
                        'username': "chenshm",
                        'email': "844650898@qq.com",
                    },
                    'rent': 500
                    'address': "274 Lester St",
                    'image': "http://localhost:8000/media/housing_images/user_1/274_Lester.jpg",
                },
                {
                    'pk': 2,
                    'owner': {
                        'username': "gurongzhi",
                        'email': "gurongzhi1997@gmail.com",
                    },
                    'rent': 1350
                    'address': "268 Lester St",
                    'image': "http://localhost:8000/media/housing_images/user_2/268_Lester.jpg",
                },

                ......
    },
    'nextlink': "/api/housings/s/your_field/your_query?page=3",
    'prevlink': "/api/housings/s/your_field/your_query?page=1",
}
```

#### Possible Error State
None

---

### /api/customers/s/&lt;str:field&gt;/&lt;str:query&gt;
#### Request Method
POST

#### Function
Retrieve requests by query.

#### Parameter

| Attribute | Type     | Required | Description|
| ---       |  ------  |--------- |----------- |
| field|  string  | yes      |Only return rows that contain query content in a specific column(s)|
| query |  string  | yes      |Content of search|


#### Response Example
```
{
    'data': {
                {
                    'pk': 1,
                    'first_name': "shimeng",
                    'last_name': "chen",
                    'email': "844650898@qq.com",
                    'phone': "123456789",
                    'address': "white house",
                    'description': "waterloo",
                },
                {
                    'pk': 2,
                    'first_name': "shimeng",
                    'last_name': "chen",
                    'email': "shimengchern@gmail.com",
                    'phone': "2265812983",
                    'address': "20 west",
                    'description': "dt",
                },

                ......
    },
    'nextlink': "/api/customers/s/your_field/your_query?page=3",
    'prevlink': "/api/customers/s/your_field/your_query?page=1",
}
```
#### Possible Error State
None

## <a name="ui">UI Design</a>
### Search
![alt text](./UI/Search_UI.png "Search_UI")

