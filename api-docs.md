## Endpoints

List of Available Endpoints:
1. `GET /match`

 <br> 

---

 <br> 

## 1. GET /register
### Description
- Get all pairing data of volunteer-orphans

#### Response
_200 - OK_

- Headers
    ```json
      {
        "Content-Type": "application/x-www-form-urlencoded"
      }
- Body
    ```json
    [
       {
        "id": Integer,
        "VolunteerId": Integer,
        "OrphanId": Integer,
        "startDate": String,
        "hour": null,
        "createdAt": "2022-11-04T06:41:40.640Z",
        "updatedAt": "2022-11-04T06:41:40.640Z",
        "Orphan": {
          "id": 5,
          "email": "c@gmail.com",
          "password": "123",
          "fullName": "petot",
          "imageUrl": "google.com",
          "OrphanageId": 1,
          "role": "adik",
          "verified": true,
          "createdAt": "2022-11-04T06:41:12.806Z",
          "updatedAt": "2022-11-04T06:41:12.806Z",
        },
      }
        ...
      ]
    ```

    <!-- kalo blm ada, null -->

 <br> 

---

 <br> 