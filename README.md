# RA_Agency #

# Команды управления #
## Установка модулей ##
`npm install`
## Запуск в nodemon ##
`npm run dev`

##  ##

# REST API #
The REST API to the example app is described below. 
## 1. User controler ##
## 1.1 Login ##
` POST /api/user/login `
### Request  ###

	"email": String,
	"password": String
{
	"email":"test-mail@gmail.com",
	"password":"qwerty123"
}
### Resonpse  ###

	"token": String
{
	"token": "eyJhbGciOiJ.......dRsfKBU9YxfmWYpXix14qb-0wh2Gi8gAkYMLEM",
}

## 1.2 Refresh Token ##
` GET /api/user/refresh `
### Request  ###
 {} 
### Resonpse  ###

	"token": String
{
	"token": "eyJhbGciOiJ.......dRsfKBU9YxfmWYpXix14qb-0wh2Gi8gAkYMLEM",
}

## 2. Estate controller ##

## 2.1 Create estate ##
` POST /api/estate `
### Request ###

 	"name": String,
	"description": String,
	"price": Number,
	"address": String,
	"area": Number,
 	"Images": File || File[],
{

    "name": "plaza2",
    "price": 1200,
    "description": "text description",
    "address": "Taganrog",
    "area": 64.2,
    "image": [
        Files
    ]
}

### Response ###

    "id": Number,
    "name": String,
    "price": Number,
    "description": String,
    "address": String,
    "area": Number,
    "updatedAt": Timestamp,
    "createdAt": Timestamp,
    "image": String[]


        
{
    "id": 2,
    "name": "plaza2",
    "price": 1200,
    "description": "text description",
    "address": "Taganrog",
    "area": 64.2,
    "updatedAt": "2024-05-11T17:34:04.912Z",
    "createdAt": "2024-05-11T17:34:04.912Z",
    "image": [
        "ca36c9ec-3a3e-491d-a8d9-019cbd085e73.jpg",
        "2a34f582-07f5-42b5-9bbe-91c011744a19.jpg"
    ]
}
## 2.2 Get Static files (Estate images) ##
` GET /static/:imageName `
### Request ###

### Response ###
  Image

  
## 2.3 Get All estates ##
` GET /api/estate`
### Request ###

### Response ###

    [
    {
  	  "id": Number,
      "name": String,
      "price": Number,
      "description": String,
      "address": String,
      "area": Number,
      "updatedAt": Timestamp,
      "createdAt": Timestamp,
      "image": String[]
    }
    ]
        
[
  {
    "id": 2,
    "name": "plaza2",
    "price": 1200,
    "description": "text description",
    "address": "Taganrog",
    "area": 64.2,
    "updatedAt": "2024-05-11T17:34:04.912Z",
    "createdAt": "2024-05-11T17:34:04.912Z",
    "image": [
        "ca36c9ec-3a3e-491d-a8d9-019cbd085e73.jpg",
        "2a34f582-07f5-42b5-9bbe-91c011744a19.jpg"
    ]
  }
]


## 2.3 Get one estate by id ##
` GET /api/estate/:id`
### Request ###

### Response ###
	
    "id": Number,
    "name": String,
    "price": Number,
    "description": String,
    "address": String,
    "area": Number,
    "updatedAt": Timestamp,
    "createdAt": Timestamp,
    "image": String[]


        
{
    "id": 2,
    "name": "plaza2",
    "price": 1200,
    "description": "text description",
    "address": "Taganrog",
    "area": 64.2,
    "updatedAt": "2024-05-11T17:34:04.912Z",
    "createdAt": "2024-05-11T17:34:04.912Z",
    "image": [
        "ca36c9ec-3a3e-491d-a8d9-019cbd085e73.jpg",
        "2a34f582-07f5-42b5-9bbe-91c011744a19.jpg"
    ]
}


##  2.4 Remove estate ##
` DELETE /api/estate `
### Request ###

    "estateId": Number

  {
    "estateId":"1"
  }
  
### Response ###
    Number ("1" if deleted)

    1
    
