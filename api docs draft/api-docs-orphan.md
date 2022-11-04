## 1 http://localhost:3000/orphan/register

# Input :

Body :

```js
{
    "fullName":"Orphan 1",
    "email": "b@gmail.com",
    "password" :"12345",
    "imageUrl" : "https://bit.ly/3U8tATP",
    "OrphanageId":1
}
```

# response success :

```js
{
    "message": "Register Success"
}
```

## 2 http://localhost:3000/orphan/login

# Input :

Body :

```js
{
    "email": "b@gmail.com",
    "password" :"12345"
}
```

# response success :

```js
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3NTg4MjIxfQ.KRtogc1dfDjhvpuKrvqXZoXuDcJGjOePVyYJ822rbI0"
}
```
