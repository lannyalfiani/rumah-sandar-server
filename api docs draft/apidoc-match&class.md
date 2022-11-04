## 1. get "/match"

# output :

```js
[
  {
    id: 3,
    VolunteerId: null,
    OrphanId: 5,
    startDate: null,
    hour: null,
    createdAt: "2022-11-04T06:41:40.640Z",
    updatedAt: "2022-11-04T06:41:40.640Z",
    Orphan: {
      id: 5,
      email: "c@gmail.com",
      password: "123",
      fullName: "petot",
      imageUrl: "google.com",
      OrphanageId: 1,
      role: "adik",
      verified: true,
      createdAt: "2022-11-04T06:41:12.806Z",
      updatedAt: "2022-11-04T06:41:12.806Z",
    },
  },
];
```

## 2. put(/match/:matchId)

# input :

```js
req.body = {
  startDate: Date,
  hour: TIME,
};
```

```js
req.user = {
  role: "kakak",
  VolunteerId: integer,
};
```

# Output :

```js
{
    "message": "Submit Success, and Schedule has been created"
}
```

## 3. get "/classes"

# input :

```js
req.user :{
  VolunteerId:int,
  OR
  OrphanId: int,
  role:"kakak" OR "adik"
}
```

# output :

```js
[
    {
        "id": 3,
        "VolunteerId": 3,
        "OrphanId": 5,
        "startDate": "2022-11-04T00:00:00.000Z",
        "hour": "09:00:00",
        "createdAt": "2022-11-04T06:41:40.640Z",
        "updatedAt": "2022-11-04T06:46:22.032Z",
        "Classes": [
            {
                "id": 37,
                "MatchId": 3,
                "description": "This is Bahasa Indonesia Class",
                "date": "2022-11-04T00:00:00.000Z",
                "ClassCategoryId": 1,
                "verifiedByOrphan": null,
                "verifiedByVolunteer": null,
                "createdAt": "2022-11-04T06:46:22.037Z",
                "updatedAt": "2022-11-04T06:46:22.037Z"
            },
            {
                "id": 38,
                "MatchId": 3,
                "description": "This is Matemathic Class",
                "date": "2022-11-11T00:00:00.000Z",
                "ClassCategoryId": 2,
                "verifiedByOrphan": null,
                "verifiedByVolunteer": null,
                "createdAt": "2022-11-04T06:46:22.037Z",
                "updatedAt": "2022-11-04T06:46:22.037Z"
            },
            ...,
          ]
    }
]
```

## 4 get "/classes/:matchId"

# input :

```js
req.params :{
  matchId : integer
}
```

# output :

```js
[
    {
        "id": 1,
        "MatchId": 1,
        "description": "This is Bahasa Indonesia Class",
        "date": "2022-11-04T00:19:47.296Z",
        "ClassCategoryId": 1,
        "verifiedByOrphan": null,
        "verifiedByVolunteer": null,
        "createdAt": "2022-11-04T00:19:47.308Z",
        "updatedAt": "2022-11-04T00:19:47.308Z",
        "ClassCategory": {
            "id": 1,
            "name": "Bahasa Indonesia",
            "link": "https://drive.google.com/drive/folders/1CtSmvwDWkYJ-hYehnvp7MNXx6eXu9LV_?usp=share_link",
            "imgUrl": "https://bit.ly/3WtIFkx",
            "createdAt": "2022-11-03T20:44:34.388Z",
            "updatedAt": "2022-11-03T20:44:34.388Z"
        }
    },
    {
        "id": 2,
        "MatchId": 1,
        "description": "This is Matemathic Class",
        "date": "2022-11-11T00:19:47.296Z",
        "ClassCategoryId": 2,
        "verifiedByOrphan": null,
        "verifiedByVolunteer": null,
        "createdAt": "2022-11-04T00:19:47.308Z",
        "updatedAt": "2022-11-04T00:19:47.308Z",
        "ClassCategory": {
            "id": 2,
            "name": "Matematika",
            "link": "https://drive.google.com/drive/folders/1xE33PkAEM0mLljAKd4wuk3pL0Yxg9xxb?usp=share_link",
            "imgUrl": "https://bit.ly/3WtIFkx",
            "createdAt": "2022-11-03T20:44:34.388Z",
            "updatedAt": "2022-11-03T20:44:34.388Z"
        }
    },
    ...,
]

```
