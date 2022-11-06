## 1. http://localhost:3000/match

```js
req.headers :{
    "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3NTkxNDUxfQ.GfpM-lpFT4NHPE-i7zRgEr36iQySeNGx6wrQK23KtZI"
}
//you need to  login orphan and you do not request before
```

#output :

```js
{
    "message": "Create Request Success"
}
```

## 2. http://localhost:3000/match

```js
req.headers :{
    "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InZvbHVudGVlciIsImlhdCI6MTY2NzU5MTM5NX0.-cdCgkGq11iX_lVyy1Zm_v3_-4X_6iEwZTqLLZ6uUdI"
}
//you need to login as volunteer and you hadn't submit before
```

#output :

```js
[
  {
    id: 2,
    VolunteerId: null,
    OrphanId: 3,
    startDate: null,
    hour: null,
    endDate: null,
    createdAt: "2022-11-04T23:07:04.991Z",
    updatedAt: "2022-11-04T23:07:04.991Z",
    Orphan: {
      id: 3,
      email: "d@gmail.com",
      password: "$2a$10$6tVEqcKgiaBNCGC.S4aeHesmZb59oeos/Z6mn3XlBuzme6mnx7j9S",
      fullName: "Orphan 1",
      imageUrl: "https://bit.ly/3U8tATP",
      OrphanageId: 1,
      role: "orphan",
      verified: false,
      matchStatus: "notMatch",
      createdAt: "2022-11-04T23:04:33.984Z",
      updatedAt: "2022-11-04T23:04:33.984Z",
    },
    Volunteer: null,
  },
];
```

## 3 PUT http://localhost:3000/match/1

# input :

```js
{
    req.params : matchId
    req.headers : {
        "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InZvbHVudGVlciIsImlhdCI6MTY2NzU5MTM5NX0.-cdCgkGq11iX_lVyy1Zm_v3_-4X_6iEwZTqLLZ6uUdI"
    }
    //you need to login as volunteer and you hadn't submit before
    req.body : {
    "startDate" : "2022-11-05",
    "hour" :"13:00"
    }
}
```

# output :

```js
{
    "message": "Submit Success, and Schedule has been created"
}
```