## 3. Statement Controller ##
## 3.1 Create Statement ##
` POST /api/statement/`
### Request ###

    "name":String,
    "email":String,
    "text":String,
    "phone":String,
    "consultation": Boolean,

{
    "name":"Inal",
    "email":"test2@mail.ru",
    "text":"statement text",
    "phone":"89281234567",
    "consultation": true,
}

### Response ###
	
    "id": Number,
    "name": String,
    "phone": String,
    "email": String,
    "text": String,
    "consultation": Boolean,
    "updatedAt": Timestamp,
    "createdAt": Timestamp

{
    "id": 2,
    "name": "Inal",
    "phone": "1234567890000",
    "email": "test2@mail.ru",
    "text": "statement text",
    "consultation": false,
    "updatedAt": "2024-05-11T18:04:57.992Z",
    "createdAt": "2024-05-11T18:04:57.992Z"
}

## 3.2 Get One Statement ##
` GET /api/statement/:id`
### Request ###

### Response ###
	
    "id": Number,
    "name": String,
    "phone": String,
    "email": String,
    "text": String,
    "consultation": Boolean,
    "updatedAt": Timestamp,
    "createdAt": Timestamp

{
    "id": 2,
    "name": "Inal",
    "phone": "1234567890000",
    "email": "test2@mail.ru",
    "text": "statement text",
    "consultation": false,
    "updatedAt": "2024-05-11T18:04:57.992Z",
    "createdAt": "2024-05-11T18:04:57.992Z"
}

## 3.3 Get All Statement ##
` GET /api/statement/`
### Request ###

### Response ###
	
    [
    {
    "id": Number,
    "name": String,
    "phone": String,
    "email": String,
    "text": String,
    "consultation": Boolean,
    "updatedAt": Timestamp,
    "createdAt": Timestamp
    }
    ]

[
  {
    "id": 2,
    "name": "Inal",
    "phone": "1234567890000",
    "email": "test2@mail.ru",
    "text": "statement text",
    "consultation": false,
    "updatedAt": "2024-05-11T18:04:57.992Z",
    "createdAt": "2024-05-11T18:04:57.992Z"
  }
]


## 3.4 Remove Statement ##
` DELETE /api/statement/`
### Request ###

    "statementId":String

{
    "statementId":"2"
}
### Response ###
	
    
    {
    "id": Number,
    "name": String,
    "phone": String,
    "email": String,
    "text": String,
    "consultation": Boolean,
    "updatedAt": Timestamp,
    "createdAt": Timestamp
    }
    


  {
    "id": 2,
    "name": "Inal",
    "phone": "1234567890000",
    "email": "test2@mail.ru",
    "text": "statement text",
    "consultation": false,
    "updatedAt": "2024-05-11T18:04:57.992Z",
    "createdAt": "2024-05-11T18:04:57.992Z"
  }

## 4. OwnerData Controller ##
## 4.1 Upload Data  ##
` POST /api/owner/`
### Request ###

    "name":String,
    "address":String",
    "email":String


{
    "name":"Ra_Agency223",
    "address":"Taganrog",
    "email":"test@mail.ru"
}

### Response ###
	
    "id": Number,
    "name": String,
    "email": String,
    "address": String,
    "createdAt": Timestamps,
    "updatedAt": Timestamps

{
    "id": 1,
    "name": "RA_Agency",
    "email": "rasul-adzhimuradov@mail.ru",
    "address": "Russia",
    "createdAt": "2024-01-04T21:00:00.000Z",
    "updatedAt": "2024-05-11T18:19:34.047Z"
}

## 4.2 Get Owner Data ##
` GET /api/owner`
### Request ###

### Response ###
	  [
     {
    "id": Number,
    "name": String,
    "email": String,
    "address": String,
    "createdAt": Timestamps,
    "updatedAt": Timestamps
    }
    ] 
[
{
    "id": 1,
    "name": "RA_Agency",
    "email": "rasul-adzhimuradov@mail.ru",
    "address": "Russia",
    "createdAt": "2024-01-04T21:00:00.000Z",
    "updatedAt": "2024-05-11T18:19:34.047Z"
}
]

