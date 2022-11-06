## Endpoints

List of Available Endpoints:
1. `POST /volunteer/register`
2. `POST /volunteer/login`
3. `POST /orphan/register`
4. `POST /orphan/login`
5. `GET /admin/volunteers`
6. `PATCH /admin/orphan/:orphanId`
7. `PATCH /admin/volunteer/:volunteerId`
8. `GET /match`
9. `POST /match`
10. `PUT /match/:matchId`
11. `GET /orphanages`
12. `GET /classes`
13. `GET /classes/:matchId`
14. `GET /categories`
15. `POST /payment/xendit-callback`
16. `GET /payment/donations`

 <br> 

---

 <br> 

## 1. POST /volunteer/register
### Description
- Register an account to be a volunteer

### Request
- Body
    ```json
  {
        "fullName": String,
        "email": String,
        "password": String,
        "imageUrl": File,
        "linkedinUrl": String,,
        "curriculumVitae": File,
        "lastEducation": String
  }
  ```
### Response
_Response 201 - Created_
- Body
    ```json
    {
      "message": String
    }
  ```
_Response 400 - Bad Request_
- Body
  ```json
  {
      "message": String
  }
    ```

 <br> 

---

 <br> 

## 2. POST /volunteer/login
### Description
- Login to the registered and verified volunteer account

### Request
- Body
    ```json
  {
      "email": String,
      "password": String,
  }
  ```
### Response
_Response 200 - OK_
- Body
    ```json
      {
        "access_token": String
      }
  ```
_Response 400 - Bad Request_
- Body
  ```json
    {
      "message": String
    }
    ```

 <br> 

---

 <br> 

## 3. POST /orphan/register
### Description
- Register an account to be an orphan

### Request
- Body
    ```json
  {
		"fullName":String,
		"email": String,
		"password": String,
		"imageUrl": String,
		"OrphanageId":Integer
  }
  ```
### Response
_Response 201 - Created_
- Body
    ```json
	{
		"message": String
	}
  ```
_Response 400 - Bad Request_
- Body
  ```json
	{
		"message": String
	}
    ```

 <br> 

---

 <br> 

## 4. POST /orphan/login
### Description
- Login to the registered and verified orphan account

### Request
- Body
    ```json
  {
      "email": String,
      "password": String,
  }
  ```
### Response
_Response 200 - OK_
- Body
    ```json
	{
		"access_token": String
	}
  ```
_Response 400 - Bad Request_
- Body
  ```json
    {
      "message": String
    }
    ```

 <br> 

---

 <br> 

## 5. GET /admin/volunteers
### Description
- Get all volunteers data

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
  {
      "email": String,
      "password": String,
  }
  ```
### Response
_Response 200 - OK_
- Body
    ```json
    [
      {
          "id": Integer,
          "name": String,
      },
      ...
    ]
    ```

 <br> 

---

 <br> 

## 6. PATCH /admin/orphan/:orphanId
### Description
- XXXXXXX

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
  {
      XXXXXXX
  }
  ```
### Response
_Response 200 - OK_
- Body
    ```json
    [
      {
         XXXXXXX
      },
      ...
    ]
    ```

 <br> 

---

 <br> 

## 7. PATCH admin/orphan/:volunteerId
### Description
- XXXXXXX

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
  {
      XXXXXXX
  }
  ```
### Response
_Response 200 - OK_
- Body
    ```json
    [
      {
         XXXXXXX
      },
      ...
    ]
    ```

 <br> 

---

 <br> 

## 8. GET /match
### Description
- Get all data of matches (volunteers have chosen an orphan to mentor)

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
  ```
### Response
_Response 200 - OK_
- Body
    ```json
    [
        {
            "id": Integer,
            "VolunteerId": Integer,
            "OrphanId": Integer,
            "startDate": String,
            "hour": Hour,
            "endDate": Date,
            "createdAt": String,
            "updatedAt": String,
            "Orphan": {
                "id": Integer,
                "email": String,
                "password": String,
                "fullName": String,
                "imageUrl": String,
                "OrphanageId": Integer,
                "role": String,
                "verified": Boolean,
                "matchStatus": String,
                "createdAt": String,
                "updatedAt": String,
            },
            "Volunteer": {

            },
        },
    ];
    ```

 <br> 

---

 <br> 

## 9. POST /match
### Description
- XXXX

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
  ```
### Response
_Response 200 - OK_
- Body
    ```json
    XXXXXX
    ```

 <br> 

---

 <br> 

## 10. PUT /match
### Description
- XXXXX

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
  ```
- Body
    ```json
    {
        "startDate": String,
        "hour": String
    }
    ```

### Response
_Response 200 - OK_
- Body
    ```json
    {
        "message": String
    }
    ```

<br> 

---

<br> 

## 11. GET /orphanages
### Description
- Get the list of registered orphanages

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
  ```
- Body
    ```json
    {
        "startDate": String,
        "hour": String
    }
    ```

### Response
_Response 200 - OK_
- Body
    ```json
    [
        {
            "id": Integer,
            "name": String,
            "address": String,
            "personInCharge": String,
            "imageUrl": String,
            "createdAt": String,
            "updatedAt": String,
        },
        ...
    ]
    ```

<br> 

---

<br> 

## 12. GET /classes
### Description
- Get the list of all classes

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
  ```

### Response
_Response 200 - OK_
- Body
    ```json
    [
        {
            "id": Integer,
            "VolunteerId": Integer,
            "OrphanId": Integer,
            "startDate": String,
            "hour": String,
            "endDate": String,
            "createdAt": String,
            "updatedAt": String,
            "Classes": [
                {
                    "id": Integer,
                    "MatchId": Integer,
                    "description": String,
                    "date": String,
                    "ClassCategoryId": Integer,
                    "verifiedByOrphan": Boolean,
                    "verifiedByVolunteer": Boolean,
                    "createdAt": String,
                    "updatedAt": String,
                },
                ...
            ]
        ...
    ]
    ```

## 13. GET /classes/:matchId

### Description
- Get the list of all classes by the matchId

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
    ```
### Response
_Response 200 - OK_
- Body
    ```json
    [
        {
            "id": Integer,
            "MatchId": Integer,
            "description": String,
            "date": String,
            "ClassCategoryId": Integer,
            "verifiedByOrphan": Boolean,
            "verifiedByVolunteer": Boolean,
            "createdAt": String,
            "updatedAt": String,
            "ClassCategory": {
                "id": Integer,
                "name": String,
                "link": String,
                "imgUrl": String,
                "createdAt": String,
                "updatedAt": String,
                },
        },
        ...
    ]
    ```

## 14. GET categories

### Description
- Get the list of all class categories

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
    ```
### Response
_Response 200 - OK_
- Body
    ```json
    [
        {
            "id": Integer,
            "name": Integer,
            "link": String,
            "imgUrl": String,
        },
        ...
    ]
    ```

## 15. POST /payment/xendit-callback

### Description
- Callback URL provided for Xendit to notify successful payments

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
    ```
### Response
_Response 200 - OK_
- Body
    ```json
    {
        "message": String
    },
    ```

## 15. GET /payment/donations

### Description
- Get all data for donations

### Request
- Headers
    ```json
    {
    	"Content-Type": "application/x-www-form-urlencoded"
    }
    ```
### Response
_Response 200 - OK_
- Body
    ```json
    [
        {
        "name": String,
        "imgUrl": String,
        "on_demand_link": String,
        "paymentLinkURL": String
        },
    ]
    ```