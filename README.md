# foodgasm

## upload photo and get image tags
```
    URL : /foods
    Method : POST
    Headers: None
    Authenticate = None
    Body : file=[file]
    Params : None
    Success Response :
        Code 201
            {
                "tags": [
                    {
                        "locations": [],
                        "properties": [],
                        "mid": "/m/02q08p0",
                        "locale": "",
                        "description": "Dish",
                        "score": 0.9934034943580627,
                        "confidence": 0,
                        "topicality": 0.9934034943580627,
                        "boundingPoly": null
                    },
                    <object>
                ],
                "likes": [],
                "_id": "5cd4ea3e1837c23b245f9f58",
                "image": "https://storage.googleapis.com/foodgasm.michaelryans.club/1557457467676kolak.jpeg",
                "__v": 0
            }
    Error Response :
        Code: 500 
        Content: { message : <error message> }
```
## update foods
```
    URL : /foods/:id
    Method : PATCH
    Headers: None
    Authenticate = None
    Body : name=[string], tags=[array], location=[string] , caption=[string]
    Params : id=[string]
    Success Response :
        Code 200
            {
                "tags": [
                    {
                        "locations": [],
                        "properties": [],
                        "mid": "/m/02q08p0",
                        "locale": "",
                        "description": "Dish",
                        "score": 0.9934034943580627,
                        "confidence": 0,
                        "topicality": 0.9934034943580627,
                        "boundingPoly": null
                    },
                    <object>
                ],
                "likes": [],
                "_id": "5cd4ea3e1837c23b245f9f58",
                "image": "https://storage.googleapis.com/foodgasm.michaelryans.club/1557457467676kolak.jpeg",
                "__v": 0,
                "name" : "hehehe"
            }
    Error Response :
        Code: 500 
        Content: { message : <error message> }
```
## get all foods
```
    URL : /foods
    Method : GET
    Headers: None
    Authenticate = None
    Body : None
    Params : None
    Query : tag=[string], search=[string]
    Success Response :
        Code 200
        [
            {
                "tags": [
                    {
                        "locations": [],
                        "properties": [],
                        "mid": "/m/02q08p0",
                        "locale": "",
                        "description": "Dish",
                        "score": 0.9934034943580627,
                        "confidence": 0,
                        "topicality": 0.9934034943580627,
                        "boundingPoly": null
                    },
                    <object>
                ],
                "likes": [],
                "_id": "5cd4ea3e1837c23b245f9f58",
                "image": "https://storage.googleapis.com/foodgasm.michaelryans.club/1557457467676kolak.jpeg",
                "__v": 0,
                "name" : "hehehe"
            },
            <object>
        ]
    Error Response :
        Code: 500 
        Content: { message : <error message> }
```
## delete one
```
    URL : /foods/:id
    Method : DELETE
    Headers: None
    Authenticate = None
    Body : None
    Params : id=[string]
    Query : None
    Success Response :
        Code 200
        {
            "_id": "5cd4ea3e1837c23b245f9f58"
        }
    Error Response :
        Code: 500 
        Content: { message : <error message> }
```
##  User Login
```
    URL : /users/login
    Method : POST
    Headers: None
    Authenticate = None
    Body : password=[string], email=[string]
    Params : None
    Success Response :
        Code 201
            {
                "token": <token> 
            }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  Google sign in
```
    URL : /oauth/google-sign-in
    Method : POST
    Headers: None
    Authenticate = None
    Body : id_token=[string]
    Params : None
    Success Response :
        Code 201
            {
                "token": <token> ,
            }
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
##  User Register
```
    URL : /users/register
    Method : POST
    Headers: None
    Authenticate = None
    Body : name=[string], password=[string], email=[string]
    Params : None
    Success Response :
        Code 201
            {
                "_id": "5ccb24a09d738f4fd1011de0",
                "email": "mail@mail.com",
                "password": "$2a$10$.HDPulTBd1.M0vTnU7oyDe4j8b3o68uj2FWAFJc.jhEgF4478rxna",
                "__v": 0
            }
    Error Response :
        Code: 500 
        Content: { message : <error message> }
```